import { Types } from 'mongoose';

export interface AdminType {
   name: string;
   username: string;
   email: string;
   password: string;
}

export interface TeacherType {
   username: string;
   name: string;
   email: string;
   password: string;
   createdTests: TestType[];
}

export interface StudentType {
   username: string;
   name: string;
   email: string;
   password: string;
   // resolve submissions
   submissions: [];
}

export interface TestType {
   subject: string;
   description: string;
   questions: QuestionType[];
   createdBy: Types.ObjectId | string | null;
   createdAt: Date;
   submissions: SubmissionType[];
}

interface QuestionType {
   question: string;
   options: string[];
   answerIndex: 1 | 2 | 3 | 4;
}

interface SubmissionType {
   submittedBy: Types.ObjectId | string | null;
   obtainedMarks: number;
}
