import express from "express";
import { checkPassword } from "../controllers/login";

const loginRoutes = express.Router();

loginRoutes.get('/', checkPassword);

export default loginRoutes;