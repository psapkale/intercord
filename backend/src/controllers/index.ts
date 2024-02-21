import { Request, Response } from 'express';
import { ScoreType, StudentType, TeacherType, TestType } from '../types';
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
   const { name } = req.params;

   if (!name) {
      return res.status(400).json({
         message: 'Please provide student name',
      });
   }

   const student: StudentType | null = await Student.findOne({
      name: { $regex: name, $options: 'i' },
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
   const { name } = req.params;

   if (!name) {
      return res.status(400).json({
         message: 'Please provide student name',
      });
   }

   const teacher: TeacherType | null = await Teacher.findOne({
      name: { $regex: name, $options: 'i' },
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
   // Todo check null points
   const scoreBoard: ScoreType[] | null = await Score.find().sort({
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
      console.log(x.subjectScore[0].score, y.subjectScore[0].score);

      return y.subjectScore.score - x.subjectScore.score;
   });

   res.status(200).json({
      message: 'Done Successfully',
      sortedStudents,
   });
};

export const getSubjectFilteredTests = async (req: Request, res: Response) => {
   const { subject } = req.params;

   if (!subject) {
      return res.status(400).json({
         message: 'Please provide subject name',
      });
   }

   const tests: TestType[] | null = await Test.find({ subject });

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
