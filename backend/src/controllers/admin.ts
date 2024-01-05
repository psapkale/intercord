import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Admin, Teacher } from '../db/index';

// Todo all mongo logic here
export const adminLogin = async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body;
      if (!email || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide name, username, and password' });
      }

      const admin = await Admin.find({ email, password });

      if (!admin) {
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

      let teacher = await Teacher.find({
         name,
         username,
         password,
      });
      if (teacher) {
         return res.status(411).json({ message: 'Teacher already exists' });
      }

      // @ts-ignore
      teacher = await Teacher.create({
         username,
         name,
         email,
         password,
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
