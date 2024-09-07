import { RequestExt } from "../interfaces/requestExtended.interfaces.js";
import { handleHttpError } from "../utils/error.handle.js";
import { Response, NextFunction } from "express";
import { prisma } from "../utils/prisma.client.js";

const isVerifiedUser = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  const user = req.userSession;
  try {
    const userIfVerified = await prisma.user.findFirst({
      where: {
        id: user?.id,
      },
    });

    if (!userIfVerified) return handleHttpError(res, "VERIFICATION_USER_ERROR");

    if (!userIfVerified.is_verified)
      return handleHttpError(res, "ERIFICATION_USER_ERROR");

    next();
  } catch (error) {
    handleHttpError(res, "VERIFICATION_USER_ERROR");
  }
};

export { isVerifiedUser };
