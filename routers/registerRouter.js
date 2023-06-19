const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");

router.get("/register", registerController.renderRegisterPage);
router.post("/register", registerController.registerUser);

module.exports = router;
