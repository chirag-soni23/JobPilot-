import express from "express";
import {
  deleteProfileImage,
  editUser,
  getAbout,
  getAllUsers,
  googleAuth,
  loginUser,
  logout,
  Myprofile,
  profileUpload,
  registerUser,
  updateAbout,
  updatePassword,
  userProfile,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.get("/logout", isAuth, logout);
router.get("/me", isAuth, Myprofile);
router.get("/getall", isAuth, getAllUsers);
router.get("/:id", isAuth, userProfile);
router.post("/uploadprofile", isAuth, uploadFile, profileUpload);
router.delete("/deleteprofile", isAuth, deleteProfileImage);
router.get("/me/about", isAuth, getAbout);
router.put("/me/about", isAuth, updateAbout);
router.patch("/me/edit-name",isAuth,editUser);
router.patch("/me/update-password",isAuth,updatePassword);
export default router;
