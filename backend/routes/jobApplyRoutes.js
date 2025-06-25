import express from "express";
import { uploadApplicationFiles } from "../middlewares/multer.js";
import { createApplication } from "../controllers/jobApplyController.js";

const router = express.Router();

router.post("/apply/:jobId", uploadApplicationFiles, createApplication);

export default router;
