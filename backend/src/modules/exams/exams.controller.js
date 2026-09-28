import examModel from "../../../Database/models/examModel.js";
import AppError from "../../utils/AppError.js";
import CatchError from "../../utils/CatchAsyncError.js";

const addExam = CatchError(async (req, res, next) => {
  
  const exam = new examModel(req.body);
  await exam.save();

  res.status(201).json({message: "success",exam});
});

const getAllExams = CatchError(async (req, res, next) => {
  let exams;

  if(req.user.role ==="admin"){
    exams=await examModel.find().sort({date:-1})
  }else{
   exams = await examModel.find({ isPublished: true }).sort({date:-1});
  }
  res.status(200).json({ message: "success",exams,});
});

const getExam = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const exam = await examModel.findById(id);

  if (!exam) {
    return next(new AppError("Exam not found", 404));
  }

  res.status(200).json({ message: "success",exam,});
});

const updateExam = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const exam = await examModel.findById(id);

  if (!exam) {
    return next(new AppError("Exam not found", 404));
  }

  const updatedExam = await examModel.findByIdAndUpdate( id,req.body,{returnDocument: "after",runValidators: true,});

  res.status(200).json({message: "success",exam: updatedExam,});
});

const publishExam = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const exam = await examModel.findByIdAndUpdate(
    id,
    {
      isPublished: true,
    },
    {
      returnDocument: "after",
    }
  );

  if (!exam) {
    return next(new AppError("Exam not found", 404));
  }

  res.status(200).json({
    message: "Exam published successfully",
    exam,
  });
});

const unpublishExam = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const exam = await examModel.findByIdAndUpdate(
    id,
    {
      isPublished: false,
    },
    {
      returnDocument: "after",
    }
  );

  if (!exam) {
    return next(new AppError("Exam not found", 404));
  }

  res.status(200).json({
    message: "Exam unpublished successfully",
    exam,
  });
});

const deleteExam = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const exam = await examModel.findByIdAndDelete(id,{new: true,});

  if (!exam) {
    return next(new AppError("Exam already deleted", 404));
  }

  res.status(200).json({ message: "success",exam});
});

export {addExam,getAllExams,getExam,updateExam,publishExam,unpublishExam,deleteExam,};