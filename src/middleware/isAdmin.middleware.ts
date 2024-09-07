import { RequestExt } from "../interfaces/requestExtended.interfaces.js";
import { handleHttpError } from "../utils/error.handle.js";
import { Response, NextFunction } from "express";

const isAdmin = async (req: RequestExt, res: Response, next: NextFunction) => {
  const user = req.userSession;
  try {
    if (user?.role !== "ADMIN" || user.role === undefined)
      return handleHttpError(res, "AUTHORIZATION_ERROR");

    next();
  } catch (error) {
    handleHttpError(res, "AUTHORIZATION_ERROR");
  }
};

export { isAdmin };
