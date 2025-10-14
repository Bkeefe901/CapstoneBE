// Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { log, globalErr } from './middleware/middleware.mjs';
import connectDB from './db/conn.mjs';
import userRoutes from './routes/userRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';


// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// DB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(log);
app.use(cors());


// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Global err handling
app.use(globalErr);

// Listening
app.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT}`);
})