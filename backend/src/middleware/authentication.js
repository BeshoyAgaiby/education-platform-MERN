import CatchError from "../utils/CatchAsyncError.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import userModel from "../../Database/models/userModel.js";

const auth = CatchError(async (req, res, next) => {
  const token = req.headers.token;
  if (!token) return next(new AppError("you should send token", 401));

  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded) return next(new AppError("you are not authorized ", 401));
  let user = await userModel.findById(decoded.id);
  if (!user) return next(new AppError("user not exist", 404));
  req.user = user;
  next();
});

export default auth;