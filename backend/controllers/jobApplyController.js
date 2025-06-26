import mongoose from "mongoose";
import { Application } from "../models/JobApplyModel.js";
import { TryCatch } from "../utils/TryCatch.js";
import imagekit from "../utils/imagekit.js";
import getDataUri from "../utils/urlGenerator.js";

// create application
export const createApplication = TryCatch(async (req, res) => {
  const { jobId } = req.params;
  if (!jobId) return res.status(404).json({ message: "Job Id not found." });

  if (!mongoose.Types.ObjectId.isValid(jobId))
    return res.status(400).json({ message: "Invalid Job ID!" });

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
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Resume must be a PDF file" });
    }

    const fileUri = getDataUri(file);
    const uploaded = await imagekit.upload({
      file: fileUri.content,
      fileName: `resume_${Date.now()}.pdf`,
    });

    resume = { id: uploaded.fileId, url: uploaded.url };
  }

  if (req.files?.profilePic?.[0]) {
    const file = req.files.profilePic[0];
    const fileUri = getDataUri(file);
    const uploaded = await imagekit.upload({
      file: fileUri.content,
      fileName: `profile_${Date.now()}`,
    });

    profilePic = { id: uploaded.fileId, url: uploaded.url };
  }

  const application = await Application.create({
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
    isApplied: true,                
  });

  res.status(201).json({ message: "Application submitted", application });
});
