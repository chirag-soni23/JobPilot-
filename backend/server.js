import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import jobApplyRoutes from "./routes/jobApplyRoutes.js";
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();
const PORT = 5000 || process.env.PORT;
dotenv.config();


// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/api/user', userRoutes);
app.use('/api/job',jobRoutes);
app.use('/api/apply',jobApplyRoutes);


// server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
})