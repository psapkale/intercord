import { Router } from "express";
import {
  bookMarkTest,
  getMyTests,
  studentLogin,
  studentRegister,
  testSubmission,
} from "../controllers/student";
const router = Router();
import { studentMiddleware } from "../middlewares/student";

// Todo add controllers
router.post("/signup", studentRegister);
router.post("/login", studentLogin);
router.get("/mytests", studentMiddleware, getMyTests);
router.post("/test/:testId", studentMiddleware, testSubmission);
router.post("/bookmark", studentMiddleware, bookMarkTest);

export { router };
