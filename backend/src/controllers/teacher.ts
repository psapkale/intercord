import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Teacher } from '../db';

// Todo all mongo logic here
export const teacherLogin = async (req: Request, res: Response) => {
   try {
      const { name, username, password } = req.body;
      if (!name || !username || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide name, username, and password' });
      }

      const teacher = await Teacher.find({ name, username, password });

      if (!teacher) {
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
