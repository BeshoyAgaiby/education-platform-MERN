import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    videoUrl: {
      type: String,
      trim: true,
    },

    pdfUrl: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
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

const lectureModel = mongoose.model("Lecture", lectureSchema);

export default lectureModel;