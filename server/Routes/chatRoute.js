import express from "express";
import {
  createChat,
  findUserChats,
  findChat,
} from "../Controllers/chatController.js";

export const chatRouter = express.Router();

chatRouter.post("/", createChat);
chatRouter.get("/:userId", findUserChats);
chatRouter.get("/find/:firstId/:secondId", findChat);
