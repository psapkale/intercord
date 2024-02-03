import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Admin, Student, Teacher } from '../db/index';
import { AdminType } from '../types';

// Todo all mongo logic here
export const adminLogin = async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide name, username, and password' });
      }

      const admin: AdminType | null = await Admin.findOne({ email });

      if (!admin) {
         return res.status(404).json({ message: 'Admin not found' });
      }

      const isMatch: boolean = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
         return res
            .status(411)
            .json({ message: 'Incorrect username or password' });
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET);
      res.status(200).json({ message: 'Admin logged in successfully', token });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error('Error logging admin:', e);
      res.status(500);
   }
};

export const createTeacher = async (req: Request, res: Response) => {
   try {
      const { name, email, username, password } = req.body;
      if (!name || !email || !username || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide name, username, and password' });
      }

      let teacher = await Teacher.findOne({ email });

      if (teacher) {
         return res.status(400).json({
            message: 'Teacher already exists with this email',
         });
      }

      teacher = await Teacher.findOne({ username });

      if (teacher) {
         return res.status(400).json({
            message: 'Username already taken',
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      teacher = await Teacher.create({
         username,
         name,
         email,
         password: hashedPassword,
         createdTests: [],
      });

      if (!teacher) {
         return res.status(500).json({ message: 'Failed to create teacher' });
      }

      res.status(200).json({
         message: 'Teacher created successfully',
         teacher,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error('Error creating teacher:', e);
      res.status(500);
   }
};

export const removeTeacher = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: 'Please provide username',
      });
   }

   const teacher = await Teacher.findOneAndDelete({ username });

   if (!teacher) {
      return res.status(404).json({
         message: 'Teacher not found in the database',
      });
   }

   res.status(200).json({
      message: 'Teacher deleted successfully',
      teacher,
   });
};

export const removeStudent = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: 'Please provide username',
      });
   }

   const student = await Student.findOneAndDelete({ username });

   if (!student) {
      return res.status(404).json({
         message: 'Student not found in the database',
      });
   }

   res.status(200).json({
      message: 'Student deleted successfully',
      student,
   });
};
