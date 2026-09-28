import express from "express";
import * as attends from "./attends.controller.js";
import validate from "../../middleware/validate.js";
import * as attendsValidate from "./attendsValidation.js";
import auth from "../../middleware/authentication.js";
import allowedTo from "../../middleware/authorization.js";

const attendsRouter = express.Router();
attendsRouter.use(auth)

attendsRouter.route('/').post(allowedTo("admin"),validate(attendsValidate.addAttendance),attends.addAttendance)
.get(allowedTo("admin"),attends.getAllAttendance);

attendsRouter.get("/my_attendance",attends.getStudentAttendance)
attendsRouter.get('/admin/:id',allowedTo("admin"),validate(attendsValidate.checkIdParams),attends.getStudentForAdmin)
attendsRouter.route('/:id').put(allowedTo("admin"),validate(attendsValidate.updateValidate),attends.updateAttendance)
.delete(allowedTo("admin"),validate(attendsValidate.checkIdParams),attends.deleteAttendance);

export default attendsRouter;