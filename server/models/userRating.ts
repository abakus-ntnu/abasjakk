import mongoose, { Document } from "mongoose";
import { UserType } from "../types";

const userRatingSchema = new mongoose.Schema({});

export default mongoose.model<UserType & Document>(
  "UserRating",
  userRatingSchema
);
