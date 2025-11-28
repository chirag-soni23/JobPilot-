// server.js
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
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// basic middlewares
app.use(cors()); // simple & open — no custom CORS logic
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());

// health & root
app.get("/api/health", (req, res) => {
  res.json({ ok: true, host: req.headers.host, url: req.originalUrl });
});
app.get("/", (req, res) => {
  res.json("Backend is Live!");
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/apply", jobApplyRoutes);
app.use("/api/mail", nodemailerRoutes);

// start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDb();
});
