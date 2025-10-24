import {Server} from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import {SocketAUthenticationMiddleware} from "../middleware/socket.auth.middleware.js";


dotenv.config();

const app = express();

const httpServer = http.createServer(app);
const corsOptions = {
    origin: process.env.CORS,
    credentials: true,
};
const io = new Server(httpServer, {
    cors: corsOptions,
});

io.use(SocketAUthenticationMiddleware);

const userScoketMap = {};
io.on("connection", (socket) => {
  const userId = socket.user?._id || socket.userId;
  if (!userId) {
    console.warn("⚠️ Missing user ID in socket connection");
    return;
  }

  // store mapping and attach safe metadata on the socket for later use
  userScoketMap[userId] = socket.id;
  const userName = socket.user?.fullName || socket.user?.fullname || socket.userId || "Unknown";
  // keep convenient refs on socket so disconnect handler can read them safely
  socket.userId = userId;
  socket.userFullName = userName;

  console.log("✅ user connected:", userName, "->", socket.id);

  // broadcast current online users
  io.emit("getOnlineUsers", Object.keys(userScoketMap));

  socket.on("disconnect", () => {
    const departed = socket.userFullName || socket.user?.fullName || socket.userId || "Unknown";
    console.log("❌ user disconnected:", departed);
    // remove mapping safely using the stored userId
    const uid = socket.userId || userId;
    if (uid && userScoketMap[uid]) delete userScoketMap[uid];
    io.emit("getOnlineUsers", Object.keys(userScoketMap));
  });
});


export {io,app,httpServer}
