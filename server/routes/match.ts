import express from "express";
import { createMatch, getMatch, updateResult } from "../controllers/match";

const matchRoutes = express.Router();

matchRoutes.post('/', createMatch);
matchRoutes.get('/:id', getMatch);
matchRoutes.put('/:id', updateResult);

export default matchRoutes;
