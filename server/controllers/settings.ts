import Settings from "../models/settings";
import { RequestHandler } from "express";
import { ISettings } from "../types";

const defaultSettings = {
  tableCount: 20
};

let cachedSettings: ISettings | null = null;
export const loadSettings = async (): Promise<ISettings> => {
  if (cachedSettings) {
    return cachedSettings;
  }

  const settings = await Settings.findOne();
  if (settings) {
    cachedSettings = settings;
    return settings;
  }

  const newSettings = await Settings.create(defaultSettings);
  cachedSettings = newSettings;
  return newSettings;
};

export const getTableCount: RequestHandler = async (_req, res) => {
  loadSettings()
    .then(settings => res.status(200).send(settings.tableCount.toString()))
    .catch(e => res.status(500).send(e));
};

export const setTableCount: RequestHandler = async (req, res) => {
  if (!req.body.tableCount) {
    res.status(400).send("Error: Invalid fields");
    return;
  }

  const settings = await loadSettings();
  settings.tableCount = req.body.tableCount;
  settings.save()
    .then(_ => res.status(200).end())
    .catch(e => res.status(500).send(e));
};
