"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
function teacherMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo add authentication with jwt logic here
        const token = req.headers.authorization;
        if (!token) {
            return res
                .status(403)
                .json({ message: "Authorization token not provided" });
        }
        const words = token.split(" ");
        const jwtToken = words[1];
        const decoded = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET);
        const { username } = decoded;
        if (!username) {
            return res.status(403).json({ message: "You are not authenticated" });
        }
        const teacher = yield db_1.Teacher.findOne({ username });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        req.teacherId = teacher._id;
        res.locals.username = username;
        next();
    });
}
exports.teacherMiddleware = teacherMiddleware;
