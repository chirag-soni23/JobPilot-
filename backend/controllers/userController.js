import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { TryCatch } from "../utils/TryCatch.js";
import { generateToken } from "../utils/generateToken.js";
import getDataUri from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

// Register
export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password,role } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Already have an account" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    role,
    password: hashPassword,
  });

  // JSON Web Token
  generateToken(user._id, res);
  res.status(200).json({ user, message: "User registered successfully!" });
});

// Login
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email or Password is incorrect" });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(400).json({ message: "Email or Password is incorrect" });
  }
  // JSON Web Token
  generateToken(user._id, res);
  res.json({
    user,
    message: "User Logged in successfully!",
  });
});

// my profile
export const Myprofile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
});

// user profile
export const userProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

// logout
export const logout = TryCatch(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({
    message: "Logged out succesfully!",
  });
});

// profile upload
export const profileUpload = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.profile && user.profile.id) {
    await cloudinary.v2.uploader.destroy(user.profile.id);
  }

  const file = req.file;
  const fileUrl = getDataUri(file);
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  user.profile = {
    id: cloud.public_id,
    url: cloud.secure_url,
  };

  await user.save();

  res.json({
    message: "Profile photo uploaded successfully!",
    profile: user.profile,
  });
});


// delete profile picture
export const deleteProfileImage = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user || !user.profile || !user.profile.id) {
    return res.status(400).json({ message: "No profile image found" });
  }

  await cloudinary.v2.uploader.destroy(user.profile.id);

  user.profile = { id: "", url: "" };
  await user.save();

  res.json({ message: "Profile image removed successfully!" });
});