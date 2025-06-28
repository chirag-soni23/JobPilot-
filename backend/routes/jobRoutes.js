import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  toggleSavedJob,
} from "../controllers/jobController.js";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.post("/createjob", isAuth, uploadFile, createJob);
router.get("/getall", getAllJobs);
router.get("/get/:id", getJobById);
router.put("/update/:id", isAuth,uploadFile, updateJob);
router.delete("/deletejob/:id", isAuth, deleteJob);
router.put("/savedJob/:id", isAuth, toggleSavedJob);

export default router;
