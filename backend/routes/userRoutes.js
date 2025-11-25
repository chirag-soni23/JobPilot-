import express from "express";
import {
  deleteProfileImage,
  getAbout,
  getAllUsers,
  loginUser,
  logout,
  Myprofile,
  profileUpload,
  registerUser,
  updateAbout,
  userProfile,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logout);
router.get("/me", isAuth, Myprofile);
router.get("/getall", isAuth, getAllUsers);
router.get("/:id", isAuth, userProfile);
router.post("/uploadprofile", isAuth, uploadFile, profileUpload);
router.delete("/deleteprofile", isAuth, deleteProfileImage);
router.get("/me/about", isAuth, getAbout);
router.put("/me/about", isAuth, updateAbout);
export default router;
