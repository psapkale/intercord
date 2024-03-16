"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const admin_2 = require("../middlewares/admin");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
// Todo add controllers
router.post("/login", admin_1.adminLogin);
router.post("/create-teacher", admin_1.createTeacher);
router.post("/create-announcment", admin_2.adminMiddleware, controllers_1.createAnnouncment);
router.put("/updateseen", admin_2.adminMiddleware, admin_1.updateSeenAdmin);
router.delete("/delete/student/:username", admin_2.adminMiddleware, admin_1.removeStudent);
router.delete("/delete/teacher/:username", admin_2.adminMiddleware, admin_1.removeTeacher);
