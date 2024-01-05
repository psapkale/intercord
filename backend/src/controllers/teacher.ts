import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Teacher } from '../db';

interface TeacherType extends Document {
   username: string;
   name: string;
   email: string;
   password: string;
   createdTests: [];
}

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
         token,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error('Error logging teacher:', e);
      res.status(500);
   }
};
