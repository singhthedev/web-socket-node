import express from "express";
const router = express.Router();

import {
    renderRegisterPage,
    registerUser,
    renderLoginPage,
    loginUser,
} from "../controller/registerController.js";

router.get("/register", renderRegisterPage);
router.post("/register", registerUser);

router.get("/", renderLoginPage);
router.post("/", loginUser);

router.get("/chat", (req, res) => {
    if (req.session.name) {
        res.render("chat", { name: req.session.name });
    } else {
        res.redirect("/");
    }
});

router.get("/logout", (req, res) => {
    if (req.session.name) {
        req.session.destroy();
    }
    res.redirect("/");
});

export default router;
