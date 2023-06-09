import { Schema, model } from 'mongoose';
import { IMatch } from '../types';

const matchSchema = new Schema<IMatch>({
  white: { type: Schema.Types.ObjectId, ref: "User" },
  black: { type: Schema.Types.ObjectId, ref: "User" },
  table: Number,
  result: {
    type: String,
    enum: ["IN_PROGRESS", "WHITE_VICTORY", "BLACK_VICTORY", "DRAW"]
  }
});

export default model<IMatch>("Match", matchSchema);
