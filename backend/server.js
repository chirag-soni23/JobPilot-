import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import jobApplyRoutes from "./routes/jobApplyRoutes.js";
import nodemailerRoutes from "./routes/nodemailer.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

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

// routes
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/apply", jobApplyRoutes);
app.use("/api/mail", nodemailerRoutes);

const url = `https://jobpilot-gqgi.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

// server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDb();
});
