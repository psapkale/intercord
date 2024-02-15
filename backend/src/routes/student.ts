import { Router } from "express";
import {
  bookMarkTest,
  getAllBookMarkTest,
  getMyTests,
  getStudentDetails,
  getTestById,
  studentLogin,
  studentRegister,
  testSubmission,
  updateStudentProfile,
} from "../controllers/student";
const router = Router();
import { studentMiddleware } from "../middlewares/student";

// Todo add controllers
router.post("/signup", studentRegister);
router.post("/login", studentLogin);
router.get("/mytests", studentMiddleware, getMyTests);
router.get("/test/:testId", studentMiddleware, getTestById);
router.post("/test/:testId", studentMiddleware, testSubmission);
router.post("/bookmark", studentMiddleware, bookMarkTest);
router.get("/allbookmarktest", studentMiddleware, getAllBookMarkTest);
router.get("/studentdetails/:username", studentMiddleware, getStudentDetails);
router.put("/updateprofile", studentMiddleware, updateStudentProfile);

export { router };
