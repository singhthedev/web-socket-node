const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

router.get("/", loginController.renderLoginPage);
router.post("/", loginController.loginUser);

module.exports = router;
