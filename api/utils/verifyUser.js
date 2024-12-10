import pkg from "jsonwebtoken";
const { verify } = pkg;
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "No token provided"));
  }
  console.log(process.env.JWT_SECRET);
  verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return next(errorHandler(403, "Unauthorized"));
    }
    req.user = data;
    next();
  });
};
