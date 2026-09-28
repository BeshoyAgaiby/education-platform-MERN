import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    date: {
      type: Date,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
      min:1,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const examModel = mongoose.model("Exam", examSchema);

export default examModel;