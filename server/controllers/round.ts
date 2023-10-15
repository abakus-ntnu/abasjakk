import User from "../models/user";
import Match from "../models/match";
import Round from "../models/round";
// import { loadSettings } from "../controllers/settings";
import { RequestHandler } from "express";
import { Types } from "mongoose";
import { IUser, IRound, MatchStatus, Pair, UserId, ChessPiece } from "../types"

export const getRounds: RequestHandler = async (_req, res) => {
  Round.find()
    .populate({
      path: "matches",
      populate : {
        path: "white",
      },
    })
    .populate({
      path: "matches",
      populate : {
        path: "black",
      },
    })
    .then(rounds => res.status(200).json(rounds))
    .catch(e => res.status(404).send(e));
};

export const createRound: RequestHandler = async (_req, res) => {
  const sortedUsers = (await User.find().sort("-score")).filter(user => !user.isDeleted);
  const previousRound = await Round.findOne().sort("-order");

  if (!previousRound) {
    const pairs = generateRandomPairs(sortedUsers);
    const round = new Round({order: 1, matches: await createMatchesFromPairs(pairs)});
    round.save()
      .then(_ => res.status(201).end())
      .catch(e => res.status(500).send(e));
    return;
  }

  const pairs = await pairingAlgorithm(sortedUsers, previousRound);
  const round = new Round({order: previousRound.order.valueOf() + 1, matches: await createMatchesFromPairs(pairs)});
  round.save()
    .then(_ => res.status(201).end())
    .catch(e => res.status(500).send(e));
}

const generateRandomPairs = (users: any[]) => { // Very random yes
  let randomPairs: Pair[] = [];
  for (let i = 0; i < users.length; i += 2) {
    if (i == users.length-1) {
      randomPairs.push({ white: users[i]._id, black: users[i]._id });
      break;
    }
    randomPairs.push({ white: users[i]._id, black: users[i + 1]._id });
  }
  return randomPairs;
}

const generateRandomTables = async (length: number) => {
  // const settings = await loadSettings();
  const numberOfTables = Math.ceil((await User.find()).length / 2);
  const numbers = [];
  for (let i = 0; i < numberOfTables; i++) {
  numbers.push(i + 1);
  }

  const shuffle = (array: number[]) => { // Shameless kok
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  return shuffle(numbers).slice(0, length);
}

const createMatchesFromPairs = async (pairs: Pair[]) => {
  const matches: { type: Types.ObjectId, ref: "Match" }[] = [];

  const tables = await generateRandomTables(pairs.length);
  for (let i = 0; i < pairs.length; i++) {
    const match = new Match({ white: pairs[i].white, black: pairs[i].black, table: tables[i], result: MatchStatus.IN_PROGRESS });
    matches.push(match._id);
    match.save()
  }

  return matches;
}

const pairingAlgorithm = async (sortedUsers: IUser[], previousRound: IRound) => { // TODO: Rewrite this mess
  const newPairings: Pair[] = [];
  const playerToPiece: Map<string, ChessPiece> = new Map();
  const playerToOpponent: Map<string, string> = new Map();

  // This is definitely NOT the most efficient way of doing it, but i don't give a single shit
  for (let i = 0; i < previousRound.matches.length; i++) {
    const match = await Match.findById(previousRound.matches[i]);
    if (!match) continue;

    playerToPiece.set(match.white.toString(), ChessPiece.WHITE);
    playerToPiece.set(match.black.toString(), ChessPiece.BLACK);
    playerToOpponent.set(match.white.toString(), match.black.toString());
    playerToOpponent.set(match.black.toString(), match.white.toString());
  }

  // for (let i = 0; i < sortedUsers.length; i++ ) {
  //   const player = sortedUsers[i];
  //   console.log(player.name);
  //   console.log(playerToPiece.get(player._id.toString()));
  //   console.log(playerToOpponent.get(player._id.toString()));
  // }

  while (sortedUsers.length > 1) {
    const player = sortedUsers.shift();
    if (player === undefined) break;
    const newOpponentId = (playerToOpponent.get(player._id.toString()) == sortedUsers[0]._id.toString()) ? 1 : 0;
    const newOpponent = sortedUsers[newOpponentId];
    // Assign colors
    let p: Pair = { white: newOpponent._id, black: player._id };
    if (playerToPiece.get(player._id.toString()) == ChessPiece.BLACK && playerToPiece.get(newOpponent._id.toString()) == ChessPiece.WHITE) p = { white : player._id, black: newOpponent._id }
    newPairings.push(p);
    // Remove shit
    sortedUsers.splice(newOpponentId, 1);
  }

  if (sortedUsers.length == 1) {
    newPairings.push({ white: sortedUsers[0]._id, black: sortedUsers[0]._id });
  }

  return newPairings;
}
