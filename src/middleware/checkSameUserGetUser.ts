import { RequestExt } from "../interfaces/requestExtended.interfaces.js";
import { handleHttpError } from "../utils/error.handle.js";
import { Response, NextFunction } from "express";

const checkSameUserGetUser = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  const user = req.userSession;
  const { id } = req.params;
  try {
    if (user?.role !== "ADMIN") {
      if (user?.id !== id) return handleHttpError(res, "AUTHORIZATION_ERROR");
    }

    next();
  } catch (error) {
    handleHttpError(res, "AUTHORIZATION_ERROR");
  }
};

export { checkSameUserGetUser };
