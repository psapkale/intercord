import { Router } from "express";
import {
  adminLogin,
  createAdmin,
  createTeacher,
  removeStudent,
  removeTeacher,
  updateSeenAdmin,
} from "../controllers/admin";
import { adminMiddleware } from "../middlewares/admin";
import { createAnnouncment } from "../controllers";
const router = Router();

// Todo add controllers
router.post("/login", adminLogin);
router.post("/create-teacher", createTeacher);
router.post("/remove-teacher/:username", adminMiddleware, removeTeacher);
router.post("/remove-student/:username", adminMiddleware, removeStudent);
router.post("/create-announcment", adminMiddleware, createAnnouncment);
router.put("/updateseen", adminMiddleware, updateSeenAdmin);

// temporary route
// router.post("/createadmin", createAdmin);

export { router };
