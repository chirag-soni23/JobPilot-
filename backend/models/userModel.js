import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: { type: String, default: "" },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    profile: {
      id: String,
      url: String,
    },
    about: {
      type: String,
    },
    role: {
      type: String,
      enum: ["candidate", "employer", "admin"],
      default: "candidate",
    },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],

    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
