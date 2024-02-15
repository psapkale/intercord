import { Router } from "express";
import {
  createTest,
  teacherLogin,
  updateSeenTeacher,
} from "../controllers/teacher";
import { teacherMiddleware } from "../middlewares/teacher";
import { createAnnouncment } from "../controllers";
const router = Router();

// Todo add controllers
router.post("/login", teacherLogin);
router.post("/create-test", teacherMiddleware, createTest);
router.post("/create-announcment", teacherMiddleware, createAnnouncment);
router.put("/updateseen", teacherMiddleware, updateSeenTeacher);

export { router };
