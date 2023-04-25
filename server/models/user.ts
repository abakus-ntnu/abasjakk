import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

export default mongoose.model("User", userSchema);
