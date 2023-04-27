import Match from "../models/match";
import User from "../models/user";
import { RequestHandler } from "express";
import { ChessPiece, MatchStatus } from "../types";

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
    .populate("white")
    .populate("black")
    .then(match => res.status(200).json(match))
    .catch(e => res.status(404).send(e));
}

export const updateResult: RequestHandler = async (req, res) => {
  if (!req.body.result) {
    res.status(400).send("Error: Invalid fields");
    return;
  }

  Match.findById(req.params.id)
    .then(match => {
      if (!match) {
        res.status(404).send("Error: Match doesn't exist");
        return;
      }

      const initialResult: MatchStatus = match.result;
      const updatedResult: MatchStatus = req.body.result ?? "";

      match.result = updatedResult;
      match.save()
        .then(_ => res.status(200).end())
        .catch(e => res.status(500).send(e));

      // Update scores of players
      const resultToScore = (result: MatchStatus, piece: ChessPiece) => {
        if (result == MatchStatus.DRAW) {
          return 0.5;
        }
        if ((piece == ChessPiece.WHITE && result == MatchStatus.WHITE_VICTORY) || (piece == ChessPiece.BLACK && result == MatchStatus.BLACK_VICTORY)) {
          return 1;
        }
        return 0;
      }

      User.findById(match.white)
        .then(player => {
          if (!player) return;

          const updatedScoreOffset = resultToScore(updatedResult, ChessPiece.WHITE) - resultToScore(initialResult, ChessPiece.WHITE);
          player.score = player.score + updatedScoreOffset;
          player.save();
        }).catch(e => console.log(e));

      User.findById(match.black)
        .then(player => {
          if (!player) return;

          const updatedScoreOffset = resultToScore(updatedResult, ChessPiece.BLACK) - resultToScore(initialResult, ChessPiece.BLACK);
          player.score = player.score + updatedScoreOffset;
          player.save();
        }).catch(e => console.log(e));
    })
    .catch(e => res.status(404).send(e));
}
