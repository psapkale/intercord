import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PendingStudent, Score, Student, Teacher, Test } from "../db";
import { CustomRequest } from "../middlewares/teacher";
import {
   PendingStudentType,
   ScoreType,
   StudentType,
   SubjectScoreType,
   TeacherType,
   TestType,
} from "../types";

// Todo all mongo logic here
export const teacherLogin = async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
         return res
            .status(400)
            .json({ message: "Please provide name, username, and password" });
      }

      const teacher: TeacherType | null = await Teacher.findOne({ email });

      if (!teacher) {
         return res.status(404).json({ message: "Teacher not found" });
      }

      if (teacher.username !== username) {
         return res.status(404).json({
            message: "Username is wrong",
         });
      }

      const isMatch = await bcrypt.compare(password, teacher.password);

      if (!isMatch) {
         return res
            .status(411)
            .json({ message: "Incorrect username or password" });
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET);

      res.status(200).json({
         message: "Teacher logged in successfully",
         teacher,
         token,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error("Error logging teacher:", e);
      res.status(500);
   }
};

export const createTest = async (req: Request, res: Response) => {
   try {
      const {
         subject,
         title,
         description,
         stream, // BCS, BCA, ..
         forYear, // I, II, III
         totalQuestions,
         totalMarks,
         questions,
         startDate,
         time,
         endTime,
      } = req.body;

      console.log(stream);

      const teacherId = (req as CustomRequest).teacherId;

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

      const test = await Test.create(payload);

      if (!test) {
         return res.status(500).json({ message: "Failed to create test" });
      }

      await Teacher.findOneAndUpdate(
         { _id: teacherId, stream },
         {
            $push: { createdTests: test._id },
         },
         { new: true }
      );

      res.status(200).json({
         message: "Test created successfully",
         test,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error("Error logging teacher:", e);
      res.status(500);
   }
};

export const allowStudentRegister = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: "Please provide student name",
      });
   }

   const pendingStudent: PendingStudentType | null =
      await PendingStudent.findOne({ username });

   if (!pendingStudent) {
      return res.status(500).json({ message: "Failed to get students data" });
   }

   const hashedPassword = await bcrypt.hash(pendingStudent.password, 10);
   const totalStudents = await Student.find();

   const student = await Student.create({
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

   await Score.create({
      candidateId: student._id,
      name: student.name,
      username: student.username,
      stream: student.stream.toLowerCase(),
      pursuingYear: student.pursuingYear,
      submissions: 0,
   });

   await PendingStudent.findOneAndDelete({ username });

   const token = jwt.sign({ username }, process.env.JWT_SECRET);

   res.status(200).json({
      message: "Student registered successfully",
      student,
      token,
   });
};

export const rejectStudentRegister = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: "Please provide student name",
      });
   }

   const pendingStudent = await PendingStudent.findOneAndDelete({ username });

   if (!pendingStudent) {
      return res.status(500).json({
         message: "Failed to delete student request",
      });
   }

   res.status(200).json({
      message: "Request rejected successfully",
      pendingStudent,
   });
};

export const getAllPendingStudents = async (req: Request, res: Response) => {
   const { username } = res.locals;

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   const allPendingStudents = await PendingStudent.find({
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
};

export const updateSeenTeacher = async (req: Request, res: Response) => {
   const { username } = res.locals;

   try {
      await Teacher.updateOne(
         {
            username,
         },
         {
            $set: { "announcements.$[].seen": true },
         }
      );
      res.status(200).json({
         message: "All Seen Successfully",
      });
   } catch (error) {
      console.log(error, "Error in student updateSeen route");
   }
};

export const allStudents = async (req: Request, res: Response) => {
   const { username } = res.locals;

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   const allStudents: StudentType[] | null = await Student.find({
      stream: teacher.stream,
   });

   if (!allStudents) {
      return res.status(500).json({
         message: "Failed to get all students",
      });
   }

   res.status(200).json({ message: "Done Successfully", allStudents });
};

export const allTeachers = async (req: Request, res: Response) => {
   const { username } = res.locals;

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   const allTeachers: TeacherType[] | null = await Teacher.find({
      stream: teacher.stream,
   });

   if (!allTeachers) {
      return res.status(500).json({
         message: "Failed to get all teachers",
      });
   }

   res.status(200).json({ message: "Done Successfully", allTeachers });
};

export const serachStudent = async (req: Request, res: Response) => {
   const { username } = req.params;
   const currentTeacherUsername = res.locals.username;

   if (!username) {
      return res.status(400).json({
         message: "Please provide student name",
      });
   }

   const currentTeacher: TeacherType | null = await Teacher.findOne({
      username: currentTeacherUsername,
   });

   const resStudent = await Student.findOne({
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
};

export const serachTeacher = async (req: Request, res: Response) => {
   const { username } = req.params;
   const currentTeacherUsername = res.locals.username;

   if (!username) {
      return res.status(400).json({
         message: "Please provide student name",
      });
   }

   const currentTeacher: TeacherType | null = await Teacher.findOne({
      username: currentTeacherUsername,
   });

   const teacher: TeacherType | null = await Teacher.findOne({
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
};

export const getScoreBoard = async (req: Request, res: Response) => {
   const { pursuingYear } = req.body;
   const { username } = res.locals;

   if (!pursuingYear) {
      return res.status(400).json({
         message: "Please provide pursuing year of student",
      });
   }

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   // Todo check null points
   const scoreBoard = await Score.find({
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
};

export const getSubjectFilteredScoreBoard = async (
   req: Request,
   res: Response
) => {
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

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   const allStudents: StudentType[] | null = await Student.find({
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
      return student.subjectScore.some(
         (subjectScore) =>
            subjectScore.subject.toUpperCase() === subject.toUpperCase()
      );
   });

   // Todo remaining with testing
   const sortedStudents = filteredStudents.sort((x, y) => {
      const xSubjectScore = x.subjectScore.find((z) => z.subject === subject);
      const ySubjectScore = y.subjectScore.find((z) => z.subject === subject);

      if (xSubjectScore && ySubjectScore) {
         return ySubjectScore.score - xSubjectScore.score;
      } else {
         return 0;
      }
   });

   const formattedRes = sortedStudents.map((student) => {
      const requiredSubject: SubjectScoreType = student?.subjectScore?.find(
         (x) => x?.subject === subject
      );

      const filteredSubmission = student.submissions.filter((submission) => {
         return submission.subject === subject;
      });

      return {
         name: student?.name,
         username: student?.username,
         submissions: filteredSubmission?.length,
         score: requiredSubject?.score,
      };
   });

   console.log(formattedRes, "formattedRes");

   res.status(200).json({
      message: "Done Successfully",
      formattedRes,
   });
};

export const getSubjectFilteredTests = async (req: Request, res: Response) => {
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

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   // replacing any special characters in the 'subject'
   const escapedSubject = subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
   const tests: TestType[] | null = await Test.find({
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
};

export const getUpComingTests = async (req: Request, res: Response) => {
   const { username } = res.locals;

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   const currentDateTime = new Date();
   const options = { timeZone: "Asia/Kolkata", hour12: false };
   const indianTime = currentDateTime.toLocaleString("en-IN", options);

   const parts = indianTime.slice(0, 8).split("/");
   const currentDate = `${parts[2]}-${
      parseInt(parts[1]) < 10 ? `0${parts[1]}` : parts[1]
   }-${parseInt(parts[0]) < 10 ? `0${parts[0]}` : parts[0]}`;

   const upcoming = await Test.find({
      $and: [
         { stream: teacher.stream },
         {
            $or: [
               {
                  startDate: {
                     // $gt: currentDateTime.toISOString().slice(0, 10),
                     $gt: currentDate,
                  },
               },
               {
                  // startDate: currentDateTime.toISOString().slice(0, 10),
                  startDate: currentDate,
                  time: { $gt: indianTime.slice(10, 15) },
               },
            ],
         },
      ],
   });

   res.status(200).json({
      message: "Done Successfully",
      upcoming,
   });
};

export const getClosedTests = async (req: Request, res: Response) => {
   const { username } = res.locals;

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   const currentDateTime = new Date();
   const options = { timeZone: "Asia/Kolkata", hour12: false };
   const indianTime = currentDateTime.toLocaleString("en-IN", options);

   const parts = indianTime.slice(0, 8).split("/");
   const currentDate = `${parts[2]}-${
      parseInt(parts[1]) < 10 ? `0${parts[1]}` : parts[1]
   }-${parseInt(parts[0]) < 10 ? `0${parts[0]}` : parts[0]}`;

   const closed = await Test.find({
      $and: [
         { stream: teacher.stream },
         {
            $or: [
               {
                  startDate: {
                     // $lt: currentDateTime.toISOString().slice(0, 10),
                     $lt: currentDate,
                  },
               },
               {
                  startDate: currentDate,
                  endTime: { $lt: indianTime.slice(10, 15) },
               },
            ],
         },
      ],
   });

   res.status(200).json({
      message: "Done Successfully",
      closed,
   });
};

export const getLiveTests = async (req: Request, res: Response) => {
   const { username } = res.locals;

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   const currentDateTime = new Date();
   const options = { timeZone: "Asia/Kolkata", hour12: false };
   const indianTime = currentDateTime.toLocaleString("en-IN", options);

   const parts = indianTime.slice(0, 8).split("/");
   const currentDate = `${parts[2]}-${
      parseInt(parts[1]) < 10 ? `0${parts[1]}` : parts[1]
   }-${parseInt(parts[0]) < 10 ? `0${parts[0]}` : parts[0]}`;

   const live = await Test.find({
      $and: [
         { stream: teacher.stream },
         { startDate: currentDate },
         { time: { $lte: indianTime.slice(10, 15) } },
         { endTime: { $gte: indianTime.slice(10, 15) } },
      ],
   });

   res.status(200).json({
      message: "Successfully Fetched the live test",
      live,
   });
};
