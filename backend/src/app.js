import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './db/db.js';
import authRoutes from './routes/auth.routes.js'; 

dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);   
    connectDB(); 
})