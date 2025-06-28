import express from "express";
import { uploadApplicationFiles } from "../middlewares/multer.js";
import { createApplication, getAllJobApplication, getApplicationById } from "../controllers/jobApplyController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/apply/:jobId",isAuth, uploadApplicationFiles, createApplication);
router.get("/getall",isAuth,getAllJobApplication);
router.get("/get/:id",isAuth,getApplicationById);

export default router;
