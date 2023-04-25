import User from "../models/user";
import { RequestHandler } from "express";

export const getUsers: RequestHandler = async (_req, res) => {
  User.find()
    .then((users) => (users ? res.status(200).json(users) : res.status(404).end()))
    .catch((e) => res.status(500).send(e));
};

export const createUser: RequestHandler = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send("Error: Invalid fields");
    return;
  }

  const user = new User({name:req.body.name, score: req.body.score ?? 0});
  user.save()
    .then(() => res.status(201).send(user._id))
    .catch((e) => res.status(500).send(e));
}

export const updateUser: RequestHandler = async (req, res) => {
  if (!req.body.name && !req.body.score) {
    res.status(400).send("Error: Invalid fields");
    return;
  }

  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(400).send("Error: User doesn't exist");
        return;
      }

      req.body.name && (user.name = req.body.name);
      req.body.score && (user.score = req.body.score);

      user.save()
        .then(() => res.status(200).end())
        .catch((e) => res.status(500).send(e));
    })
    .catch((e) => res.status(400).send(e));
};

export const deleteUser: RequestHandler = async (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).end())
    .catch((e) => res.status(400).send(e));
};
