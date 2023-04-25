import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: String,
  password: Number,
});

export default mongoose.model("Admin", adminSchema);
