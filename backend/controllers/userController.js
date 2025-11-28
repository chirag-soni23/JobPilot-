import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { TryCatch } from "../utils/TryCatch.js";
import { generateToken } from "../utils/generateToken.js";
import getDataUri from "../utils/urlGenerator.js";
import imagekit from "../utils/imagekit.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (await User.findOne({ email }))
    return res.status(400).json({ message: "Already have an account" });

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    role,
    password: hashPassword,
    authProvider: "local",
  });

  generateToken(user._id, res);
  res.status(201).json({ message: "User registered successfully!", user });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.password)
    return res.status(400).json({ message: "Email or Password is incorrect" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(400).json({ message: "Email or Password is incorrect" });

  generateToken(user._id, res);
  res.json({ message: "User logged in successfully!", user });
});

export const googleAuth = TryCatch(async (req, res) => {
  const { idToken } = req.body;
  if (!process.env.GOOGLE_CLIENT_ID)
    return res.status(500).json({ message: "GOOGLE_CLIENT_ID missing" });
  if (!idToken) return res.status(400).json({ message: "Missing idToken" });

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (e) {
    return res
      .status(401)
      .json({ message: `Invalid Google token: ${e.message}` });
  }

  const { sub: googleId, email, name, picture, aud } = payload || {};
  if (!email) return res.status(400).json({ message: "Google email required" });
  if (aud !== process.env.GOOGLE_CLIENT_ID)
    return res.status(401).json({ message: "Audience mismatch" });

  let user = await User.findOne({ email });

  if (user) {
    user.googleId = googleId;
    user.authProvider = "google";

    if (!user.name || (name && user.name !== name)) {
      user.name = name || user.name || "Google User";
    }

    if (picture && (!user.profile?.url || user.authProvider === "google")) {
      user.profile = { id: user.profile?.id || "", url: picture };
    }

    await user.save();
  } else {
    user = await User.create({
      name: name || "Google User",
      email,
      password: "",
      role: "candidate",
      authProvider: "google",
      googleId,
      profile: picture ? { id: "", url: picture } : undefined,
    });
  }

  generateToken(user._id, res);
  res.status(200).json({ message: "Google login successful", user });
});

export const Myprofile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
});

export const userProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

export const logout = TryCatch(async (req, res) => {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logged out successfully!" });
});

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

export const deleteProfileImage = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user?.profile?.id)
    return res.status(400).json({ message: "No profile image found" });

  await imagekit.deleteFile(user.profile.id);
  user.profile = { id: "", url: "" };
  await user.save();

  res.json({ message: "Profile image removed successfully!" });
});

export const getAllUsers = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden: admin only" });

  const users = await User.find()
    .select("-password")
    .populate(
      "appliedJobs",
      "fullName email mobileNumber summary resume profilePic linkedinUrl portfolioUrl"
    )
    .sort({ createdAt: -1 });

  res.json(users);
});

export const getAbout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("about");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    message: "About fetched successfully",
    about: user.about || "",
  });
});

export const updateAbout = TryCatch(async (req, res) => {
  const { about } = req.body;
  if (typeof about !== "string" || about.trim() === "")
    return res.status(400).json({ message: "About field is required" });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.about = about.trim();
  await user.save();

  res.json({
    message: "About updated successfully",
    about: user.about,
  });
});

export const editUser = TryCatch(async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).json({ message: "User not found" });

  user.name = name.trim();
  await user.save();

  res.status(200).json({ message: "Name updated successfully!" });
});

export const updatePassword = TryCatch(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "New password and confirm password are required" });
  }
  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const user = await User.findById(req.user._id).select(
    "+password authProvider"
  );
  if (!user) return res.status(404).json({ message: "User not found" });

  const hasLocalPassword = Boolean(user.password); // local users must provide oldPassword

  if (hasLocalPassword) {
    if (!oldPassword || oldPassword.trim() === "") {
      return res.status(400).json({ message: "Old password is required" });
    }
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok)
      return res.status(400).json({ message: "Old password is incorrect" });
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New password must be different from old password" });
    }
  }
  // Google-only (no local pwd yet) users don't need oldPassword

  user.password = await bcrypt.hash(newPassword, 10);
  // Optional: once password set, treat as local for next time
  if (user.authProvider === "google") user.authProvider = "local";
  await user.save();

  return res.json({ message: "Password updated successfully!" });
});
