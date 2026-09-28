import userModel from "../../../Database/models/userModel.js";
import lectureModel from "../../../Database/models/lectureModel.js";
import examModel from "../../../Database/models/examModel.js";
import attendanceModel from "../../../Database/models/attendsModel.js";
import CatchError from "../../utils/CatchAsyncError.js"


const getDashboardStats = CatchError(async (req, res, next) => {
  const students = await userModel.countDocuments({role: "student"});
  const lectures = await lectureModel.countDocuments();
  const exams = await examModel.countDocuments();
  const totalAttendance = await attendanceModel.countDocuments();
  const presentAttendance = await attendanceModel.countDocuments({status: "present",});
  const attendancePercentage =
    totalAttendance > 0
      ? (presentAttendance / totalAttendance) * 100
      : 0;

  res.status(200).json({
    message: "success",
    stats: {
      students,
      lectures,
      exams,
      attendancePercentage: Number(
        attendancePercentage.toFixed(2)
      ),
    },
  });
});

export default getDashboardStats;