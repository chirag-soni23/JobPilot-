import mongoose from "mongoose";
import { Application } from "../models/JobApplyModel.js";
import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import imagekit from "../utils/imagekit.js";
import getDataUri from "../utils/urlGenerator.js";
import { sendJobApplicationEmail } from "../utils/Jobmailer.js";

export const createApplication = TryCatch(async (req, res) => {
  const { jobId } = req.params;
  if (!jobId) return res.status(404).json({ message: "Job Id not found." });
  if (!mongoose.Types.ObjectId.isValid(jobId))
    return res.status(400).json({ message: "Invalid Job ID!" });

  const applicantId = req.user?._id;
  if (!applicantId)
    return res.status(401).json({ message: "Unauthorized: no applicant." });

  const duplicate = await Application.findOne({
    applicant: applicantId,
    job: jobId,
  });
  if (duplicate)
    return res
      .status(409)
      .json({ message: "You have already applied to this job." });

  const {
    fullName,
    email,
    mobileNumber,
    education,
    experience,
    linkedinUrl,
    portfolioUrl,
    summary,
  } = req.body;

  let resume = { id: "", url: "" };
  let profilePic = { id: "", url: "" };

  if (req.files?.resume?.[0]) {
    const file = req.files.resume[0];
    if (file.mimetype !== "application/pdf")
      return res.status(400).json({ message: "Resume must be a PDF file" });
    const { fileId, url } = await imagekit.upload({
      file: getDataUri(file).content,
      fileName: `resume_${Date.now()}.pdf`,
    });
    resume = { id: fileId, url };
  }

  if (req.files?.profilePic?.[0]) {
    const file = req.files.profilePic[0];
    const { fileId, url } = await imagekit.upload({
      file: getDataUri(file).content,
      fileName: `profile_${Date.now()}`,
    });
    profilePic = { id: fileId, url };
  }

  const application = await Application.create({
    applicant: applicantId,
    job: jobId,
    fullName: fullName?.trim(),
    email: email?.trim(),
    mobileNumber: mobileNumber?.trim(),
    summary: summary?.trim(),
    resume,
    profilePic,
    education: education?.trim(),
    experience: experience?.trim(),
    linkedinUrl: linkedinUrl?.trim(),
    portfolioUrl: portfolioUrl?.trim(),
  });

  await Promise.all([
    Job.findByIdAndUpdate(jobId, {
      $addToSet: { applications: application._id },
    }),
    User.findByIdAndUpdate(applicantId, {
      $addToSet: { appliedJobs: application._id },
    }),
  ]);

  const jobDoc = await Job.findById(jobId).select("title shareLinks");
  const employerEmail = jobDoc?.shareLinks?.mail;
  if (employerEmail) {
    await sendJobApplicationEmail(employerEmail, {
      jobTitle: jobDoc.title,
      name: fullName,
      email,
      phone: mobileNumber,
      resumeUrl: resume.url,
      linkedinUrl,
      portfolioUrl,
    });
  }

  res.status(201).json({ message: "Application submitted", application });
});

export const getAllJobApplication = TryCatch(async (req, res) => {
  const filter = req.user.role === "admin" ? {} : { applicant: req.user._id };

  const applications = await Application.find(filter)
    .populate("applicant", "name email role")
    .populate("job", "title company location type minSalary maxSalary logoUrl")
    .sort({ createdAt: -1 });

  res.json(applications);
});
export const getApplicationById = TryCatch(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate("applicant", "name email role")
    .populate("job", "title company location");
  if (!application)
    return res.status(404).json({ message: "Application not found" });

  if (
    req.user.role !== "admin" &&
    application.applicant._id.toString() !== req.user._id.toString()
  )
    return res.status(403).json({ message: "Forbidden" });

  res.json(application);
});
