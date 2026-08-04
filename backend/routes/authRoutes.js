const express = require("express");
const authController = require("../controller/authController");
let router = express.Router();
router.post("/create",authController.createAccount);
router.post("/login",authController.loginAccount);
router.get("/instructors", authController.getInstructors);
module.exports = router;