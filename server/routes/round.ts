import express from "express";
import { getRounds, createRound } from "../controllers/round";

const roundRoutes = express.Router();

roundRoutes.get('/', getRounds);
roundRoutes.post('/', createRound);

export default roundRoutes;
