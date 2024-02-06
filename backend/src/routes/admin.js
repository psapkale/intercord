"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var admin_1 = require("../controllers/admin");
var admin_2 = require("../middlewares/admin");
var router = (0, express_1.Router)();
exports.router = router;
// Todo add controllers
router.post('/login', admin_1.adminLogin);
router.post('/create-teacher', admin_2.adminMiddleware, admin_1.createTeacher);
router.post('/remove-teacher/:username', admin_2.adminMiddleware, admin_1.removeTeacher);
router.post('/remove-student/:username', admin_2.adminMiddleware, admin_1.removeStudent);
