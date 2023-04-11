import express from "express";
import userRoutes from "./userRating";

const router = express.Router();
router.use("/user", userRoutes);

export default router;
