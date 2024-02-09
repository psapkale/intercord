import { Router } from 'express';
import {
   getScoreBoard,
   getSubjectFilteredScoreBoard,
   serachStudent,
} from '../controllers';

export const router = Router();

router.get('/search/:username', serachStudent);
router.get('/score-board/all', getScoreBoard);
router.get('/score-board/:subjectId', getSubjectFilteredScoreBoard);
