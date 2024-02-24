import mongoose from "mongoose";
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);
const conn = mongoose.connection;

// loggin message on database connect
conn.once("open", () => {
  console.log("Database connected");
});

// if any error occurs
conn.on("error", (err) => {
  console.log("Error in MongoDb ", err);
});

const AnnouncmentSchema = mongoose.Schema({
  title: String,
  description: String,
  seen: {
    type: Boolean,
    default: false,
  },
  creator: String,
});

const AdminSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  announcements: [AnnouncmentSchema],
});

const TeacherSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  stream: String,
  createdTests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
  announcements: [AnnouncmentSchema],
});

const PendingStudentSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  academicYear: String,
  stream: String,
  pursuingYear: {
    type: String,
    enum: ["I", "II", "III"],
  },
});

const StudentSubmissionsSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
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

const StudentSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  rank: Number,
  academicYear: String,
  stream: String,
  pursuingYear: {
    type: String,
    enum: ["I", "II", "III"],
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Test",
    default: [],
  },
});

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answerIndex: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
});

const TestSchema = new mongoose.Schema({
  subject: String,
  title: String,
  description: String,
  questions: [QuestionSchema],
  totalMarks: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  startDate: {
    type: String,
    default: new Date().toISOString().slice(0, 10),
  },
  time: {
    type: String,
    default: "00:00",
  },
  endTime: {
    type: String,
    default: "00:00",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Todo add test submissions schema
  submissions: [
    {
      submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      name: String,
      obtainedMarks: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const ScoreSchema = mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  name: String,
  username: String,
  submissions: Number,
  score: {
    type: Number,
    default: 0,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
const Teacher = mongoose.model("Teacher", TeacherSchema);
const PendingStudent = mongoose.model("PendingStudent", PendingStudentSchema);
const Student = mongoose.model("Student", StudentSchema);
const Test = mongoose.model("Test", TestSchema);
const Score = mongoose.model("Score", ScoreSchema);
const Announcment = mongoose.model("Announcment", AnnouncmentSchema);

export { Admin, Teacher, PendingStudent, Student, Test, Score, Announcment };
