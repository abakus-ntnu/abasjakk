import express from "express";
import { getUsers, createUser, updateUser, deleteUser, softDeleteUser } from "../controllers/user";

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.post('/', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.put('/:id/softDelete', softDeleteUser)
userRoutes.delete('/:id', deleteUser);

export default userRoutes;
