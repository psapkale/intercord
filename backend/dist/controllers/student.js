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
exports.getLiveTests = exports.getClosedTests = exports.getUpComingTests = exports.getSubjectFilteredTests = exports.getSubjectFilteredScoreBoard = exports.getScoreBoard = exports.serachTeacher = exports.serachStudent = exports.allTeachers = exports.allStudents = exports.updateSeenStudent = exports.updateStudentProfile = exports.getAllBookMarkTest = exports.bookMarkTest = exports.testSubmission = exports.getTestById = exports.getMyTests = exports.studentLogin = exports.studentRegister = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
// Todo all mongo logic here
// Todo restrict creating duplicate users
const studentRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, username, password, academicYear, stream, pursuingYear, } = req.body;
        if (!name ||
            !email ||
            !username ||
            !password ||
            !academicYear ||
            !stream ||
            !pursuingYear) {
            return res
                .status(400)
                .json({ message: "Please provide all the details" });
        }
        let student = yield db_1.Student.findOne({ email });
        if (student) {
            return res.status(400).json({
                message: "Student already exists with this email",
            });
        }
        student = yield db_1.Student.findOne({ username });
        if (student) {
            return res.status(400).json({
                message: "Username already taken",
            });
        }
        let pendingStudent = yield db_1.PendingStudent.findOne({ username, email });
        if (pendingStudent) {
            return res.status(400).json({
                message: "Request already exists",
            });
        }
        pendingStudent = yield db_1.PendingStudent.create({
            username,
            name,
            email,
            password,
            academicYear,
            stream,
            pursuingYear,
        });
        res.status(200).json({
            message: "Request sent successfully. Wait until it gets approved!",
        });
    }
    catch (e) {
        // ! Remove 'e' which might potentially show authorised details
        console.error("Error creating student:", e);
        res.status(500);
    }
});
exports.studentRegister = studentRegister;
const studentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!email || !username || !password) {
            return res
                .status(400)
                .json({ message: "Please provide username, email and password" });
        }
        const student = yield db_1.Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        if (student.username !== username) {
            return res.status(411).json({ message: "Incorrect username" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, student.password);
        if (!isMatch) {
            return res.status(411).json({ message: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET);
        res.status(200).json({
            student,
            message: "Student logged in successfully",
            token,
        });
    }
    catch (e) {
        // ! Remove 'e' which might potentially show authorised details
        console.error("Error logging student:", e);
        res.status(500);
    }
});
exports.studentLogin = studentLogin;
const getMyTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // passing username from auth middleware
    const { username } = res.locals;
    const student = yield db_1.Student.findOne({ username });
    const submissions = student === null || student === void 0 ? void 0 : student.submissions;
    res.status(200).json({
        submissions,
    });
});
exports.getMyTests = getMyTests;
const getTestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { testId } = req.params;
    const { username } = res.locals;
    if (!testId) {
        return res.status(400).json({
            message: "Please provide test id",
        });
    }
    let test = yield db_1.Test.findOne({ _id: testId });
    if (!test) {
        return res.status(404).json({
            message: "Test not found",
        });
    }
    const student = yield db_1.Student.findOne({ username });
    const isRepeat = (_a = test === null || test === void 0 ? void 0 : test.submissions) === null || _a === void 0 ? void 0 : _a.find((submission) => String(student === null || student === void 0 ? void 0 : student._id) === String(submission === null || submission === void 0 ? void 0 : submission.submittedBy));
    const sortedSubmissions = test.submissions.sort((x, y) => y.obtainedMarks - x.obtainedMarks);
    const currentDateTime = new Date();
    const options = {
        timeZone: "Asia/Kolkata",
        hour12: false,
    };
    const indianTime = currentDateTime.toLocaleString("en-US", options);
    const formattedDate = new Date(indianTime).toISOString().split("T")[0];
    if (isRepeat &&
        (test === null || test === void 0 ? void 0 : test.startDate) === formattedDate &&
        indianTime.slice(11, 16) <= (test === null || test === void 0 ? void 0 : test.endTime)) {
        return res.status(400).json({
            message: "Response already submitted",
        });
    }
    const teacher = yield db_1.Teacher.findOne({
        _id: test.createdBy,
    });
    if (!teacher) {
        return res.status(500).json({
            message: "Failed to find some test data",
        });
    }
    res.status(200).json({
        message: "Done Successfully",
        test,
        creator: teacher.username,
        sortedSubmissions,
    });
});
exports.getTestById = getTestById;
const testSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f;
    const { testId } = req.params;
    const { submittedAnswersIndex } = req.body; // from frontend
    let marksObtained = 0;
    const { username } = res.locals;
    if (!testId) {
        return res.status(400).json({
            message: "Please provide test id",
        });
    }
    if (!submittedAnswersIndex) {
        return res.status(400).json({
            message: "Please provide test response",
        });
    }
    let student = yield db_1.Student.findOne({ username });
    const test = yield db_1.Test.findOne({ _id: testId });
    const marksPerQuestion = (test === null || test === void 0 ? void 0 : test.totalMarks) / ((_b = test === null || test === void 0 ? void 0 : test.questions) === null || _b === void 0 ? void 0 : _b.length);
    (_c = test === null || test === void 0 ? void 0 : test.questions) === null || _c === void 0 ? void 0 : _c.map((question, i) => {
        if ((question === null || question === void 0 ? void 0 : question.answerIndex) === submittedAnswersIndex[i]) {
            marksObtained += marksPerQuestion;
        }
    });
    const formattedTime = new Date().toTimeString();
    (_d = test === null || test === void 0 ? void 0 : test.submissions) === null || _d === void 0 ? void 0 : _d.push({
        submittedBy: student === null || student === void 0 ? void 0 : student._id,
        name: student === null || student === void 0 ? void 0 : student.name,
        obtainedMarks: marksObtained,
        submittedAt: formattedTime.slice(0, 8),
    });
    yield (test === null || test === void 0 ? void 0 : test.save());
    (_e = student === null || student === void 0 ? void 0 : student.submissions) === null || _e === void 0 ? void 0 : _e.push({
        test: test._id,
        testTitle: test.title,
        subject: test.subject,
        submittedAnswersIndex: submittedAnswersIndex,
        marksObtained: marksObtained,
        submittedAt: new Date(Date.now()),
    });
    yield (student === null || student === void 0 ? void 0 : student.save());
    //  student = await Student.findOneAndUpdate(
    //     { username },
    //     {
    //        $push: {
    //           submissions: {
    //              test: test._id,
    //              subject: test.subject,
    //              submittedAnswersIndex: submittedAnswersIndex,
    //              marksObtained: marksObtained,
    //              submittedAt: new Date(Date.now()),
    //           },
    //        },
    //     },
    //     { new: true }
    //  );
    if (!student) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    if (Array.isArray(student.subjectScore)) {
        // const allSubjectScores: SubjectScoreType[];
        const subjectIndex = student.subjectScore.findIndex((x) => x.subject === test.subject);
        if (subjectIndex === -1) {
            student.subjectScore.push({
                subject: test.subject,
                score: marksObtained,
            });
        }
        else {
            student.subjectScore[subjectIndex].score += marksObtained;
        }
        yield student.save();
    }
    else {
        console.error("student.subjectScore is not an array");
    }
    // Todo resove score data
    const score = yield db_1.Score.findOneAndUpdate({ candidateId: student._id }, {
        $inc: {
            score: marksObtained,
        },
        submissions: (_f = student === null || student === void 0 ? void 0 : student.submissions) === null || _f === void 0 ? void 0 : _f.length,
    }, { new: true });
    res.json({
        message: "Test submitted successfully",
        test,
        student,
        score,
    });
});
exports.testSubmission = testSubmission;
const bookMarkTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testId } = req.body;
    const { username } = res.locals;
    const student = yield db_1.Student.findOneAndUpdate({
        username: username,
    });
    if (!student) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    let indexOfTest = student.bookmark.indexOf(testId);
    if (indexOfTest == -1) {
        student.bookmark.push(testId);
    }
    else {
        student.bookmark.splice(indexOfTest, 1);
    }
    yield student.save();
    if (indexOfTest == -1)
        return res.status(200).json({
            message: "Test Bookmark Succesfully",
        });
    res.status(200).json({
        message: "Test remove from Bookmark Succesfully",
    });
});
exports.bookMarkTest = bookMarkTest;
const getAllBookMarkTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    try {
        const student = yield db_1.Student.findOne({
            username: username,
        });
        const allBookmarkedTests = yield db_1.Test.find({
            _id: { $in: student.bookmark },
        });
        res.status(200).json({
            allBookmarkedTests,
        });
    }
    catch (error) {
        res.status(500).json({
            messsage: "Some error occured",
        });
        console.log(error, "Error in GetAllBookMarkedTest");
    }
});
exports.getAllBookMarkTest = getAllBookMarkTest;
const updateStudentProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username } = res.locals;
    const { name, usernameNew, password, email, githubUrl, linkdinUrl, twitterUrl, } = req.body;
    try {
        const student = yield db_1.Student.findOne({
            username: username,
        });
        if (!student) {
            return res.status(200).json({
                message: "Student Not Found",
            });
        }
        // changing password if it is provided
        if (password) {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            student.password = hashedPassword;
        }
        student.name = name || student.name;
        student.username = usernameNew || student.username;
        student.email = email || student.email;
        student.githubUrl = githubUrl || student.githubUrl;
        student.linkedinUrl = linkdinUrl || student.linkedinUrl;
        student.twitterUrl = twitterUrl || student.twitterUrl;
        yield student.save();
        res.status(200).json({
            message: "Student Profile Updated",
            user: student,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Some Error occured!",
        });
        console.log("Error in Update Student ", error);
    }
});
exports.updateStudentProfile = updateStudentProfile;
const updateSeenStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    try {
        yield db_1.Student.updateOne({
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
exports.updateSeenStudent = updateSeenStudent;
const allStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = res.locals;
    const student = yield db_1.Student.findOne({ username });
    const allStudents = yield db_1.Student.find({
        stream: student.stream,
        pursuingYear: student.pursuingYear,
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
    const student = yield db_1.Student.findOne({ username });
    const allTeachers = yield db_1.Teacher.find({
        stream: student.stream,
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
    const currentStudentUsername = res.locals.username;
    if (!username) {
        return res.status(400).json({
            message: "Please provide student name",
        });
    }
    const currentStudent = yield db_1.Student.findOne({
        username: currentStudentUsername,
    });
    const resStudent = yield db_1.Student.findOne({
        username,
        stream: currentStudent.stream,
        pursuingYear: currentStudent.pursuingYear,
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
    const currentStudentUsername = res.locals.username;
    if (!username) {
        return res.status(400).json({
            message: "Please provide student name",
        });
    }
    const currentStudent = yield db_1.Student.findOne({
        username: currentStudentUsername,
    });
    const teacher = yield db_1.Teacher.findOne({
        username,
        stream: currentStudent.stream,
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
    const { username } = res.locals;
    const student = yield db_1.Student.findOne({ username });
    // Todo check null points
    const scoreBoard = yield db_1.Score.find({
        stream: student.stream,
        pursuingYear: student.pursuingYear,
    }).sort({
        score: -1,
    });
    console.log(scoreBoard);
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
    const { username } = res.locals;
    if (!subject) {
        return res.status(400).json({
            message: "Please provide subject name",
        });
    }
    const student = yield db_1.Student.findOne({ username });
    const allStudents = yield db_1.Student.find({
        stream: student.stream,
        pursuingYear: student.pursuingYear,
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
    res.status(200).json({
        message: "Done Successfully",
        formattedRes,
    });
});
exports.getSubjectFilteredScoreBoard = getSubjectFilteredScoreBoard;
const getSubjectFilteredTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject } = req.params;
    const { username } = res.locals;
    if (!subject) {
        return res.status(400).json({
            message: "Please provide subject name",
        });
    }
    const student = yield db_1.Student.findOne({ username });
    // replacing any special characters in the 'subject'
    const escapedSubject = subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const tests = yield db_1.Test.find({
        subject: { $regex: new RegExp(escapedSubject, "i") },
        stream: student.stream,
        forYear: student.pursuingYear,
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
    const student = yield db_1.Student.findOne({ username });
    const currentDateTime = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const indianTime = new Date().toLocaleString("en-IN", options);
    console.log(indianTime.slice(11, 16));
    const upcoming = yield db_1.Test.find({
        $and: [
            {
                stream: student === null || student === void 0 ? void 0 : student.stream,
                forYear: student === null || student === void 0 ? void 0 : student.pursuingYear,
            },
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
    const student = yield db_1.Student.findOne({ username });
    const currentDateTime = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const indianTime = currentDateTime.toLocaleString("en-IN", options);
    const closed = yield db_1.Test.find({
        $and: [
            { stream: student.stream, forYear: student.pursuingYear },
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
    const student = yield db_1.Student.findOne({ username });
    const currentDateTime = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const indianTime = currentDateTime.toLocaleString("en-IN", options);
    const live = yield db_1.Test.find({
        $and: [
            { stream: student.stream, forYear: student.pursuingYear },
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
