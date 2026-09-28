import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import  AppError  from "../utils/AppError.js";

function multerRefactor() {
  const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    console.log(file.originalname);
  console.log(file.mimetype);
    const allowedTypes = [
      "video/mp4",
      "video/mpeg",
      "video/webm",
      "application/pdf",
      "application/octet-stream",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Only video and PDF files are allowed", 400), false);
    }
  };

  const upload = multer({storage,fileFilter,});
  return upload;
}

export const uploadFiles = () => multerRefactor().fields([
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]);