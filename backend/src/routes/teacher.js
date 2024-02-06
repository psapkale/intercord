"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var teacher_1 = require("../controllers/teacher");
var teacher_2 = require("../middlewares/teacher");
var router = (0, express_1.Router)();
exports.router = router;
// Todo add controllers
router.post('/login', teacher_1.teacherLogin);
router.post('/create-test', teacher_2.teacherMiddleware, teacher_1.createTest);
