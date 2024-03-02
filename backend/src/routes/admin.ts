import { Router } from 'express';
import {
   adminLogin,
   createAdmin,
   createTeacher,
   removeStudent,
   removeTeacher,
   updateSeenAdmin,
} from '../controllers/admin';
import { adminMiddleware } from '../middlewares/admin';
import { createAnnouncment } from '../controllers';
const router = Router();

// Todo add controllers
router.post('/login', adminLogin);
router.post('/create-teacher', createTeacher);
router.post('/create-announcment', adminMiddleware, createAnnouncment);
router.put('/updateseen', adminMiddleware, updateSeenAdmin);
router.delete('/delete/student/:username', adminMiddleware, removeStudent);
router.delete('/delete/teacher/:username', adminMiddleware, removeTeacher);

// temporary route
// router.post("/createadmin", createAdmin);

export { router };
