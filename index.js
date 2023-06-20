const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const app = express();

const LoginRouter = require("./routers/loginRouter");
const RegisterRouter = require("./routers/registerRouter");
const chatRouter = require("./routers/chatRouter");
const Logout = require("./routers/logoutRouter");

require('./config/db')

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "ChatV2", resave: false, saveUninitialized: true }));



const port = 5000;
const io = socket(app.listen(port, () => {
  console.log(`Server is running on ${port} ...👍️`);
}));

io.on("connection", (socket) => {
  console.log(socket.id + " a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
});

app.use(LoginRouter);
app.use(RegisterRouter);
app.use(chatRouter);
app.use(Logout);

app.use(function (req, res) {
  res.status(404).end("404 NOT FOUND");
});
