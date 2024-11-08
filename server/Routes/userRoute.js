import express from "express";

export const userRouter = express.Router();
import {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} from "../Controllers/userController.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/find/:userId", findUser);
userRouter.get("/", getUsers);
