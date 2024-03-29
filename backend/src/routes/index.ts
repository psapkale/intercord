import { Router } from 'express';
import {
   getUpComingTests,
   getScoreBoard,
   getSubjectFilteredScoreBoard,
   serachStudent,
   getClosedTests,
   getLiveTests,
   allStudents,
   getSubjectFilteredTests,
   serachTeacher,
   allTeachers,
} from '../controllers';

export const router = Router();

router.get('/search/student/all', allStudents);
router.get('/search/teacher/all', allTeachers);
router.get('/search/student/:username', serachStudent);
router.get('/search/teacher/:username', serachTeacher);
router.post('/score-board/all', getScoreBoard);
router.post('/score-board/subject/:subject', getSubjectFilteredScoreBoard);
router.post('/score-board/test/:subject', getSubjectFilteredTests);
router.get('/upcoming', getUpComingTests);
router.get('/closed', getClosedTests);
router.get('/live', getLiveTests);
