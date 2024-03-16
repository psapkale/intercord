"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const admin_1 = require("./routes/admin");
const teacher_1 = require("./routes/teacher");
const student_1 = require("./routes/student");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./socket/socket");
const port = 3000;
// Defined routes
dotenv_1.default.config();
socket_1.app.use(express_1.default.json());
socket_1.app.use((0, cors_1.default)());
socket_1.app.use('/api/admin', admin_1.router);
socket_1.app.use('/api/teacher', teacher_1.router);
socket_1.app.use('/api/student', student_1.router);
// common routes
socket_1.app.use('/api', routes_1.router);
socket_1.app.get('/', (req, res) => {
    res.send('Server is live');
});
// Start the server
socket_1.server.listen(port, () => {
    console.log(`Server listening on port: ${3000}`);
});
