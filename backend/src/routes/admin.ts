import { Router } from "express";
import {
  adminLogin,
  createAdmin,
  createTeacher,
  removeStudent,
  removeTeacher,
} from "../controllers/admin";
import { adminMiddleware } from "../middlewares/admin";
import { createAnnouncment } from "../controllers";
const router = Router();

// Todo add controllers
router.post("/login", adminLogin);
router.post("/create-teacher", adminMiddleware, createTeacher);
router.post("/remove-teacher/:username", adminMiddleware, removeTeacher);
router.post("/remove-student/:username", adminMiddleware, removeStudent);
router.post("/create-announcment", adminMiddleware, createAnnouncment);

// temporary route
// router.post("/createadmin", createAdmin);

export { router };
