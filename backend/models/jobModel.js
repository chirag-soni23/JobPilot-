import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["FULL-TIME", "PART-TIME", "INTERNSHIP"],
      required: true,
    },
    company: { type: String, required: true },
    location: { type: String, required: true },
    minSalary: { type: Number, required: true },
    maxSalary: { type: Number, required: true },
    logoUrl: { id: String, url: String },
    isFeatured: { type: Boolean, default: false },

    description: { type: String, required: true },
    requirements: [{ type: String }],
    desirable: [{ type: String }],
    benefits: [{ type: String }],

    education: { type: String },
    jobLevel: { type: String },
    experience: { type: String },

    postedDate: { type: Date, default: Date.now },
    expireDate: { type: Date },

    shareLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      mail: { type: String },
    },
    isSaved: { type: Boolean, default: false },
  },
  { timestamps: true }
);


export const Job = mongoose.model("Job", JobSchema);
