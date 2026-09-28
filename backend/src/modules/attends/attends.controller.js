import attendanceModel from "../../../Database/models/attendsModel.js";
import AppError from "../../utils/AppError.js";
import CatchError from "../../utils/CatchAsyncError.js";

const calculateAttendance = (attendance) => {
  const totalLectures = attendance.length;

  const presentLectures = attendance.filter(
    (item) => item.status === "present"
  ).length;

  const absentLectures = attendance.filter(
    (item) => item.status === "absent"
  ).length;

  const attendancePercentage = totalLectures > 0? (presentLectures / totalLectures) * 100: 0;

  return {
    totalLectures,
    presentLectures,
    absentLectures,
    attendancePercentage,
  };
};
const addAttendance = CatchError(async (req, res, next) => {
  const { student, lecture, status } = req.body;

  const existingAttendance = await attendanceModel.findOne({student,lecture});

  if (existingAttendance) return next(new AppError("Attendance already exists", 409));
  

  const attendance = await attendanceModel.create({student,lecture,status,});

  res.status(201).json({ message: "success",attendance,});
});

const getStudentForAdmin = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const attendance = await attendanceModel.find({ student: id })
    .populate("student", "name studentCode")
    .populate("lecture", "title date");

  if (!attendance.length) return next(new AppError("No attendance records found", 404));


  const attendanceStats = calculateAttendance(attendance);

  res.status(200).json({
    message: "success",
    ...attendanceStats,
    attendance,
  });
});
const getAllAttendance = CatchError(async (req, res, next) => {
  const attendance = await attendanceModel
    .find()
    .populate("student", "name studentCode")
    .populate("lecture", "title date");

  res.status(200).json({message: "success",attendance,})
});

const getStudentAttendance = CatchError(async (req, res, next) => {

  const attendance = await attendanceModel.find({ student: req.user._id })
    .populate("lecture", "title date");

  if (!attendance.length) {
    return next(new AppError("No attendance records found", 404));
  }

   const attendanceStats = calculateAttendance(attendance);

  res.status(200).json({
    message: "success",
    ...attendanceStats,
    attendance
  });
});

const updateAttendance = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const attendance = await attendanceModel.findByIdAndUpdate(id,req.body,{returnDocument:"after",runValidators: true});

  if (!attendance) return next(new AppError("Attendance not found", 404));
 

  res.status(200).json({message: "success",attendance,
  });
});

const deleteAttendance = CatchError(async (req, res, next) => {
  const { id } = req.params;

  const attendance = await attendanceModel.findByIdAndDelete(id,{new:true});

  if (!attendance)  return next(new AppError("Attendance already deleted", 404));
  

  res.status(200).json({message: "success",attendance,});
});

export { addAttendance,getAllAttendance,getStudentAttendance,updateAttendance,deleteAttendance,getStudentForAdmin};