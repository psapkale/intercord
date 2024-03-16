"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
exports.router.get('/search/student/all', controllers_1.allStudents);
exports.router.get('/search/teacher/all', controllers_1.allTeachers);
exports.router.get('/search/student/:username', controllers_1.serachStudent);
exports.router.get('/search/teacher/:username', controllers_1.serachTeacher);
exports.router.post('/score-board/all', controllers_1.getScoreBoard);
exports.router.post('/score-board/subject/:subject', controllers_1.getSubjectFilteredScoreBoard);
exports.router.post('/score-board/test/:subject', controllers_1.getSubjectFilteredTests);
exports.router.get('/upcoming', controllers_1.getUpComingTests);
exports.router.get('/closed', controllers_1.getClosedTests);
exports.router.get('/live', controllers_1.getLiveTests);
