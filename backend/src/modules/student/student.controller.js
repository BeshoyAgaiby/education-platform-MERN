import userModel from "../../../Database/models/userModel.js";
import attendanceModel from "../../../Database/models/attendsModel.js";
import CatchError from "../../utils/CatchAsyncError.js";
import AppError from "../../utils/AppError.js";

const searchStudents = CatchError(async (req, res, next) => {
  const { q } = req.query;

  if (!q?.trim()) return next(new AppError("Search value is required", 400));
  

  const students = await userModel.find({
      role: "student",
      $or: [
        {
          name: {
            $regex: q.trim(),
            $options: "i",
          },
        },
        {
          studentCode: {
            $regex: q.trim(),
            $options: "i",
          },
        },
      ],
    })
    .select("-password");


  const studentsData = await Promise.all(
    students.map(async (student) => {
      const attendance = await attendanceModel.find({ student: student._id })
        .populate("lecture","title description videoUrl pdfUrl date isPublished")
        .sort({ createdAt: -1 });
      return {student,attendance};
    })
  );

  res.status(200).json({
    message: "success",
    students: studentsData,
  });
});

export default searchStudents;