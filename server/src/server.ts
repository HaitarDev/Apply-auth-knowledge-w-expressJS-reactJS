import authRoute from "./authRoute";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { config } from "dotenv";
config({ path: `${process.cwd()}/.env` });
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

app.use(cors());
app.use(bodyParser.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.listen(3002);

// routes
app.use("/api/v1/auth", authRoute);

// socket
io.on("connection", (socket) => {
  console.log("user sw connected");

  socket.on("message", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

// server launch
const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL!);
mongoose.connection.on("connected", () => console.log("mongodb connected"));

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
