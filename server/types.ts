import type { ObjectId, Document } from "mongoose";

export interface UserType extends Document {
  _id: ObjectId,
  name: String,
  score: Number
}

export interface MatchType extends Document {
  _id: ObjectId,
  white: { type: ObjectId, ref: "User" },
  black: { type: ObjectId, ref: "User" },
  table: number,
  result: string | undefined
}

export interface RoundType extends Document {
  _id: ObjectId,
  order: Number,
  matches: [{ type: ObjectId }]
}

export enum MatchStatus {
  IN_PROGRESS = "IN_PROGRESS",
  WHITE_VICTORY = "WHITE_VICTORY",
  BLACK_VICTORY = "BLACK_VICTORY",
  DRAW = "DRAW"
}
