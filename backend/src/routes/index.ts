import { Router } from "express";
import {
  getUpComingTests,
  getScoreBoard,
  getSubjectFilteredScoreBoard,
  serachStudent,
  getClosedTests,
  getLiveTests,
} from "../controllers";

export const router = Router();

router.get("/search/:username", serachStudent);
router.get("/score-board/all", getScoreBoard);
router.get("/score-board/:subject", getSubjectFilteredScoreBoard);
router.get("/upcoming", getUpComingTests);
router.get("/closed", getClosedTests);
router.get("/live", getLiveTests);
