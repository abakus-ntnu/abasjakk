import express from "express";
import { getTableCount, setTableCount } from "../controllers/settings";

const settingsRoutes = express.Router();

settingsRoutes.get('/tableCount', getTableCount);
settingsRoutes.put('/tableCount', setTableCount);

export default settingsRoutes;
