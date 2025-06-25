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

router.post("/createjob",isAuth,uploadFile,createJob);
router.get("/getall",isAuth,getAllJobs);
router.get("/get/:id",isAuth,getJobById);
router.put("/updatejob/:id",isAuth,updateJob);
router.delete("/deletejob",isAuth,deleteJob);
router.put("/savedJob/:id",isAuth,toggleSavedJob);

export default router;
