import { Request, Response } from 'express';
import { ScoreType, StudentType } from '../types';
import { Score, Student } from '../db';

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

export const getScoreBoard = async (req: Request, res: Response) => {
   // Todo check null points
   const scoreBoard: ScoreType | null = await Score.find().sort({ score: -1 });

   res.status(200).json({
      message: 'Done Successfully',
      scoreBoard,
   });
};

export const getSubjectFilteredScoreBoard = async (
   req: Request,
   res: Response
) => {};
