import mongoose from 'mongoose';
import { RoundType } from '../types';

const roundSchema = new mongoose.Schema<RoundType>({
  order: Number,
  matches: [{ type: mongoose.Schema.Types.ObjectId }]
});

export default mongoose.model("Round", roundSchema);
