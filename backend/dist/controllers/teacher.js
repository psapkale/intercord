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
exports.getLiveTests = exports.getClosedTests = exports.getUpComingTests = exports.getSubjectFilteredTests = exports.getSubjectFilteredScoreBoard = exports.getScoreBoard = exports.serachTeacher = exports.serachStudent = exports.allTeachers = exports.allStudents = exports.updateSeenTeacher = exports.getAllPendingStudents = exports.rejectStudentRegister = exports.allowStudentRegister = exports.createTest = exports.teacherLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
// Todo all mongo logic here
const teacherLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide name, username, and password" });
        }
        const teacher = yield db_1.Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (teacher.username !== username) {
            return res.status(404).json({
                message: "Username is wrong",
            });
        }
        const isMatch = yield bcrypt_1.default.compare(password, teacher.password);
        if (!isMatch) {
            return res
                .status(411)
                .json({ message: "Incorrect username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Teacher logged in successfully",
            teacher,
            token,
        });
    }
    catch (e) {
        // ! Remove 'e' which might potentially show authorised details
        console.error("Error logging teacher:", e);
        res.status(500);
    }
});
exports.teacherLogin = teacherLogin;
const createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, title, description, stream, // BCS, BCA, ..
        forYear, // I, II, III
        totalQuestions, totalMarks, questions, startDate, time, endTime, } = req.body;
        console.log(stream);
        const teacherId = req.teacherId;
        const payload = {
            subject,
            title,
            description,
            stream: stream.toLowerCase(),
            forYear,
            totalQuestions,
            totalMarks,
            questions,
            startDate,
            time,
            endTime,
            createdBy: teacherId,
            submissions: [],
        };
        const test = yield db_1.Test.create(payload);
        if (!test) {
            return res.status(500).json({ message: "Failed to create test" });
        }
        yield db_1.Teacher.findOneAndUpdate({ _id: teacherId, stream }, {
            $push: { createdTests: test._id },
        }, { new: true });
        res.status(200).json({
            message: "Test created successfully",
            test,
        });
    }
    catch (e) {
        // ! Remove 'e' which might potentially show authorised details
        console.error("Error logging teacher:", e);
        res.status(500);
    }
});
exports.createTest = createTest;
const allowStudentRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(400).json({
            message: "Please provide student name",
        });
    }
    const pendingStudent = yield db_1.PendingStudent.findOne({ username });
    if (!pendingStudent) {
        return res.status(500).json({ message: "Failed to get students data" });
    }
    const hashedPassword = yield bcrypt_1.default.hash(pendingStudent.password, 10);
    const totalStudents = yield db_1.Student.find();
    const student = yield db_1.Student.create({
        username: pendingStudent.username,
        name: pendingStudent.name,
        email: pendingStudent.email,
        password: hashedPassword,
        initrank: totalStudents.length + 1,
        academicYear: pendingStudent.academicYear,
        stream: pendingStudent.stream,
        pursuingYear: pendingStudent.pursuingYear,
        submissions: [],
    });
    if (!student) {
        return res.status(500).json({ message: "Failed to create student" });
    }
    yield db_1.Score.create({
        candidateId: student._id,
        name: student.name,
        username: student.username,
        stream: student.stream.toLowerCase(),
        pursuingYear: student.pursuingYear,
        submissions: 0,
    });
    yield db_1.PendingStudent.findOneAndDelete({ username });
    const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET);
    res.status(200).json({
        message: "Student registered successfully",
        student,
        token,
    });
});
exports.allowStudentRegister = allowStudentRegister;
const rejectStudentRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(400).json({
            message: "Please provide student name",
        });
    }
    const pendingStudent = yield db_1.PendingStudent.findOneAndDelete({ username });
    if (!pendingStudent) {
        return res.status(500).json({
            message: "Failed to delete student request",
        });
    }
    res.status(200).json({
        message: "Request rejected successfully",
        pendingStudent,
    });
});
exports.rejectStudentRegister = rejectStudentRegister;
const getAllPendingStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    const teacher = yield db_1.Teacher.findOne({ username });
    const allPendingStudents = yield db_1.PendingStudent.find({
        stream: teacher.stream,
    });
    if (!allPendingStudents) {
        return res.status(500).json({
            message: "Failed to get pending requests",
        });
    }
    res.status(200).json({
        message: "Done Successfully",
        allPendingStudents,
    });
});
exports.getAllPendingStudents = getAllPendingStudents;
const updateSeenTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    try {
        yield db_1.Teacher.updateOne({
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
exports.updateSeenTeacher = updateSeenTeacher;
const allStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    const teacher = yield db_1.Teacher.findOne({ username });
    const allStudents = yield db_1.Student.find({
        stream: teacher.stream,
    });
    if (!allStudents) {
        return res.status(500).json({
            message: "Failed to get all students",
        });
    }
    res.status(200).json({ message: "Done Successfully", allStudents });
});
exports.allStudents = allStudents;
const allTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    const teacher = yield db_1.Teacher.findOne({ username });
    const allTeachers = yield db_1.Teacher.find({
        stream: teacher.stream,
    });
    if (!allTeachers) {
        return res.status(500).json({
            message: "Failed to get all teachers",
        });
    }
    res.status(200).json({ message: "Done Successfully", allTeachers });
});
exports.allTeachers = allTeachers;
const serachStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const currentTeacherUsername = res.locals.username;
    if (!username) {
        return res.status(400).json({
            message: "Please provide student name",
        });
    }
    const currentTeacher = yield db_1.Teacher.findOne({
        username: currentTeacherUsername,
    });
    const resStudent = yield db_1.Student.findOne({
        username,
        stream: currentTeacher.stream,
    });
    if (!resStudent) {
        return res.status(404).json({
            message: "Student not found in the database",
        });
    }
    res.status(200).json({
        resStudent,
    });
});
exports.serachStudent = serachStudent;
const serachTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const currentTeacherUsername = res.locals.username;
    if (!username) {
        return res.status(400).json({
            message: "Please provide student name",
        });
    }
    const currentTeacher = yield db_1.Teacher.findOne({
        username: currentTeacherUsername,
    });
    const teacher = yield db_1.Teacher.findOne({
        username,
        stream: currentTeacher.stream,
    });
    if (!teacher) {
        return res.status(404).json({
            message: "Teacher not found in the database",
        });
    }
    res.status(200).json({
        teacher,
    });
});
exports.serachTeacher = serachTeacher;
const getScoreBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pursuingYear } = req.body;
    const { username } = res.locals;
    if (!pursuingYear) {
        return res.status(400).json({
            message: "Please provide pursuing year of student",
        });
    }
    const teacher = yield db_1.Teacher.findOne({ username });
    // Todo check null points
    const scoreBoard = yield db_1.Score.find({
        stream: teacher.stream,
        pursuingYear,
    }).sort({
        score: -1,
    });
    if (!scoreBoard) {
        return res.status(500).json({
            message: "Opps! can't load leaderboard",
        });
    }
    res.status(200).json({
        message: "Done Successfully",
        scoreBoard,
    });
});
exports.getScoreBoard = getScoreBoard;
const getSubjectFilteredScoreBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject } = req.params;
    const { pursuingYear } = req.body;
    const { username } = res.locals;
    if (!subject) {
        return res.status(400).json({
            message: "Please provide subject name",
        });
    }
    if (!pursuingYear) {
        return res.status(400).json({
            message: "Please provide pursuing year of student",
        });
    }
    const teacher = yield db_1.Teacher.findOne({ username });
    const allStudents = yield db_1.Student.find({
        stream: teacher.stream,
        pursuingYear,
        // 'subjectScore.subject': subject,
    });
    if (!allStudents) {
        return res.status(500).json({
            message: "Failed to retrieve students",
        });
    }
    const filteredStudents = allStudents.filter((student) => {
        return student.subjectScore.some((subjectScore) => subjectScore.subject.toUpperCase() === subject.toUpperCase());
    });
    // Todo remaining with testing
    const sortedStudents = filteredStudents.sort((x, y) => {
        const xSubjectScore = x.subjectScore.find((z) => z.subject === subject);
        const ySubjectScore = y.subjectScore.find((z) => z.subject === subject);
        if (xSubjectScore && ySubjectScore) {
            return ySubjectScore.score - xSubjectScore.score;
        }
        else {
            return 0;
        }
    });
    const formattedRes = sortedStudents.map((student) => {
        var _a;
        const requiredSubject = (_a = student === null || student === void 0 ? void 0 : student.subjectScore) === null || _a === void 0 ? void 0 : _a.find((x) => (x === null || x === void 0 ? void 0 : x.subject) === subject);
        const filteredSubmission = student.submissions.filter((submission) => {
            return submission.subject === subject;
        });
        return {
            name: student === null || student === void 0 ? void 0 : student.name,
            username: student === null || student === void 0 ? void 0 : student.username,
            submissions: filteredSubmission === null || filteredSubmission === void 0 ? void 0 : filteredSubmission.length,
            score: requiredSubject === null || requiredSubject === void 0 ? void 0 : requiredSubject.score,
        };
    });
    console.log(formattedRes, "formattedRes");
    res.status(200).json({
        message: "Done Successfully",
        formattedRes,
    });
});
exports.getSubjectFilteredScoreBoard = getSubjectFilteredScoreBoard;
const getSubjectFilteredTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject } = req.params;
    const { pursuingYear } = req.body;
    const { username } = res.locals;
    if (!subject) {
        return res.status(400).json({
            message: "Please provide subject name",
        });
    }
    if (!pursuingYear) {
        return res.status(400).json({
            message: "Please provide pursuing year of student",
        });
    }
    const teacher = yield db_1.Teacher.findOne({ username });
    // replacing any special characters in the 'subject'
    const escapedSubject = subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const tests = yield db_1.Test.find({
        subject: { $regex: new RegExp(escapedSubject, "i") },
        stream: teacher.stream,
        forYear: pursuingYear,
    });
    if (!tests) {
        return res.status(500).json({
            message: "Failed to retrieve tests",
        });
    }
    res.status(200).json({
        message: "Done Successfully",
        tests,
    });
});
exports.getSubjectFilteredTests = getSubjectFilteredTests;
const getUpComingTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    const teacher = yield db_1.Teacher.findOne({ username });
    const currentDateTime = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const indianTime = currentDateTime.toLocaleString("en-IN", options);
    const upcoming = yield db_1.Test.find({
        $and: [
            { stream: teacher.stream },
            {
                $or: [
                    {
                        startDate: {
                            $gt: currentDateTime.toISOString().slice(0, 10),
                        },
                    },
                    {
                        startDate: currentDateTime.toISOString().slice(0, 10),
                        time: { $gt: indianTime.slice(11, 16) },
                    },
                ],
            },
        ],
    });
    res.status(200).json({
        message: "Done Successfully",
        upcoming,
    });
});
exports.getUpComingTests = getUpComingTests;
const getClosedTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    const teacher = yield db_1.Teacher.findOne({ username });
    const currentDateTime = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const indianTime = currentDateTime.toLocaleString("en-IN", options);
    const closed = yield db_1.Test.find({
        $and: [
            { stream: teacher.stream },
            {
                $or: [
                    {
                        startDate: {
                            $lt: currentDateTime.toISOString().slice(0, 10),
                        },
                    },
                    {
                        startDate: currentDateTime.toISOString().slice(0, 10),
                        endTime: { $lt: indianTime.slice(11, 16) },
                    },
                ],
            },
        ],
    });
    res.status(200).json({
        message: "Done Successfully",
        closed,
    });
});
exports.getClosedTests = getClosedTests;
const getLiveTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    const teacher = yield db_1.Teacher.findOne({ username });
    const currentDateTime = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const indianTime = currentDateTime.toLocaleString("en-IN", options);
    const live = yield db_1.Test.find({
        $and: [
            { stream: teacher.stream },
            { startDate: currentDateTime.toISOString().slice(0, 10) },
            { time: { $lte: indianTime.slice(11, 16) } },
            { endTime: { $gte: indianTime.slice(11, 16) } },
        ],
    });
    res.status(200).json({
        message: "Successfully Fetched the live test",
        live,
    });
});
exports.getLiveTests = getLiveTests;
