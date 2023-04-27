import express from "express";
import { getRounds, getLatestRound, createRound } from "../controllers/round";

const roundRoutes = express.Router();

roundRoutes.get('/', getRounds);
roundRoutes.get('/latest', getLatestRound);
roundRoutes.post('/', createRound);

export default roundRoutes;
