import { model, Schema } from 'mongoose';
import { MatchType } from '../types';

const matchSchema = new Schema<MatchType>({
  white: { type: Schema.Types.ObjectId, ref: "User" },
  black: { type: Schema.Types.ObjectId, ref: "User" },
  table: Number,
  result: {
    type: String,
    enum: ["IN_PROGRESS", "WHITE_VICTORY", "BLACK_VICTORY", "DRAW"]
  }
});

export default model("Match", matchSchema);
