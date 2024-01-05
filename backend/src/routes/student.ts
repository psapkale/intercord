import { Router } from 'express';
import { studentLogin, studentRegister } from '../controllers/student';
const router = Router();

// Todo add controllers
router.post('/signup', studentRegister);
router.post('/login', studentLogin);

export { router };
