import { Router } from 'express';
import {
   getMyTests,
   studentLogin,
   studentRegister,
} from '../controllers/student';
const router = Router();
import { studentMiddleware } from '../middlewares/student';

// Todo add controllers
router.post('/signup', studentRegister);
router.post('/login', studentLogin);
// router.get('/tests', studentMiddleware, getTests);
router.get('/mytests', studentMiddleware, getMyTests);

export { router };
