const express = require("express");
const courseController = require("../controller/courseController");
let router = express.Router();
router.post("/create",courseController.createCourse);
router.get("/list", courseController.getAllCourses);
module.exports = router;