import express from "express";
import * as lecture from "./lecture.controller.js";
import { uploadFiles } from "../../middleware/upload.js";
import validate from "../../middleware/validate.js";
import * as lecValidate from "./lectureValidation.js";
import auth from "../../middleware/authentication.js";
import allowedTo from "../../middleware/authorization.js";


const lectureRouter = express.Router();
lectureRouter.use(auth)

lectureRouter.post("/",allowedTo("admin"), uploadFiles(), validate(lecValidate.addLecture) ,lecture.addLecture
);


lectureRouter.get("/", lecture.getAllLectures);

lectureRouter.route("/:id")
  .get(validate(lecValidate.checkIdParams),lecture.getLecture)
  .put(allowedTo("admin"),uploadFiles(),validate(lecValidate.updateValidate),lecture.updateLecture)
  .delete(allowedTo("admin"),validate(lecValidate.checkIdParams),lecture.deleteLecture);

lectureRouter.put("/:id/published", allowedTo("admin"),validate(lecValidate.checkIdParams),lecture.publishLecture);
lectureRouter.put("/:id/unpublished",allowedTo("admin"), validate(lecValidate.checkIdParams),lecture.unpublishLecture);

export default lectureRouter;