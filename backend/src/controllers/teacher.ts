import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PendingStudent, Score, Student, Teacher, Test } from '../db';
import { CustomRequest } from '../middlewares/teacher';
import { PendingStudentType, TeacherType } from '../types';

// Todo all mongo logic here
export const teacherLogin = async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide name, username, and password' });
      }

      const teacher: TeacherType | null = await Teacher.findOne({ email });

      if (!teacher) {
         return res.status(404).json({ message: 'Teacher not found' });
      }

      const isMatch = await bcrypt.compare(password, teacher.password);

      if (!isMatch) {
         return res
            .status(411)
            .json({ message: 'Incorrect username or password' });
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET);

      res.status(200).json({
         message: 'Teacher logged in successfully',
         teacher,
         token,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error('Error logging teacher:', e);
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

      const teacherId = (req as CustomRequest).teacherId;

      const payload = {
         subject,
         title,
         description,
         stream,
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
         return res.status(500).json({ message: 'Failed to create test' });
      }

      await Teacher.findOneAndUpdate(
         { _id: teacherId, stream },
         {
            $push: { createdTests: test._id },
         },
         { new: true }
      );

      res.status(200).json({
         message: 'Test created successfully',
         test,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error('Error logging teacher:', e);
      res.status(500);
   }
};

export const allowStudentRegister = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: 'Please provide student name',
      });
   }

   const pendingStudent: PendingStudentType | null =
      await PendingStudent.findOne({ username });

   if (!pendingStudent) {
      return res.status(500).json({ message: 'Failed to get students data' });
   }

   const hashedPassword = await bcrypt.hash(pendingStudent.password, 10);
   const totalStudents = await Student.find();

   const student = await Student.create({
      username: pendingStudent.username,
      name: pendingStudent.name,
      email: pendingStudent.email,
      password: hashedPassword,
      rank: totalStudents.length + 1,
      academicYear: pendingStudent.academicYear,
      stream: pendingStudent.stream,
      pursuingYear: pendingStudent.pursuingYear,
      submissions: [],
   });

   if (!student) {
      return res.status(500).json({ message: 'Failed to create student' });
   }

   await Score.create({
      candidateId: student._id,
      name: student.name,
      username: student.username,
      stream: student.stream,
      pursuingYear: student.pursuingYear,
      submissions: 0,
   });

   await PendingStudent.findOneAndDelete({ username });

   const token = jwt.sign({ username }, process.env.JWT_SECRET);

   res.status(200).json({
      message: 'Student registered successfully',
      student,
      token,
   });
};

export const rejectStudentRegister = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: 'Please provide student name',
      });
   }

   const pendingStudent = await PendingStudent.findOneAndDelete({ username });

   if (!pendingStudent) {
      return res.status(500).json({
         message: 'Failed to delete student request',
      });
   }

   res.status(200).json({
      message: 'Request rejected successfully',
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
         message: 'Failed to get pending requests',
      });
   }

   res.status(200).json({
      message: 'Done Successfully',
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
            $set: { 'announcements.$[].seen': true },
         }
      );
      res.status(200).json({
         message: 'All Seen Successfully',
      });
   } catch (error) {
      console.log(error, 'Error in student updateSeen route');
   }
};
