import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { TryCatch } from "../utils/TryCatch.js";
import { generateToken } from "../utils/generateToken.js";
import getDataUri from "../utils/urlGenerator.js";
import imagekit from "../utils/imagekit.js";

// Register
export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, role } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Already have an account" });

  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, role, password: hashPassword });

  generateToken(user._id, res);
  res.status(200).json({ user, message: "User registered successfully!" });
});

// Login
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Email or Password is incorrect" });

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    return res.status(400).json({ message: "Email or Password is incorrect" });

  generateToken(user._id, res);
  res.json({ user, message: "User Logged in successfully!" });
});

// My profile
export const Myprofile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
});

// User profile
export const userProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

// Logout
export const logout = TryCatch(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({ message: "Logged out succesfully!" });
});

// Profile upload
export const profileUpload = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.profile?.id) await imagekit.deleteFile(user.profile.id);

  const fileUri = getDataUri(req.file);
  const upload = await imagekit.upload({
    file: fileUri.content,
    fileName: req.file.originalname,
  });

  user.profile = { id: upload.fileId, url: upload.url };
  await user.save();

  res.json({
    message: "Profile photo uploaded successfully!",
    profile: user.profile,
  });
});

// Delete profile picture
export const deleteProfileImage = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user?.profile?.id)
    return res.status(400).json({ message: "No profile image found" });

  await imagekit.deleteFile(user.profile.id);
  user.profile = { id: "", url: "" };
  await user.save();

  res.json({ message: "Profile image removed successfully!" });
});

// get all user
export const getAllUsers = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: admin only" });
  }

  const users = await User.find()
    .select("-password")
    .populate(
      "appliedJobs",
      "fullName email mobileNumber summary resume profilePic linkedinUrl portfolioUrl"
    )
    .sort({ createdAt: -1 });

  res.json(users);
});


