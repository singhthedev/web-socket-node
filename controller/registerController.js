const bcrypt = require("bcrypt");
const users = require("../models/users.js");
const session = require("express-session");

const renderRegisterPage = (req, res) => {
  if (!req.session.name) {
    res.render("register", { title: "register" });
  } else {
    res.redirect("/chat");
  }
};

const registerUser = async (req, res) => {
  try {
    const data = await users.find({ username: req.body.username });

    if (data.length == 0) {
      let pass = req.body.password;
      let cryptpass = await bcrypt.hash(pass, 10);
      const user = new users({
        username: req.body.username,
        email: req.body.email,
        password: cryptpass,
      });

      user.save().then((result) => {
        res.redirect("/");
      });
    } else {
      res.send("There is such a user");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  renderRegisterPage,
  registerUser,
};
