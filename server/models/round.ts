import { Schema, model } from 'mongoose';
import { IRound } from '../types';

const roundSchema = new Schema<IRound>({
  order: Number,
  matches: [{ type: Schema.Types.ObjectId, ref: "Match" }]
});

export default model<IRound>("Round", roundSchema);
