import multer from "multer";

const storage = multer.memoryStorage();
const limits = { fileSize: 5 * 1024 * 1024 };

const uploadfile = multer({ storage, limits }).single("file");

export const uploadApplicationFiles = multer({ storage, limits }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
]);

export default uploadfile;
