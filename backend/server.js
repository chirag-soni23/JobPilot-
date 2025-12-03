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

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://job-pilot-gules.vercel.app",
];

app.use((req, res, next) => {
  res.header("Vary", "Origin");
  next();
});

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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

app.get("/api/health", (req, res) => {
  res.json({ ok: true, host: req.headers.host, url: req.originalUrl });
});

app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

app.get("/", (req, res) => {
  res.json("Backend is Live!");
});

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/apply", jobApplyRoutes);
app.use("/api/mail", nodemailerRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDb();
});
