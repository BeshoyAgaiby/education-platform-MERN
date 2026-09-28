import express from "express"
import * as exams from "./exams.controller.js"
import validate from "../../middleware/validate.js";
import * as examValidation from "./examValidation.js";
import auth from "../../middleware/authentication.js";
import allowedTo from "../../middleware/authorization.js";


const examRouter = express.Router();
examRouter.use(auth)

examRouter.route('/').post(allowedTo("admin"),validate(examValidation.addExam),exams.addExam)
.get(exams.getAllExams)

examRouter.route('/:id').get(validate(examValidation.checkIdParams),exams.getExam)
.put(allowedTo("admin"),validate(examValidation.updateValidate),exams.updateExam)
.delete(allowedTo("admin"),validate(examValidation.checkIdParams),exams.deleteExam)

examRouter.put("/:id/published",allowedTo("admin"),validate(examValidation.checkIdParams),exams.publishExam)
examRouter.put("/:id/unpublished",allowedTo("admin"),validate(examValidation.checkIdParams),exams.unpublishExam)

export default examRouter;