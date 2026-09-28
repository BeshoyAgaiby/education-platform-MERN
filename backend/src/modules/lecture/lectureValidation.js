import Joi from "joi";

const idValidate = Joi.string().hex().length(24).required();

const addLecture = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 2 characters",
      "string.max": "Title cannot exceed 100 characters",
      "any.required": "Title is required",
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .optional()
    .messages({
      "string.max": "Description cannot exceed 500 characters",
    }),

  videoUrl: Joi.string()
    .trim()
    .uri()
    .optional()
    .messages({
      "string.uri": "Please enter a valid video URL",
    }),

  pdfUrl: Joi.string()
    .trim()
    .uri()
    .optional()
    .messages({
      "string.uri": "Please enter a valid PDF URL",
    }),

  date: Joi.date()
    .required()
    .messages({
      "date.base": "Please enter a valid date",
      "any.required": "Date is required",
    }),

  isPublished: Joi.boolean()
    .optional(),
});

const updateValidate = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 2 characters",
      "string.max": "Title cannot exceed 100 characters",
    }),

  description: Joi.string()
    .trim()
    .max(500)
    .messages({
      "string.max": "Description cannot exceed 500 characters",
    }),

  videoUrl: Joi.string()
    .trim()
    .uri()
    .messages({
      "string.uri": "Please enter a valid video URL",
    }),

  pdfUrl: Joi.string()
    .trim()
    .uri()
    .messages({
      "string.uri": "Please enter a valid PDF URL",
    }),

  date: Joi.date()
    .messages({
      "date.base": "Please enter a valid date",
    }),

  isPublished: Joi.boolean(),
  id:idValidate
});

const checkIdParams = Joi.object({
  id: idValidate,
});

export {
  addLecture,
  updateValidate,
  checkIdParams,
};