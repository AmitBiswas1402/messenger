import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import { connectDB } from './db/db.js';
import authRoutes from './routes/auth.routes.js'; 
import messageRoutes from './routes/message.routes.js'; 

dotenv.config();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = 5000;

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);   
    connectDB(); 
})