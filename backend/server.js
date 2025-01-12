import express from "express";
import { connectDB } from './config/db.js'; // Assuming connectDB is exported from db.js
import users from './Routes/api/users.js';
import chat from './Routes/api/chat.js';
import posts from "./Routes/api/posts.js";
import message from "./Routes/api/message.js";
import dotenv from "dotenv";
import cors from 'cors';
import passport from "passport";
import http from 'http';
import { Server } from 'socket.io';
// import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

// Connect to the database
connectDB()
.then(()=>{
  console.log("Connected to DB")
})
.catch((err) => {
  console.log(`Error ${err}`)
});

// Middleware
app.use(express.urlencoded({ extended: true })); // Replaced body-parser with built-in middleware
app.use(express.json()); // Replaced body-parser with built-in middleware
app.use(cors({ origin: true }));
app.use(passport.initialize());

// Passport config
import './config/password.js'; // Assuming this is a module that configures passport

// Routes
app.use("/api/users", users);
app.use("/api/post/", posts);
app.use("/api/chat/", chat);
app.use("/api/message/", message);

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("setup", (userData) => {
    socket.join(userData.id);
    console.log(userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined ROOM: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Handle new message event
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) {
      return console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});