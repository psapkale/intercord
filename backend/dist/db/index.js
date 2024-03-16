"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcment = exports.Score = exports.Test = exports.Student = exports.PendingStudent = exports.Teacher = exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
mongoose_1.default.connect(process.env.MONGO_URL);
const conn = mongoose_1.default.connection;
// loggin message on database connect
conn.once('open', () => {
    console.log('Database connected');
});
// if any error occurs
conn.on('error', (err) => {
    console.log('Error in MongoDb ', err);
});
const AnnouncmentSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    seen: {
        type: Boolean,
        default: false,
    },
    creator: String,
});
const AdminSchema = new mongoose_1.default.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    announcements: [AnnouncmentSchema],
});
const TeacherSchema = new mongoose_1.default.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    stream: String,
    createdTests: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Test',
        },
    ],
    announcements: [AnnouncmentSchema],
});
const PendingStudentSchema = new mongoose_1.default.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    academicYear: String,
    stream: String,
    pursuingYear: {
        type: String,
        enum: ['I', 'II', 'III'],
    },
});
const StudentSubmissionsSchema = new mongoose_1.default.Schema({
    test: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Test',
    },
    subject: String,
    submittedAnswersIndex: [Number],
    marksObtained: {
        type: Number,
        default: 0,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});
const StudentSchema = new mongoose_1.default.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    initrank: Number,
    academicYear: String,
    stream: String,
    pursuingYear: {
        type: String,
        enum: ['I', 'II', 'III'],
    },
    linkedinUrl: String,
    githubUrl: String,
    twitterUrl: String,
    announcements: [AnnouncmentSchema],
    subjectScore: [
        {
            subject: String,
            score: Number,
        },
    ],
    submissions: [StudentSubmissionsSchema],
    bookmark: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Test',
        default: [],
    },
});
const QuestionSchema = new mongoose_1.default.Schema({
    question: String,
    options: [String],
    answerIndex: {
        type: Number,
        enum: [1, 2, 3, 4],
    },
});
const TestSchema = new mongoose_1.default.Schema({
    subject: String,
    title: String,
    description: String,
    stream: String,
    forYear: {
        type: String,
        enum: ['I', 'II', 'III'],
    },
    questions: [QuestionSchema],
    totalMarks: Number,
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    startDate: {
        type: String,
        default: new Date().toISOString().slice(0, 10),
    },
    time: {
        type: String,
        default: '00:00',
    },
    endTime: {
        type: String,
        default: '00:00',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Todo add test submissions schema
    submissions: [
        {
            submittedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Student',
            },
            name: String,
            obtainedMarks: {
                type: Number,
                default: 0,
            },
            submittedAt: {
                type: String,
                default: '00:00',
            },
            name: String,
            obtainedMarks: {
                type: Number,
                default: 0,
            },
        },
    ],
});
const ScoreSchema = new mongoose_1.default.Schema({
    candidateId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
    name: String,
    username: String,
    stream: String,
    pursuingYear: {
        type: String,
        enum: ['I', 'II', 'III'],
    },
    submissions: Number,
    score: {
        type: Number,
        default: 0,
    },
});
const Admin = mongoose_1.default.model('Admin', AdminSchema);
exports.Admin = Admin;
const Teacher = mongoose_1.default.model('Teacher', TeacherSchema);
exports.Teacher = Teacher;
const PendingStudent = mongoose_1.default.model('PendingStudent', PendingStudentSchema);
exports.PendingStudent = PendingStudent;
const Student = mongoose_1.default.model('Student', StudentSchema);
exports.Student = Student;
const Test = mongoose_1.default.model('Test', TestSchema);
exports.Test = Test;
const Score = mongoose_1.default.model('Score', ScoreSchema);
exports.Score = Score;
const Announcment = mongoose_1.default.model('Announcment', AnnouncmentSchema);
exports.Announcment = Announcment;
