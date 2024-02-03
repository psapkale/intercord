import { Request, Response } from 'express';
import { StudentType } from '../types';
import { Student } from '../db';

export const serachStudent = async (req: Request, res: Response) => {
   const { username } = req.params;

   if (!username) {
      return res.status(400).json({
         message: 'Please provide username',
      });
   }

   const student: StudentType | null = await Student.findOne({ username });

   if (!student) {
      return res.status(404).json({
         message: 'Student not found in the database',
      });
   }

   res.status(200).json({
      student,
   });
};
