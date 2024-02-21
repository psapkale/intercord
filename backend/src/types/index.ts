import { ObjectId } from 'mongoose';

export interface AdminType {
   name: string;
   username: string;
   email: string;
   password: string;
}

export interface TeacherType {
   _id: ObjectId;
   username: string;
   name: string;
   email: string;
   password: string;
   createdTests: TestType[];
}

export interface StudentType extends Document {
   _id: ObjectId;
   username: string;
   name: string;
   email: string;
   password: string;
   linkedinUrl: string;
   githubUrl: string;
   twitterUrl: string;
   subjectScore: SubjectScoreType[];
   // resolve submissions
   submissions: StudentSubmissionType[];
   bookmark: ObjectId[];
   save: () => Promise<Document>;
}

export interface TestType {
   _id: ObjectId;
   subject: string;
   title: string;
   description: string;
   questions: QuestionType[];
   createdBy: ObjectId | string | null;
   createdAt: Date;
   startDate: string;
   endTime: string;
   submissions: TestSubmissionType[];
   totalMarks: number;
   save: () => Promise<Document>;
}

export interface SubjectScoreType {
   subject: string;
   score: number;
}

interface QuestionType {
   question: string;
   options: string[];
   answerIndex: 1 | 2 | 3 | 4;
}

interface TestSubmissionType {
   submittedBy: ObjectId | string | null;
   name: string;
   obtainedMarks: number;
}

interface StudentSubmissionType {
   test: ObjectId | string | null;
   subject: string;
   submittedAnswersIndex: number[];
   marksObtained: number;
   submittedAt: Date;
}

export interface ScoreType {
   candidate: ObjectId | string | null;
   name: string;
   submissions: number;
   score: number;
}
