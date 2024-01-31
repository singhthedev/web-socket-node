import User from "../models/users.js";
import bcrypt from 'bcrypt';

const renderRegisterPage = (req, res) => {
  if (!req.session.name) {
    res.render("register", { title: "register" });
  } else {
    res.redirect("/chat");
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.send("Username already exists");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
};

const renderLoginPage = (req, res) => {
  if (!req.session.name) {
    res.render("index", { title: "login" });
  } else {
    res.redirect("/chat");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.send("Invalid email or password");
    }

    req.session.name = user.username;
    res.redirect("/chat");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};

export {
  renderRegisterPage,
  registerUser,
  renderLoginPage,
  loginUser
};
