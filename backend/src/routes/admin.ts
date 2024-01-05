import { Router } from 'express';
import { adminLogin, createTeacher } from '../controllers/admin';
const router = Router();

// Todo add controllers
router.post('/login', adminLogin);
router.post('/create-teacher', createTeacher);

export { router };
