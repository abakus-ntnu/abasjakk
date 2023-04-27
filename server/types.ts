import { Types } from "mongoose";

export interface UserId {
  type: Types.ObjectId;
  ref: "User";
}

export interface MatchId {
  type: Types.ObjectId;
  ref: "Match";
}

export interface RoundId {
  type: Types.ObjectId;
  ref: "Round";
}

export interface IUser {
  _id: UserId;
  name: string;
  score: number;
}

export interface IMatch {
  _id: MatchId;
  white: UserId;
  black: UserId;
  table: number;
  result: MatchStatus;
}

export interface IRound {
  _id: RoundId;
  order: number;
  matches: MatchId[]
}

export type Pair = {
  white: UserId,
  black: UserId,
}

export enum MatchStatus {
  IN_PROGRESS = "IN_PROGRESS",
  WHITE_VICTORY = "WHITE_VICTORY",
  BLACK_VICTORY = "BLACK_VICTORY",
  DRAW = "DRAW"
}

export enum ChessPiece {
  WHITE = "WHITE",
  BLACK = "BLACK"
}
