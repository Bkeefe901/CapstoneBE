// Imports
import express from 'express';
import dotenv from 'dotenv';
import GlobalErr from './middleware/globalError.mjs';
import log from './middleware/loggingMiddleware.mjs';

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(log);

// Routes

// Global err handling
app.use(GlobalErr);

// Listening
app.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT}`);
})