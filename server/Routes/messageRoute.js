import express from "express";
import { createMessage, getMessages } from "../Controllers/messageController.js";

export const messageRouter = express.Router();

messageRouter.post("/", createMessage);
messageRouter.get("/:chatId", getMessages);
