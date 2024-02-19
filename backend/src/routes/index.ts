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
router.get('/search/student/:name', serachStudent);
router.get('/search/teacher/:name', serachTeacher);
router.get('/score-board/all', getScoreBoard);
router.get('/score-board/subject/:subject', getSubjectFilteredScoreBoard);
router.get('/score-board/test/:subject', getSubjectFilteredTests);
router.get('/upcoming', getUpComingTests);
router.get('/closed', getClosedTests);
router.get('/live', getLiveTests);
