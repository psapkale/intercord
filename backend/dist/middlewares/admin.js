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
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function adminMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Todo add authentication with jwt logic here
            const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            if (!token) {
                return res.status(400).json({
                    message: "Access token not found",
                });
            }
            const words = token.split(" ");
            const jwtToken = words[1];
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET);
            }
            catch (error) {
                console.error("JWT Verification Error:", error);
                return res.status(401).json({ message: "Invalid or expired token" });
            }
            const { username } = decoded;
            if (!username) {
                return res.status(403).json({ message: "You are not authenticated" });
            }
            res.locals.username = username;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
}
exports.adminMiddleware = adminMiddleware;
