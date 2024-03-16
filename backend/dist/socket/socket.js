"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(exports.app);
const io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    socket.on("announcement", (announement) => {
        io.emit("announcement", announement);
    });
    socket.on("removeStudentFromPending", (stuId) => {
        io.emit("removeStudentFromPending", stuId);
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});
