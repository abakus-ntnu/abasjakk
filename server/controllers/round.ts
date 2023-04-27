import User from "../models/user";
import Match from "../models/match";
import Round from "../models/round";
import { RequestHandler } from "express";
import { Schema, ObjectId } from "mongoose";
import { UserType, MatchStatus, RoundType } from "../types"

export const getRounds: RequestHandler = async (_req, res) => {
  Round.find()
    .then((rounds) => (rounds ? res.status(200).json(rounds) : res.status(404).end()))
    .catch((e) => res.status(500).send(e));
};

export const getLatestRound: RequestHandler = async (_req, res) => {
}

export const createRound: RequestHandler = async (req, res) => {
  const sortedUsers = await User.find().sort("-score");
  const previousRound = await Round.findOne().sort("-order");

  if (!previousRound) {
    const pairs = generateRandomPairs(sortedUsers);
    const round = new Round({order: 1, matches: createMatchesFromPairs(pairs)});
    round.save()
      .then(() => res.status(201).end())
      .catch((e) => res.status(500).send(e));
    return;
  }

  const pairs = await pairingAlgorithm(sortedUsers, previousRound);
  const round = new Round({order: previousRound.order.valueOf() + 1, matches: createMatchesFromPairs(pairs)});
  round.save()
    .then(() => res.status(201).end())
    .catch((e) => res.status(500).send(e));
}

type Pair = {
  white: {type: ObjectId, ref: "User"},
  black: {type: ObjectId, ref: "User"},
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

const shuffle = (array: number[]) => { // Shameless kok
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const generateRandomTables = (length: number) => {
  const MAX_TABLES = 20; // TODO: Fetch MAX_TABLES from database
  const numbers = [];
  for (let i = 0; i < MAX_TABLES; i++) {
  numbers.push(i + 1);
  }
  return shuffle(numbers).slice(0, length);
}

const createMatchesFromPairs = (pairs: Pair[]) => {
  const matches: ObjectId[] = [];

  const tables = generateRandomTables(pairs.length);
  for (let i = 0; i < pairs.length; i++) {
    const match = new Match({ white: pairs[i].white, black: pairs[i].black, table: tables[i], result: MatchStatus.IN_PROGRESS });
    matches.push(match._id);
    match.save()
  }

  return matches;
}

const pairingAlgorithm = async (sortedUsers: any[], previousRound: RoundType) => {
  const newPairings: Pair[] = [];
  const previousPairings: Pair[] = [];
  const playerToColor: Map<string, string> = new Map(); // Should be enum
  const playerToOpponent: Map<string, string> = new Map();

  // This is definitely NOT the most efficient way of doing it, but i don't give a single shit
  for (let i = 0; i < previousRound.matches.length; i++) {
    const match = await Match.findById(previousRound.matches[i]);
    if (!match) continue;
    previousPairings.push({white: match.white, black: match.black });

    playerToColor.set(match.white.toString(), "WHITE");
    playerToColor.set(match.black.toString(), "BLACK");
    playerToOpponent.set(match.white.toString(), match.black.toString());
    playerToOpponent.set(match.black.toString(), match.white.toString());
  }

  while (sortedUsers.length > 1) {
    const player = sortedUsers.shift();
    if (player === undefined) break;
    const newOpponentId = (playerToOpponent.get(player._id.toString()) == sortedUsers[0]._id.toString()) ? 1 : 0;
    const newOpponent = sortedUsers[newOpponentId];
    // Assign colors
    let p: Pair = { white: newOpponent._id, black: player._id };
    if (playerToColor.get(player._id.toString()) == "BLACK" && playerToColor.get(newOpponent._id.toString()) == "WHITE") p = { white : player._id, black: newOpponent._id }
    newPairings.push(p);
    // Remove shit
    sortedUsers.splice(newOpponentId, 1);
  }

  if (sortedUsers.length == 1) {
    newPairings.push({ white: sortedUsers[0], black: sortedUsers[0] });
  }

  return newPairings;
}
