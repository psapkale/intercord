import { Router } from 'express';
import {
   allStudents,
   allTeachers,
   bookMarkTest,
   getAllBookMarkTest,
   getClosedTests,
   getLiveTests,
   getMyTests,
   getScoreBoard,
   getSubjectFilteredScoreBoard,
   getSubjectFilteredTests,
   getTestById,
   getUpComingTests,
   serachStudent,
   serachTeacher,
   studentLogin,
   studentRegister,
   testSubmission,
   updateSeenStudent,
   updateStudentProfile,
} from '../controllers/student';
const router = Router();
import { studentMiddleware } from '../middlewares/student';

// Todo add controllers
router.post('/signup', studentRegister);
router.post('/login', studentLogin);
router.get('/mytests', studentMiddleware, getMyTests);
router.get('/test/:testId', studentMiddleware, getTestById);
router.post('/test/:testId', studentMiddleware, testSubmission);
router.post('/bookmark', studentMiddleware, bookMarkTest);
router.get('/allbookmarktest', studentMiddleware, getAllBookMarkTest);
router.put('/updateprofile', studentMiddleware, updateStudentProfile);
router.put('/updateseen', studentMiddleware, updateSeenStudent);

router.get('/search/student/all', studentMiddleware, allStudents);
router.get('/search/teacher/all', studentMiddleware, allTeachers);
router.get('/search/student/:username', serachStudent);
router.get('/search/teacher/:username', serachTeacher);
router.get('/score-board/all', getScoreBoard);
router.get('/score-board/subject/:subject', getSubjectFilteredScoreBoard);
router.get('/score-board/test/:subject', getSubjectFilteredTests);
router.get('/upcoming', getUpComingTests);
router.get('/closed', getClosedTests);
router.get('/live', getLiveTests);

export { router };
