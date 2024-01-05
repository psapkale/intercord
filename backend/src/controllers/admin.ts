import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Admin, Teacher } from '../db/index';

interface AdminType extends Document {
   name: string;
   username: string;
   email: string;
   password: string;
}

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

      const hashedPassword = await bcrypt.hash(password, 10);

      let teacher = await Teacher.findOne({ email });

      if (teacher) {
         return res.status(411).json({ message: 'Teacher already exists' });
      }

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
