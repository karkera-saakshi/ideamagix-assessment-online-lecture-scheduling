const express = require("express");
const authController = require("../controllers/authController");
let router = express.Router();
router.post("/create",authController.createAccount);
router.post("/login",authController.loginAccount);
module.exports = router;