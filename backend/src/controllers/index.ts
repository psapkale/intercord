import { Request, Response } from 'express';
import {
   ScoreType,
   StudentType,
   SubjectScoreType,
   TeacherType,
   TestType,
} from '../types';
import { Admin, Announcment, Score, Student, Teacher, Test } from '../db';

export const allStudents = async (req: Request, res: Response) => {
   const allStudents: StudentType[] | null = await Student.find();

   if (!allStudents) {
      return res.status(500).json({
         message: 'Failed to get all students',
      });
   }

   res.status(200).json({ message: 'Done Successfully', allStudents });
};

export const allTeachers = async (req: Request, res: Response) => {
   const allTeachers: TeacherType[] | null = await Teacher.find();

   if (!allTeachers) {
      return res.status(500).json({
         message: 'Failed to get all teachers',
      });
   }

   res.status(200).json({ message: 'Done Successfully', allTeachers });
};

export const serachStudent = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: 'Please provide student name',
      });
   }

   const student: StudentType | null = await Student.findOne({
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
};

export const serachTeacher = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: 'Please provide student name',
      });
   }

   const teacher: TeacherType | null = await Teacher.findOne({
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
};

export const getScoreBoard = async (req: Request, res: Response) => {
   const { stream, pursuingYear } = req.body;

   if (!stream || !pursuingYear) {
      return res.status(400).json({
         message: 'Please provide stream and pursuing year of student',
      });
   }

   // Todo check null points
   const scoreBoard = await Score.find({
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
};

export const getSubjectFilteredScoreBoard = async (
   req: Request,
   res: Response
) => {
   const { subject } = req.params;

   if (!subject) {
      return res.status(400).json({
         message: 'Please provide subject name',
      });
   }

   const students: StudentType[] | null = await Student.find({
      'subjectScore.subject': subject,
   });

   if (!students) {
      return res.status(500).json({
         message: 'Failed to retrieve students',
      });
   }

   // Todo remaining with testing
   const sortedStudents = students.sort((x, y) => {
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

   res.status(200).json({
      message: 'Done Successfully',
      formattedRes,
   });
};

export const getSubjectFilteredTests = async (req: Request, res: Response) => {
   const { subject } = req.params;

   if (!subject) {
      return res.status(400).json({
         message: 'Please provide subject name',
      });
   }

   // replacing any special characters in the 'subject'
   const escapedSubject = subject.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   const tests: TestType[] | null = await Test.find({
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
};

export const getUpComingTests = async (req: Request, res: Response) => {
   const currentDateTime = new Date();
   const options = { timeZone: 'Asia/Kolkata', hour12: false };
   const indianTime = currentDateTime.toLocaleString('en-US', options);

   const upcoming = await Test.find({
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
};

export const getClosedTests = async (req: Request, res: Response) => {
   const currentDateTime = new Date();
   const options = { timeZone: 'Asia/Kolkata', hour12: false };
   const indianTime = currentDateTime.toLocaleString('en-US', options);

   const closed = await Test.find({
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
};

export const getLiveTests = async (req: Request, res: Response) => {
   const currentDateTime = new Date();
   const options = { timeZone: 'Asia/Kolkata', hour12: false };
   const indianTime = currentDateTime.toLocaleString('en-US', options);

   const live = await Test.find({
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
};

export const createAnnouncment = async (req: Request, res: Response) => {
   const { title, description, creator } = req.body;

   const announcment = await Announcment.create({
      title,
      description,
      creator,
   });

   await Admin.updateMany(
      {},
      {
         $push: {
            announcements: announcment,
         },
      }
   );

   await Student.updateMany(
      {},
      {
         $push: {
            announcements: announcment,
         },
      }
   );

   await Teacher.updateMany(
      {},
      {
         $push: {
            announcements: announcment,
         },
      }
   );

   res.status(200).json({
      announcment,
      message: 'Announment done!',
   });
};
