import express from "express";
import  searchStudents  from "./student.controller.js";
import auth from "../../middleware/authentication.js";
import allowedTo from "../../middleware/authorization.js";

const studentRouter = express.Router();

studentRouter.get("/search",auth,allowedTo("admin"),searchStudents);

export default studentRouter;