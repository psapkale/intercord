import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL);

const AdminSchema = new mongoose.Schema({
   name: String,
   username: String,
   name: String,
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

const SubmissionSchema = new mongoose.Schema({
   student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
   },
   test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
   },
   submittedAnswers: [Number],
   totalMarks: {
      type: Number,
      default: 10,
   },
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
   totalQuestions: {
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
});

const Admin = mongoose.model('Admin', AdminSchema);
const Teacher = mongoose.model('Teacher', TeacherSchema);
const Student = mongoose.model('Student', StudentSchema);
const Submission = mongoose.model('Submission', SubmissionSchema);
const Test = mongoose.model('Test', TestSchema);

export { Admin, Teacher, Student, Submission, Test };
