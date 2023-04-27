import Match from "../models/match";
import User from "../models/user";
import { RequestHandler } from "express";
import { MatchStatus } from "../types";

export const createMatch: RequestHandler = async (req, res) => {
  if (!req.body.white || !req.body.black || !req.body.table) {
    res.status(400).send("Error: Invalid fields");
    return;
  }

  const match = new Match({ white: req.body.white, black: req.body.black, table: req.body.table, result: MatchStatus.IN_PROGRESS });
  match.save()
    .then(() => res.status(201).send(match._id))
    .catch((e) => res.status(500).send(e));
}

export const getMatch: RequestHandler = async (req, res) => {
  Match.findById(req.params.id)
    .then(match => res.status(200).json(match))
    .catch(e => res.status(500).send(e));
}

const resultToScore = (result: any, piece: any) => {
  if (result == "DRAW") {
    return 0.5;
  }
  if ((piece == "WHITE" && result == "WHITE_VICTORY") || (piece == "BLACK" && result == "BLACK_VICTORY")) {
    return 1;
  }
  return 0;
}

export const updateResult: RequestHandler = async (req, res) => {
  if (!req.body.result) {
    res.status(400).send("Error: Invalidfields");
    return;
  }

  Match.findById(req.params.id)
    .then(match => {
      if (!match) {
        res.status(400).send("Error: Match doesn't exist");
        return;
      }

      const previousResult = match.result;
      const currentResult = req.body.result;

      match.result = currentResult;
      match.save()
        .then(_ => res.status(200).end())
        .catch(e => res.status(500).send(e));

      User.findOne({ _id: match.white })
        .then(player => {
          if (!player || player.score === undefined) return;
          player.score = player.score + resultToScore(currentResult, "WHITE") - resultToScore(previousResult, "WHITE");
          player.save();
        });
      User.findOne({ _id: match.black })
        .then(player => {
          if (!player || player.score === undefined) return;
          player.score = player.score + resultToScore(currentResult, "BLACK") - resultToScore(previousResult, "BLACK");
          player.save();
        });
    })
    .catch(e => res.status(500).send(e));
}
