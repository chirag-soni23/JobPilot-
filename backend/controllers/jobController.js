import { Job } from "../models/jobModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import cloudinary from "cloudinary";
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
    const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
    logoUrl = { id: cloud.public_id, url: cloud.secure_url };
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

  // If new logo is uploaded
  if (req.file) {
    if (job.logoUrl?.id) {
      await cloudinary.v2.uploader.destroy(job.logoUrl.id);
    }
    const fileUri = getDataUri(req.file);
    const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
    updates.logoUrl = { id: cloud.public_id, url: cloud.secure_url };
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
    await cloudinary.v2.uploader.destroy(job.logoUrl.id);
  }

  await job.deleteOne();
  res.json({ message: "Job deleted successfully" });
});
