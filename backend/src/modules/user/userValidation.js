import Joi from "joi";

const idValidate = Joi.string().hex().required();

const addStudent = Joi.object({
  name: Joi.string().trim().min(2).max(50).required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
      "any.required": "Name is required",
    }),

  studentCode: Joi.string().trim().uppercase().required()
    .messages({
      "string.empty": "Student code is required",
      "any.required": "Student code is required",
    }),

  email: Joi.string().trim().lowercase().email().optional()
    .messages({
      "string.email": "Please enter a valid email",
    }),
  phone: Joi.string().trim().optional(),
  grade: Joi.string().trim().optional(),
  role: Joi.string().valid("student", "admin").optional(),
  isActive: Joi.boolean().optional(),
});

const studentAccess = Joi.object({
  studentCode: Joi.string()
    .trim()
    .uppercase()
    .required()
    .messages({
      "string.empty": "Student code is required",
      "any.required": "Student code is required",
    }),
});

const addAdmin = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string().trim().lowercase().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email",
      "any.required": "Email is required",
    }),

  password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
});
const adminLogin = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email",
      "any.required": "Email is required",
    }),

  password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
});
const updateValidate = Joi.object({
  name: Joi.string().trim().min(2).max(50)
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
    }),
  studentCode: Joi.string().trim().uppercase()
    .messages({
      "string.empty": "Student code is required",
    }),

  email: Joi.string().trim().lowercase().email().optional()
    .messages({
      "string.email": "Please enter a valid email",
    }),
  phone: Joi.string().trim().optional(),
  grade: Joi.string().trim().optional(),
  role: Joi.string().valid("student", "admin").optional(),
  id:idValidate
})

const checkIdParams=Joi.object({
    id:idValidate
})





export {addStudent,studentAccess,updateValidate,checkIdParams,adminLogin,addAdmin}