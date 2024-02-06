"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var student_1 = require("../controllers/student");
var router = (0, express_1.Router)();
exports.router = router;
var student_2 = require("../middlewares/student");
// Todo add controllers
router.post('/signup', student_1.studentRegister);
router.post('/login', student_1.studentLogin);
router.get('/mytests', student_2.studentMiddleware, student_1.getMyTests);
router.post('/test/:testId', student_2.studentMiddleware, student_1.testSubmission);
