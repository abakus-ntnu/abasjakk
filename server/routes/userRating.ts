import express from "express";
import controller from "../controllers/userRating";

const router = express.Router();
const { getUserRating, createUserRating } = controller;

router.post("/create", createUserRating);
router.get("/get/:email", getUserRating);

export default router;
