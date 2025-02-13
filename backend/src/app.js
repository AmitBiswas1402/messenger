import express from 'express';
import dotenv from 'dotenv'

import { connectDB } from './db/db.js';
import authRoutes from './routes/auth.routes.js'; 

dotenv.config();
const app = express();

const PORT = 5000;

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);   
    connectDB(); 
})