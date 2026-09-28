import AppError from "../utils/AppError.js";

const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you are not authorized to access this resource", 403),
      );
    }
    next();
  };
};
export default allowedTo;
