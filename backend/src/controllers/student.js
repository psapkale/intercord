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
exports.testSubmission = exports.getMyTests = exports.studentLogin = exports.studentRegister = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var db_1 = require("../db");
// Todo all mongo logic here
// Todo restrict creating duplicate users
var studentRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, username, password, linkedinUrl, githubUrl, twitterUrl, student, hashedPassword, token, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, name_1 = _a.name, email = _a.email, username = _a.username, password = _a.password, linkedinUrl = _a.linkedinUrl, githubUrl = _a.githubUrl, twitterUrl = _a.twitterUrl;
                if (!name_1 || !email || !username || !password) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: 'Please provide name, username, and password' })];
                }
                return [4 /*yield*/, db_1.Student.findOne({ email: email })];
            case 1:
                student = _b.sent();
                if (student) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Student already exists with this email',
                        })];
                }
                return [4 /*yield*/, db_1.Student.findOne({ username: username })];
            case 2:
                student = _b.sent();
                if (student) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Username already taken',
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, db_1.Student.create({
                        username: username,
                        name: name_1,
                        email: email,
                        password: hashedPassword,
                        linkedinUrl: linkedinUrl,
                        githubUrl: githubUrl,
                        twitterUrl: twitterUrl,
                        submissions: [],
                    })];
            case 4:
                student = _b.sent();
                if (!student) {
                    return [2 /*return*/, res.status(500).json({ message: 'Failed to create student' })];
                }
                token = jsonwebtoken_1.default.sign({ username: username }, process.env.JWT_SECRET);
                res.status(200).json({
                    message: 'Student created successfully',
                    student: student,
                    token: token,
                });
                return [3 /*break*/, 6];
            case 5:
                e_1 = _b.sent();
                // ! Remove 'e' which might potentially show authorised details
                console.error('Error creating student:', e_1);
                res.status(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.studentRegister = studentRegister;
var studentLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, student, isMatch, token, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                if (!email || !username || !password) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: 'Please provide username, email and password' })];
                }
                return [4 /*yield*/, db_1.Student.findOne({ email: email })];
            case 1:
                student = _b.sent();
                if (!student) {
                    return [2 /*return*/, res.status(404).json({ message: 'Student not found' })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, student.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res
                            .status(411)
                            .json({ message: 'Incorrect username or password' })];
                }
                token = jsonwebtoken_1.default.sign({ username: username }, process.env.JWT_SECRET);
                res.status(200).json({
                    message: 'Student logged in successfully',
                    token: token,
                });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                // ! Remove 'e' which might potentially show authorised details
                console.error('Error logging student:', e_2);
                res.status(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.studentLogin = studentLogin;
var getMyTests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, student, submissions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = res.locals.username;
                return [4 /*yield*/, db_1.Student.findOne({ username: username })];
            case 1:
                student = _a.sent();
                submissions = student === null || student === void 0 ? void 0 : student.submissions;
                res.status(200).json({
                    submissions: submissions,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getMyTests = getMyTests;
var testSubmission = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var testId, _a, submittedAnswersIndex, marksObtained, username, student, test, score;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                testId = req.params.testId;
                _a = req.body, submittedAnswersIndex = _a.submittedAnswersIndex, marksObtained = _a.marksObtained;
                username = res.locals.username;
                if (!testId) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Please provide test id',
                        })];
                }
                return [4 /*yield*/, db_1.Student.findOne({ username: username })];
            case 1:
                student = _b.sent();
                return [4 /*yield*/, db_1.Test.findOneAndUpdate({ _id: testId }, {
                        $push: {
                            submissions: {
                                submittedBy: student._id,
                                obtainedMarks: marksObtained,
                            },
                        },
                    }, {
                        new: true,
                    })];
            case 2:
                test = _b.sent();
                return [4 /*yield*/, db_1.Student.findOneAndUpdate({ username: username }, {
                        $push: {
                            submissions: {
                                test: test._id,
                                submittedAnswersIndex: submittedAnswersIndex,
                                marksObtained: marksObtained,
                                submittedAt: new Date(Date.now()),
                            },
                        },
                    }, { new: true })];
            case 3:
                student = _b.sent();
                return [4 /*yield*/, db_1.Score.findOneAndUpdate({ candidate: student._id }, {
                        $inc: {
                            score: marksObtained,
                        },
                    }, { new: true })];
            case 4:
                score = _b.sent();
                res.json({
                    message: 'Test submitted successfully',
                    test: test,
                    student: student,
                    score: score,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.testSubmission = testSubmission;
