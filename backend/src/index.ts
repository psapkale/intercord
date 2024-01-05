import express, { Request, Response } from 'express';
import { router as adminRouter } from './routes/admin';
import { router as teacherRouter } from './routes/teacher';
import { router as studentRouter } from './routes/student';
import cors from 'cors';

const app = express();
const port = 3000;

// Defined routes
app.use(express.json());
app.use(cors());
app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);

// Start the server
app.listen(port, () => {
   console.log(`Server listening on port: ${3000}`);
});
