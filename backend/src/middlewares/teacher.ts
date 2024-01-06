import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Teacher } from '../db';
import { Types } from 'mongoose';

export interface TeacherType extends Document {
   _id: Types.ObjectId;
   username: string;
   name: string;
   email: string;
   password: string;
   createdTests: [];
}

export interface CustomRequest extends Request {
   teacherId?: Types.ObjectId;
}

async function teacherMiddleware(
   req: CustomRequest,
   res: Response,
   next: NextFunction
) {
   // Todo add authentication with jwt logic here
   const token: string | undefined = req.headers.authorization;
   if (!token) {
      return res
         .status(403)
         .json({ message: 'Authorization token not provided' });
   }
   const words: string[] = token.split(' ');
   const jwtToken: string = words[1];

   const decoded: JwtPayload = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET
   ) as JwtPayload;

   const { username } = decoded;

   if (!username) {
      return res.status(403).json({ message: 'You are not authenticated' });
   }

   const teacher: TeacherType | null = await Teacher.findOne({ username });

   if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
   }

   req.teacherId = teacher._id;

   next();
}

export { teacherMiddleware };
