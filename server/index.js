import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { userRouter } from "./Routes/userRoute.js";
import { chatRouter } from "./Routes/chatRoute.js";
import { messageRouter } from "./Routes/messageRoute.js";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`server running on port: ${PORT}`)
);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Mongodb is conneted");
  })
  .catch((error) => {
    console.log("Mongodb connection faild: ", error.message);
  });

const io = new Server(server, {
  cors: {
    origin: "https://snap-share-ten.vercel.app",
    // origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection : ", socket.id);

  // listen for new connections
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId == userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("online users : ", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  // add messages
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => user.userId == message.recipientId);
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId != socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
