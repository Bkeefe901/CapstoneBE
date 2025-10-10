// Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { log, globalErr } from './middleware/middleware.mjs';
import connectDB from './db/conn.mjs';


// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(log);
app.use(cors);

// DB Connection
connectDB();

// Routes

// Global err handling
app.use(globalErr);

// Listening
app.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT}`);
})