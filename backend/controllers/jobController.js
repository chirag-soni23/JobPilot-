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

// Get all Jobs with populated applications
export const getAllJobs = TryCatch(async (req, res) => {
  const jobs = await Job.find()
    .populate({
      path: "applications",
      populate: { path: "applicant", select: "name email" },
    })
    .sort({ createdAt: -1 });
  res.json(jobs);
});

// Get single Job with populated applications
export const getJobById = TryCatch(async (req, res) => {
  const job = await Job.findById(req.params.id).populate({
    path: "applications",
    populate: { path: "applicant", select: "name email" },
  });
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
});

// Update Job
export const updateJob = TryCatch(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  if (req.file) {
    if (job.logoUrl?.id) await imagekit.deleteFile(job.logoUrl.id);
    const fileUri = getDataUri(req.file);
    const { fileId, url } = await imagekit.upload({
      file: fileUri.content,
      fileName: req.file.originalname,
    });
    job.logoUrl = { id: fileId, url };
  }

  const fields = [
    "title",
    "type",
    "company",
    "location",
    "minSalary",
    "maxSalary",
    "description",
    "education",
    "jobLevel",
    "experience",
    "expireDate",
    "isFeatured",
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) job[f] = req.body[f];
  });

  const arrFields = ["requirements", "desirable", "benefits"];
  arrFields.forEach((f) => {
    if (req.body[f] !== undefined) {
      job[f] =
        typeof req.body[f] === "string"
          ? req.body[f].split(",").map((v) => v.trim()).filter(Boolean)
          : req.body[f];
    }
  });

  if (req.body.shareLinks) {
    job.shareLinks = { ...job.shareLinks, ...req.body.shareLinks };
  }

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
