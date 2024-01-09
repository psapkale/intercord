import { Router } from 'express';
import { createTest, teacherLogin } from '../controllers/teacher';
import { teacherMiddleware } from '../middlewares/teacher';
const router = Router();

// Todo add controllers
router.post('/login', teacherLogin);
router.post('/create-test', teacherMiddleware, createTest);

export { router };
