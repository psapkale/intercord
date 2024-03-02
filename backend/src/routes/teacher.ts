import { Router } from 'express';
import {
   allStudents,
   allTeachers,
   allowStudentRegister,
   createTest,
   getAllPendingStudents,
   getClosedTests,
   getLiveTests,
   getScoreBoard,
   getSubjectFilteredScoreBoard,
   getSubjectFilteredTests,
   getUpComingTests,
   rejectStudentRegister,
   serachStudent,
   serachTeacher,
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

router.get('/search/student/all', teacherMiddleware, allStudents);
router.get('/search/teacher/all', teacherMiddleware, allTeachers);
router.get('/search/student/:username', teacherMiddleware, serachStudent);
router.get('/search/teacher/:username', teacherMiddleware, serachTeacher);
router.get('/score-board/all', teacherMiddleware, getScoreBoard);
router.get(
   '/score-board/subject/:subject',
   teacherMiddleware,
   getSubjectFilteredScoreBoard
);
router.get(
   '/score-board/test/:subject',
   teacherMiddleware,
   getSubjectFilteredTests
);
router.get('/upcoming', teacherMiddleware, getUpComingTests);
router.get('/closed', teacherMiddleware, getClosedTests);
router.get('/live', teacherMiddleware, getLiveTests);

export { router };
