import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

console.log("Loaded JWT Secret:", process.env.JWT_TOKEN_SECRET);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
