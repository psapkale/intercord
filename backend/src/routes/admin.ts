import { Router } from "express";
import {
  adminLogin,
  createTeacher,
  removeStudent,
  removeTeacher,
} from "../controllers/admin";
import { adminMiddleware } from "../middlewares/admin";
const router = Router();

// Todo add controllers
router.post("/login", adminLogin);
router.post("/create-teacher", adminMiddleware, createTeacher);
router.post("/remove-teacher/:username", adminMiddleware, removeTeacher);
router.post("/remove-student/:username", adminMiddleware, removeStudent);

export { router };
