"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const teacher_1 = require("../controllers/teacher");
const teacher_2 = require("../middlewares/teacher");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
// Todo add controllers
router.post('/login', teacher_1.teacherLogin);
router.post('/create-test', teacher_2.teacherMiddleware, teacher_1.createTest);
router.post('/create-announcment', teacher_2.teacherMiddleware, controllers_1.createAnnouncment);
router.get('/allow/:username', teacher_2.teacherMiddleware, teacher_1.allowStudentRegister);
router.get('/reject/:username', teacher_2.teacherMiddleware, teacher_1.rejectStudentRegister);
router.get('/allrequest', teacher_2.teacherMiddleware, teacher_1.getAllPendingStudents);
router.put('/updateseen', teacher_2.teacherMiddleware, teacher_1.updateSeenTeacher);
router.get('/search/student/all', teacher_2.teacherMiddleware, teacher_1.allStudents);
router.get('/search/teacher/all', teacher_2.teacherMiddleware, teacher_1.allTeachers);
router.get('/search/student/:username', teacher_2.teacherMiddleware, teacher_1.serachStudent);
router.get('/search/teacher/:username', teacher_2.teacherMiddleware, teacher_1.serachTeacher);
router.post('/score-board/all', teacher_2.teacherMiddleware, teacher_1.getScoreBoard);
router.post('/score-board/subject/:subject', teacher_2.teacherMiddleware, teacher_1.getSubjectFilteredScoreBoard);
router.post('/score-board/test/:subject', teacher_2.teacherMiddleware, teacher_1.getSubjectFilteredTests);
router.get('/upcoming', teacher_2.teacherMiddleware, teacher_1.getUpComingTests);
router.get('/closed', teacher_2.teacherMiddleware, teacher_1.getClosedTests);
router.get('/live', teacher_2.teacherMiddleware, teacher_1.getLiveTests);
