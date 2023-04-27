import express from "express";
import userRoutes from "./user";
import matchRoutes from "./match";
import roundRoutes from "./round";

const router = express.Router();

router.use('/user', userRoutes);
router.use('/match', matchRoutes);
router.use('/round', roundRoutes);

export default router;
