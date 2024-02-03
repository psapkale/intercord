import { Router } from 'express';
import {
   getMyTests,
   studentLogin,
   studentRegister,
   testSubmission,
} from '../controllers/student';
const router = Router();
import { studentMiddleware } from '../middlewares/student';

// Todo add controllers
router.post('/signup', studentRegister);
router.post('/login', studentLogin);
router.get('/mytests', studentMiddleware, getMyTests);
router.post('/test/:testId', studentMiddleware, testSubmission);

export { router };
