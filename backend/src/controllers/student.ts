import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Student } from '../db';

interface StudentType extends Document {
   username: string;
   name: string;
   email: string;
   password: string;
   submissions: [];
}

// Todo all mongo logic here
export const studentRegister = async (req: Request, res: Response) => {
   try {
      const { name, email, username, password } = req.body;
      if (!name || !email || !username || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide name, username, and password' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const student = await Student.create({
         username,
         name,
         email,
         password: hashedPassword,
         submissions: [],
      });
      if (!student) {
         return res.status(500).json({ message: 'Failed to create student' });
      }

      res.status(200).json({
         message: 'Student created successfully',
         student,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error('Error creating student:', e);
      res.status(500);
   }
};

export const studentLogin = async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body;
      if (!email || !username || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide name, username, and password' });
      }

      const student: StudentType | null = await Student.findOne({ email });

      if (!student) {
         return res.status(404).json({ message: 'Student not found' });
      }

      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
         return res
            .status(411)
            .json({ message: 'Incorrect username or password' });
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET);

      res.status(200).json({
         message: 'Student logged in successfully',
         token,
      });
   } catch (e) {
      // ! Remove 'e' which might potentially show authorised details
      console.error('Error logging student:', e);
      res.status(500);
   }
};
