import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent"],
      default: "present",
    },
  },
  {
    timestamps: true,
  }
);

const attendanceModel = mongoose.model("Attendance", attendanceSchema);

export default attendanceModel;