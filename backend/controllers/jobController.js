import { Job } from "../models/jobModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import imagekit from "../utils/imagekit.js";
import getDataUri from "../utils/urlGenerator.js";

// Create a Job
export const createJob = TryCatch(async (req, res) => {
  const {
    title,
    type,
    company,
    location,
    minSalary,
    maxSalary,
    description,
    requirements,
    desirable,
    benefits,
    education,
    jobLevel,
    experience,
    expireDate,
    shareLinks,
    isFeatured,
  } = req.body;

  let logoUrl = { id: "", url: "" };
  if (req.file) {
    const fileUri = getDataUri(req.file);
    const uploadResponse = await imagekit.upload({
      file: fileUri.content,
      fileName: req.file.originalname,
    });
    logoUrl = { id: uploadResponse.fileId, url: uploadResponse.url };
  }

  const job = await Job.create({
    title,
    type,
    company,
    location,
    minSalary,
    maxSalary,
    logoUrl,
    description,
    requirements,
    desirable,
    benefits,
    education,
    jobLevel,
    experience,
    expireDate,
    shareLinks,
    isFeatured,
  });

  res.status(201).json({ message: "Job created successfully", job });
});

// Get all Jobs
export const getAllJobs = TryCatch(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// Get single Job
export const getJobById = TryCatch(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
});

// Update Job
export const updateJob = TryCatch(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const updates = req.body;

  if (req.file) {
    if (job.logoUrl?.id) {
      await imagekit.deleteFile(job.logoUrl.id);
    }
    const fileUri = getDataUri(req.file);
    const uploadResponse = await imagekit.upload({
      file: fileUri.content,
      fileName: req.file.originalname,
    });
    updates.logoUrl = { id: uploadResponse.fileId, url: uploadResponse.url };
  }

  Object.assign(job, updates);
  await job.save();

  res.json({ message: "Job updated successfully", job });
});

// Delete Job
export const deleteJob = TryCatch(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  if (job.logoUrl?.id) {
    await imagekit.deleteFile(job.logoUrl.id);
  }

  await job.deleteOne();
  res.json({ message: "Job deleted successfully" });
});

// Toggle saved job
export const toggleSavedJob = TryCatch(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  job.isSaved = !job.isSaved;
  await job.save();

  res.json({
    message: job.isSaved ? "Job saved" : "Job unsaved",
    job,
  });
});
