export type User = {
  _id?: string;
  name: string;
  score?: number;
  isDeleted?: boolean;
};

export type Match = {
  _id?: string;
  white: User;
  black: User;
  table: number;
  result?: result;
};

export type Round = {
  order: number;
  matches: Match[];
};

export enum result {
  IN_PROGRESS = "IN_PROGESS",
  WHITE_VICTORY = "WHITE_VICTORY",
  BLACK_VICTORY = "BLACK_VICTORY",
  DRAW = "DRAW",
}
