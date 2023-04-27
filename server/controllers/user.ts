import User from "../models/user";
import { RequestHandler } from "express";

export const getUsers: RequestHandler = async (_req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(e => res.status(500).send(e));
};

export const createUser: RequestHandler = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send("Error: Invalid fields");
    return;
  }

  const user = new User({name:req.body.name, score: req.body.score ?? 0});
  user.save()
    .then(_ => res.status(201).send(user._id))
    .catch(e => res.status(500).send(e));
}

export const updateUser: RequestHandler = async (req, res) => {
  if (!req.body.name && !req.body.score) {
    res.status(400).send("Error: Invalid fields");
    return;
  }

  User.findByIdAndUpdate(req.params.id, { name: req.body.name, score: req.body.score })
    .then(_ => res.status(200).end())
    .catch(e => res.status(404).send(e));
};

export const deleteUser: RequestHandler = async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(_ => res.status(200).end())
    .catch(e => res.status(404).send(e));
};
