import { RequestHandler } from "express";

export const checkPassword: RequestHandler = async (req, res) => {
    res.sendStatus(req.headers.password === process.env.PASSWORD ? 200 : 401);
}


