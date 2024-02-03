import express, { Request, Response } from 'express';
import { router as adminRouter } from './routes/admin';
import { router as teacherRouter } from './routes/teacher';
import { router as studentRouter } from './routes/student';
import cors from 'cors';
import dotenv from 'dotenv';
import { serachStudent } from './controllers';

const app = express();
const port = 3000;

// Defined routes
dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/api/admin', adminRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRouter);
// common routes
app.use('/api/search/:username', serachStudent);

// Start the server
app.listen(port, () => {
   console.log(`Server listening on port: ${3000}`);
});
