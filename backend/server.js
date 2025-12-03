import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import jobApplyRoutes from "./routes/jobApplyRoutes.js";
import nodemailerRoutes from "./routes/nodemailer.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

// --- CORS ---
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://job-pilot-gules.vercel.app",
];

const isAllowedOrigin = (origin = "") =>
  !origin ||
  ALLOWED_ORIGINS.includes(origin) ||
  /^https:\/\/job-pilot-gules-[a-z0-9-]+\.vercel\.app$/.test(origin); // optional: preview builds

app.use((req, res, next) => {
  res.header("Vary", "Origin");
  next();
});

const corsOptions = {
  origin(origin, cb) {
    if (isAllowedOrigin(origin)) return cb(null, true);
    // Don't throw error here; let browser block it cleanly
    return cb(null, false);
  },
  credentials: true, // keep true if you use cookies anywhere
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
app.options("*", cors(corsOptions));

// Health
app.get("/api/health", (req, res) => {
  res.json({ ok: true, host: req.headers.host, url: req.originalUrl });
});

// Security headers (relaxed CO* policies so they don't fight CORS)
app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

// Routes
app.get("/", (req, res) => {
  res.json("Backend is Live!");
});

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/apply", jobApplyRoutes);
app.use("/api/mail", nodemailerRoutes);

// Prefer connecting DB first, then listen
(async () => {
  try {
    await connectDb();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed, server not started:", err?.message || err);
    process.exit(1);
  }
})();
