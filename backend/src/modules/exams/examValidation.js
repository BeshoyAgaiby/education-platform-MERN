import Joi from "joi";

const idValidate = Joi.string().hex().length(24).required();

const addExam = Joi.object({
  title: Joi.string().trim().min(2).max(100).required()
    .messages({
      "string.empty": "Exam title is required",
      "string.min": "Exam title must be at least 2 characters",
      "string.max": "Exam title cannot exceed 100 characters",
      "any.required": "Exam title is required",
    }),

  description: Joi.string().trim().max(500).optional()
  .messages({
      "string.max": "Description cannot exceed 500 characters",
    }),

  date: Joi.date().required()
    .messages({
      "date.base": "Please enter a valid exam date",
      "any.required": "Exam date is required",
    }),

  totalMarks: Joi.number().min(1).required()
    .messages({
      "number.base": "Total marks must be a number",
      "number.min": "Total marks must be at least 1",
      "any.required": "Total marks is required",
    }),

  isPublished: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "isPublished must be true or false",
    }),
});

const updateValidate = Joi.object({
  title: Joi.string().trim().min(2).max(100)
    .messages({
      "string.empty": "Exam title is required",
      "string.min": "Exam title must be at least 2 characters",
      "string.max": "Exam title cannot exceed 100 characters",
    }),

  description: Joi.string().trim().max(500)
    .messages({
      "string.max": "Description cannot exceed 500 characters",
    }),

  date: Joi.date()
    .messages({
      "date.base": "Please enter a valid exam date",
    }),

  totalMarks: Joi.number().min(1)
    .messages({
      "number.base": "Total marks must be a number",
      "number.min": "Total marks must be at least 1",
    }),

  isPublished: Joi.boolean()
    .messages({
      "boolean.base": "isPublished must be true or false",
    }),

    id:idValidate
});

const checkIdParams = Joi.object({
  id: idValidate,
});

export {
  addExam,
  updateValidate,
  checkIdParams,
};