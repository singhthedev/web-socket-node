const bcrypt = require("bcrypt");
const users = require("../models/users.js");

const renderLoginPage = (req, res) => {
  if (!req.session.name) {
    res.render("index", { title: "Sign Up" });
  } else {
    res.redirect("/chat");
  }
};

const loginUser = async (req, res) => {
  try {
    const data = await users.find({ email: req.body.email });

    if (data.length != 0) {
      let postedpassword = req.body.password;
      let userpassword = data[0].password;

      bcrypt.compare(postedpassword, userpassword, (err, con) => {
        if (con) {
          req.session.name = data[0].username;
          res.redirect("/chat");
        } else {
          res.send("Something went wrong!");
        }
      });
    } else {
      res.send("There is no such user");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  renderLoginPage,
  loginUser,
};
