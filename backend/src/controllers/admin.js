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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStudent = exports.removeTeacher = exports.createTeacher = exports.adminLogin = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var index_1 = require("../db/index");
// Todo all mongo logic here
var adminLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, admin, isMatch, token, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                if (!username || !email || !password) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: 'Please provide name, username, and password' })];
                }
                return [4 /*yield*/, index_1.Admin.findOne({ email: email })];
            case 1:
                admin = _b.sent();
                if (!admin) {
                    return [2 /*return*/, res.status(404).json({ message: 'Admin not found' })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, admin.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res
                            .status(411)
                            .json({ message: 'Incorrect username or password' })];
                }
                token = jsonwebtoken_1.default.sign({ username: username }, process.env.JWT_SECRET);
                res.status(200).json({
                    message: 'Admin logged in successfully',
                    admin: admin,
                    token: token,
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                // ! Remove 'e' which might potentially show authorised details
                console.error('Error logging admin:', e_1);
                res.status(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.adminLogin = adminLogin;
var createTeacher = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, username, password, teacher, hashedPassword, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, name_1 = _a.name, email = _a.email, username = _a.username, password = _a.password;
                if (!name_1 || !email || !username || !password) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: 'Please provide name, username, and password' })];
                }
                return [4 /*yield*/, index_1.Teacher.findOne({ email: email })];
            case 1:
                teacher = _b.sent();
                if (teacher) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Teacher already exists with this email',
                        })];
                }
                return [4 /*yield*/, index_1.Teacher.findOne({ username: username })];
            case 2:
                teacher = _b.sent();
                if (teacher) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Username already taken',
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, index_1.Teacher.create({
                        username: username,
                        name: name_1,
                        email: email,
                        password: hashedPassword,
                        createdTests: [],
                    })];
            case 4:
                teacher = _b.sent();
                if (!teacher) {
                    return [2 /*return*/, res.status(500).json({ message: 'Failed to create teacher' })];
                }
                res.status(200).json({
                    message: 'Teacher created successfully',
                    teacher: teacher,
                });
                return [3 /*break*/, 6];
            case 5:
                e_2 = _b.sent();
                // ! Remove 'e' which might potentially show authorised details
                console.error('Error creating teacher:', e_2);
                res.status(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createTeacher = createTeacher;
var removeTeacher = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, teacher;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                if (!username) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Please provide username',
                        })];
                }
                return [4 /*yield*/, index_1.Teacher.findOneAndDelete({ username: username })];
            case 1:
                teacher = _a.sent();
                if (!teacher) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'Teacher not found in the database',
                        })];
                }
                res.status(200).json({
                    message: 'Teacher deleted successfully',
                    teacher: teacher,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.removeTeacher = removeTeacher;
var removeStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, student;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                if (!username) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Please provide username',
                        })];
                }
                return [4 /*yield*/, index_1.Student.findOneAndDelete({ username: username })];
            case 1:
                student = _a.sent();
                if (!student) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'Student not found in the database',
                        })];
                }
                res.status(200).json({
                    message: 'Student deleted successfully',
                    student: student,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.removeStudent = removeStudent;
