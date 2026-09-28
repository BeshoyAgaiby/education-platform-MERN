import express from "express";
import * as user from "./user.controller.js";
import validate from "../../middleware/validate.js";
import * as userValidate from "./userValidation.js"
import auth from "../../middleware/authentication.js";
import allowedTo from "../../middleware/authorization.js";

const userRouter = express.Router();
userRouter.post("/access", validate(userValidate.studentAccess),user.studentAccess);
userRouter.post("/admin/login", validate(userValidate.adminLogin),user.adminLogin);


userRouter.use(auth);

userRouter.post("/",allowedTo("admin"),validate(userValidate.addStudent) ,user.addStudent);
userRouter.post("/admin/register",allowedTo("admin"),validate(userValidate.addAdmin),user.addAdmin);
userRouter.get("/", allowedTo("admin"),user.getAllStudents);
userRouter
  .route("/:id")
  .get(allowedTo("admin"),validate(userValidate.checkIdParams),user.getStudent)
  .put(allowedTo("admin"),validate(userValidate.updateValidate),user.updateStudent)
  .delete(allowedTo("admin"),validate(userValidate.checkIdParams),user.deleteStudent);
userRouter.route("/:id/deactivate").put(allowedTo("admin"),validate(userValidate.checkIdParams),user.deactivateStudent);
userRouter.route("/:id/activate").put(allowedTo("admin"),validate(userValidate.checkIdParams),user.activateStudent);

export default userRouter;
