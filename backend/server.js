import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import jobApplyRoutes from "./routes/jobApplyRoutes.js";
import nodemailerRoutes from "./routes/nodemailer.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

const app = express();
const PORT = 5000 || process.env.PORT;
dotenv.config();

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://job-pilot-ten.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression())

// routes
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/apply", jobApplyRoutes);
app.use("/api/mail", nodemailerRoutes);

// server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDb();
});
