const express = require("express");
const lectureController = require("../controller/lectureController");
let router = express.Router();
router.post("/create",lectureController.createLecture);
router.get("/getAllLectures",lectureController.getAllLectures);
module.exports = router;