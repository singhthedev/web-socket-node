import express from "express";
import session from "express-session";
import { Server as SocketServer } from "socket.io";
import path from 'path';
const app = express();
import('./config/db.js')


app.set("view engine", "ejs");
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "ChatV2", resave: false, saveUninitialized: true }));


import Routers from "./routers/routes.js";


app.use('/', Routers)


const port = 5000;
const io = new SocketServer(app.listen(port, () => {
  console.log(`Server is running on ${port} ...🚀`);
  const error = false;
  if (error) {
    console.log("Error in running server...🫣", error);
  }
}));

io.on("connection", (socket) => {
  console.log(socket.id + " a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("privateChat", (data) => {
    // Send the private message only to the recipient
    io.to(data.recipient).emit("privateChat", data);
  });
});


app.use(function (req, res) {
  res.status(404).end("404 NOT FOUND");
});

