import { Router } from 'express';
import { adminLogin, adminRegister, createTeacher } from '../controllers/admin';
const router = Router();

// Todo add controllers
router.post('/signup', adminRegister);
router.post('/login', adminLogin);
router.post('/teacher', createTeacher);

export { router };
