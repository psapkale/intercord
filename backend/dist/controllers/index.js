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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnnouncment = exports.getLiveTests = exports.getClosedTests = exports.getUpComingTests = exports.getSubjectFilteredTests = exports.getSubjectFilteredScoreBoard = exports.getScoreBoard = exports.serachTeacher = exports.serachStudent = exports.allTeachers = exports.allStudents = void 0;
const db_1 = require("../db");
const allStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allStudents = yield db_1.Student.find();
    if (!allStudents) {
        return res.status(500).json({
            message: 'Failed to get all students',
        });
    }
    res.status(200).json({ message: 'Done Successfully', allStudents });
});
exports.allStudents = allStudents;
const allTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTeachers = yield db_1.Teacher.find();
    if (!allTeachers) {
        return res.status(500).json({
            message: 'Failed to get all teachers',
        });
    }
    res.status(200).json({ message: 'Done Successfully', allTeachers });
});
exports.allTeachers = allTeachers;
const serachStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(400).json({
            message: 'Please provide student name',
        });
    }
    const student = yield db_1.Student.findOne({
        username: username,
    });
    if (!student) {
        return res.status(404).json({
            message: 'Student not found in the database',
        });
    }
    res.status(200).json({
        student,
    });
});
exports.serachStudent = serachStudent;
const serachTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(400).json({
            message: 'Please provide student name',
        });
    }
    const teacher = yield db_1.Teacher.findOne({
        username: username,
    });
    if (!teacher) {
        return res.status(404).json({
            message: 'Teacher not found in the database',
        });
    }
    res.status(200).json({
        teacher,
    });
});
exports.serachTeacher = serachTeacher;
const getScoreBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stream, pursuingYear } = req.body;
    if (!stream || !pursuingYear) {
        return res.status(400).json({
            message: 'Please provide stream and pursuing year of student',
        });
    }
    // Todo check null points
    const scoreBoard = yield db_1.Score.find({
        stream,
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
        message: 'Done Successfully',
        scoreBoard,
    });
});
exports.getScoreBoard = getScoreBoard;
const getSubjectFilteredScoreBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject } = req.params;
    const { stream, pursuingYear } = req.body;
    if (!subject) {
        return res.status(400).json({
            message: 'Please provide subject name',
        });
    }
    const allStudents = yield db_1.Student.find({
        stream,
        pursuingYear,
        // 'subjectScore.subject': subject,
    });
    if (!allStudents) {
        return res.status(500).json({
            message: 'Failed to retrieve students',
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
    res.status(200).json({
        message: 'Done Successfully',
        formattedRes,
    });
});
exports.getSubjectFilteredScoreBoard = getSubjectFilteredScoreBoard;
const getSubjectFilteredTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject } = req.params;
    const { stream, pursuingYear } = req.body;
    if (!subject) {
        return res.status(400).json({
            message: 'Please provide subject name',
        });
    }
    // replacing any special characters in the 'subject'
    const escapedSubject = subject.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const tests = yield db_1.Test.find({
        stream,
        forYear: pursuingYear,
        subject: { $regex: new RegExp(escapedSubject, 'i') },
    });
    if (!tests) {
        return res.status(500).json({
            message: 'Failed to retrieve tests',
        });
    }
    res.status(200).json({
        message: 'Done Successfully',
        tests,
    });
});
exports.getSubjectFilteredTests = getSubjectFilteredTests;
const getUpComingTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDateTime = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const indianTime = currentDateTime.toLocaleString('en-US', options);
    const upcoming = yield db_1.Test.find({
        $or: [
            {
                startDate: { $gt: currentDateTime.toISOString().slice(0, 10) },
            },
            {
                startDate: currentDateTime.toISOString().slice(0, 10),
                time: { $gt: indianTime.slice(11, 16) },
            },
        ],
    });
    res.status(200).json({
        message: 'Done Successfully',
        upcoming,
    });
});
exports.getUpComingTests = getUpComingTests;
const getClosedTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDateTime = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const indianTime = currentDateTime.toLocaleString('en-US', options);
    const closed = yield db_1.Test.find({
        $or: [
            {
                startDate: { $lt: currentDateTime.toISOString().slice(0, 10) },
            },
            {
                startDate: currentDateTime.toISOString().slice(0, 10),
                endTime: { $lt: indianTime.slice(11, 16) },
            },
        ],
    });
    res.status(200).json({
        message: 'Done Successfully',
        closed,
    });
});
exports.getClosedTests = getClosedTests;
const getLiveTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDateTime = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const indianTime = currentDateTime.toLocaleString('en-US', options);
    const live = yield db_1.Test.find({
        $and: [
            { startDate: currentDateTime.toISOString().slice(0, 10) },
            { time: { $lte: indianTime.slice(11, 16) } },
            { endTime: { $gte: indianTime.slice(11, 16) } },
        ],
    });
    res.status(200).json({
        message: 'Successfully Fetched the live test',
        live,
    });
});
exports.getLiveTests = getLiveTests;
const createAnnouncment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, creator } = req.body;
    const announcment = yield db_1.Announcment.create({
        title,
        description,
        creator,
    });
    yield db_1.Admin.updateMany({}, {
        $push: {
            announcements: announcment,
        },
    });
    yield db_1.Student.updateMany({}, {
        $push: {
            announcements: announcment,
        },
    });
    yield db_1.Teacher.updateMany({}, {
        $push: {
            announcements: announcment,
        },
    });
    res.status(200).json({
        announcment,
        message: 'Announment done!',
    });
});
exports.createAnnouncment = createAnnouncment;
