const express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/logout", (req, res) => {
  if (req.session.name) {
    delete req.session.name;
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
