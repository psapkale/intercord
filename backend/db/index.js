const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdTests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
});

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
    },
  ],
});

const SubmissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  answers: [Number],
  totalMarks: Number,
  marksObtained: Number,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const QuestionSchema = new mongoose.Schema({
  description: String,
  options: [String],
  answerIndex: 1 | 2 | 3 | 4,
});

const TestSchema = new mongoose.Schema({
  subject: String,
  description: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  questions: [QuestionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
const Student = mongoose.model("Student", StudentSchema);
const Submission = mongoose.model("Submission", SubmissionSchema);
const Test = mongoose.model("Test", TestSchema);

module.exports = { Teacher, Student, Submission, Test };
