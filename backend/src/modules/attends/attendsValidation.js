import Joi from "joi";

const idValidate = Joi.string().hex().length(24).required();

const addAttendance = Joi.object({
  student: idValidate.messages({
    "string.hex": "Invalid student ID",
    "string.length": "Invalid student ID",
    "any.required": "Student ID is required",
  }),

  lecture: idValidate.messages({
    "string.hex": "Invalid lecture ID",
    "string.length": "Invalid lecture ID",
    "any.required": "Lecture ID is required",
  }),

  status: Joi.string()
    .valid("present", "absent")
    .optional()
    .messages({
      "any.only": "Status must be present or absent",
    }),
});

const updateValidate = Joi.object({
  student: Joi.string()
    .hex()
    .length(24)
    .messages({
      "string.hex": "Invalid student ID",
      "string.length": "Invalid student ID",
    }),

  lecture: Joi.string()
    .hex()
    .length(24)
    .messages({
      "string.hex": "Invalid lecture ID",
      "string.length": "Invalid lecture ID",
    }),

  status: Joi.string()
    .valid("present", "absent")
    .messages({
      "any.only": "Status must be present or absent",
    }),

    id:idValidate
});

const checkIdParams = Joi.object({
  id: idValidate,
});

const checkStudentIdParams = Joi.object({
  studentId: idValidate,
});

export {
  addAttendance,
  updateValidate,
  checkIdParams,
  checkStudentIdParams,
};