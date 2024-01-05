import { Router } from 'express';
import { teacherLogin } from '../controllers/teacher';
const router = Router();

// Todo add controllers
router.post('/login', teacherLogin);

export { router };
