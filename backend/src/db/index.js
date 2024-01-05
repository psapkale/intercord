import mongoose from 'mongoose';
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const AdminSchema = new mongoose.Schema({
   name: String,
   username: String,
   email: String,
   password: String,
});

const TeacherSchema = new mongoose.Schema({
   username: String,
   name: String,
   email: String,
   password: String,
   createdTests: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Test',
      },
   ],
});

const StudentSchema = new mongoose.Schema({
   username: String,
   name: String,
   email: String,
   password: String,
   submissions: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Submission',
      },
   ],
});

const StudentSubmissionsSchema = new mongoose.Schema({
   test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
   },
   submittedAnswers: [Number],
   marksObtained: Number,
   submittedAt: {
      type: Date,
      default: Date.now,
   },
});

const QuestionSchema = new mongoose.Schema({
   description: String,
   options: [String],
   answerIndex: {
      type: Number,
      enum: [1, 2, 3, 4],
   },
});

const TestSchema = new mongoose.Schema({
   subject: String,
   description: String,
   totalQuestions: {
      type: Number,
      default: 0,
   },
   totalMarks: {
      type: Number,
      default: 0,
   },
   questions: [QuestionSchema],
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   submissions: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'TestSubmission',
      },
   ],
});

const TestSubmissionsSchema = mongoose.Schema({
   candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
   },
   marksObtained: Number,
});

const Admin = mongoose.model('Admin', AdminSchema);
const Teacher = mongoose.model('Teacher', TeacherSchema);
const Student = mongoose.model('Student', StudentSchema);
const StudentSubmissions = mongoose.model(
   'StudentSubmissions',
   StudentSubmissionsSchema
);
const Test = mongoose.model('Test', TestSchema);
const TestSubmissions = mongoose.model(
   'TestSubmissions',
   TestSubmissionsSchema
);

export { Admin, Teacher, Student, StudentSubmissions, Test, TestSubmissions };
