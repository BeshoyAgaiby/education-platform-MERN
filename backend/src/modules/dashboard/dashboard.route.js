import express from "express";
import auth from "../../middleware/authentication.js";
import allowedTo from "../../middleware/authorization.js";
import  getDashboardStats  from "./dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats",auth,allowedTo("admin"),getDashboardStats);

export default dashboardRouter;