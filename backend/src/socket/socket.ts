import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

export const app = express();
export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
});
