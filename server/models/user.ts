import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true}
});

export default model<IUser>("User", userSchema);
