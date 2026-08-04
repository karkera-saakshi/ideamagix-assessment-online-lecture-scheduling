const express = require("express");
const courseController = require("../controller/courseController");
let router = express.Router();
router.post("/create",courseController.createCourse);
module.exports = router;