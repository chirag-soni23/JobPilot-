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

// Parsers
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

// CORS (keep BEFORE routes & helmet)
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://job-pilot-gules.vercel.app",
];

app.use((req, res, next) => {
  res.header("Vary", "Origin");
  next();
});

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: false, // no cookies needed for contact form
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Cache-Control",
    "Pragma",
  ],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions), (_req, res) => res.sendStatus(204));

// Security (after CORS)
app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// Compression
app.use(compression());

// Health
app.get("/api/health", (req, res) => {
  res.json({ ok: true, host: req.headers.host, url: req.originalUrl });
});

// Root
app.get("/", (_req, res) => {
  res.json("Backend is Live!");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/apply", jobApplyRoutes);
app.use("/api/mail", nodemailerRoutes);

// Error handler (ensures CORS headers on errors too)
app.use((err, req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (res.headersSent) return next(err);
  console.error("ERROR:", err?.message || err);
  res.status(500).json({ ok: false, message: err?.message || "Server error" });
});

// Start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDb();
});
