import { Router } from 'express';
import {
   allowStudentRegister,
   createTest,
   getAllPendingStudents,
   rejectStudentRegister,
   teacherLogin,
   updateSeenTeacher,
} from '../controllers/teacher';
import { teacherMiddleware } from '../middlewares/teacher';
import { createAnnouncment } from '../controllers';
const router = Router();

// Todo add controllers
router.post('/login', teacherLogin);
router.post('/create-test', teacherMiddleware, createTest);
router.post('/create-announcment', teacherMiddleware, createAnnouncment);
router.get('/allow/:username', teacherMiddleware, allowStudentRegister);
router.get('/reject/:username', teacherMiddleware, rejectStudentRegister);
router.get('/allrequest', teacherMiddleware, getAllPendingStudents);
router.put('/updateseen', teacherMiddleware, updateSeenTeacher);

export { router };
