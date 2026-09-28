import lectureModel from "../../../Database/models/lectureModel.js";
import AppError from "../../utils/AppError.js";
import CatchError from "../../utils/CatchAsyncError.js";
import { uploadFile } from "../../cloudNairy/cloudNairy.js";

const addLecture = CatchError(async (req, res, next) => {
   const { video, pdf } = req.files;
  //  const { videoUrl, pdfUrl } = req.body;
 
  let videoUrl;
  let pdfUrl;

   if (video) {
     videoUrl = await uploadFile(video[0].path);
   }
   if (pdf) {
     pdfUrl = await uploadFile(pdf[0].path);
   }
  const lecture = await lectureModel.create({...req.body, videoUrl, pdfUrl});

  res.status(201).json({ message: "success",lecture});
});

const getAllLectures = CatchError(async (req, res, next) => {
  let lectures;

  if (req.user.role === "admin") {
    lectures = await lectureModel.find().sort({ date: -1 });
  } else {
    lectures = await lectureModel.find({ isPublished: true }).sort({ date: -1 });}

  res.status(200).json({message: "success",lectures,});
});

const getLecture = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const lecture = await lectureModel.findById(id);

  if (!lecture) return next(new AppError("Lecture not found", 404));
  

  res.status(200).json({ message: "success",lecture});
});

const updateLecture = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const lecture = await lectureModel.findById(id);

  if (!lecture) return next(new AppError("Lecture not found", 404));
 

  const updatedLecture = await lectureModel.findByIdAndUpdate(
    id,
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  res.status(200).json({
    message: "success",
    lecture: updatedLecture,
  });
});

const publishLecture = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const lecture = await lectureModel.findByIdAndUpdate(
    id,
    {
      isPublished: true,
    },
    {
      returnDocument: "after",
    }
  );

  if (!lecture) return next(new AppError("Lecture not found", 404));
  
  res.status(200).json({
    message: "Lecture published successfully",
    lecture,
  });
});

const unpublishLecture = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const lecture = await lectureModel.findByIdAndUpdate(
    id,
    {
      isPublished: false,
    },
    {
      returnDocument: "after",
    }
  );

  if (!lecture) {
    return next(new AppError("Lecture not found", 404));
  }

  res.status(200).json({
    message: "Lecture unpublished successfully",
    lecture,
  });
});

const deleteLecture = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const lecture = await lectureModel.findByIdAndDelete(id,{new:true});

  if (!lecture) return next(new AppError("already deleted", 404));


  res.status(200).json({
    message: "success",
    lecture,
  });
});

export {addLecture,getAllLectures,getLecture,updateLecture,publishLecture,unpublishLecture,deleteLecture};