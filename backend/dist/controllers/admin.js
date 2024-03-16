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
exports.updateSeenAdmin = exports.createAdmin = exports.removeStudent = exports.removeTeacher = exports.createTeacher = exports.adminLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../db/index");
// Todo all mongo logic here
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide name, username, and password" });
        }
        const admin = yield index_1.Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, admin.password);
        // const isMatch: boolean = password == admin.password;
        if (!isMatch) {
            return res.status(411).json({ message: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Admin logged in successfully",
            admin,
            token,
        });
    }
    catch (e) {
        // ! Remove 'e' which might potentially show authorised details
        console.error("Error logging admin:", e);
        res.status(500);
    }
});
exports.adminLogin = adminLogin;
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, username, password, stream } = req.body;
        if (!name || !email || !username || !password || !stream) {
            return res.status(400).json({
                message: "Please provide name, username, password and stream",
            });
        }
        let teacher = yield index_1.Teacher.findOne({ email });
        if (teacher) {
            return res.status(400).json({
                message: "Teacher already exists with this email",
            });
        }
        teacher = yield index_1.Teacher.findOne({ username });
        if (teacher) {
            return res.status(400).json({
                message: "Username already taken",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        teacher = yield index_1.Teacher.create({
            username,
            name,
            email,
            password: hashedPassword,
            stream,
            createdTests: [],
        });
        if (!teacher) {
            return res.status(500).json({ message: "Failed to create teacher" });
        }
        res.status(200).json({
            message: "Teacher created successfully",
            teacher,
        });
    }
    catch (e) {
        // ! Remove 'e' which might potentially show authorised details
        console.error("Error creating teacher:", e);
        res.status(500);
    }
});
exports.createTeacher = createTeacher;
const removeTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(400).json({
            message: "Please provide username",
        });
    }
    const teacher = yield index_1.Teacher.findOneAndDelete({ username });
    if (!teacher) {
        return res.status(404).json({
            message: "Teacher not found in the database",
        });
    }
    res.status(200).json({
        message: "Teacher deleted successfully",
        teacher,
    });
});
exports.removeTeacher = removeTeacher;
const removeStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(400).json({
            message: "Please provide username",
        });
    }
    const student = yield index_1.Student.findOneAndDelete({ username });
    if (!student) {
        return res.status(404).json({
            message: "Student not found in the database",
        });
    }
    res.status(200).json({
        message: "Student deleted successfully",
        student,
    });
});
exports.removeStudent = removeStudent;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const admin = yield index_1.Admin.create({
        username,
        name,
        email,
        password: hashedPassword,
        announcements: [],
    });
    res.status(200).json({
        message: "Admin created",
        admin,
    });
});
exports.createAdmin = createAdmin;
const updateSeenAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    try {
        yield index_1.Admin.updateOne({
            username,
        }, {
            $set: { "announcements.$[].seen": true },
        });
        res.status(200).json({
            message: "All Seen Successfully",
        });
    }
    catch (error) {
        console.log(error, "Error in student updateSeen route");
    }
});
exports.updateSeenAdmin = updateSeenAdmin;
