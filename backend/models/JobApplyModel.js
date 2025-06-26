import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    fullName: String,
    email: String,
    mobileNumber: String,
    summary: String,
    resume: { id: String, url: String },
    profilePic: { id: String, url: String },
    education: String,
    experience: String,
    linkedinUrl: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => /^https:\/\/(www\.)?linkedin\.com\/.*$/.test(v),
        message: "Please enter a valid LinkedIn profile URL",
      },
    },
    portfolioUrl: String,
    isApplied: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
