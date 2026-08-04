const express = require("express");
const lectureController = require("../controller/lectureController");
let router = express.Router();
router.post("/create",lectureController.createLecture);
router.get("/getAllLectures",lectureController.getAllLectures);
router.get("/instructor/:instructorId", lectureController.getLecturesByInstructor);
module.exports = router;