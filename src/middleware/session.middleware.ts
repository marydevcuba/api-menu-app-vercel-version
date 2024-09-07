import { NextFunction, Request, Response } from "express";
import { jwtPayloadData, verifyToken } from "../utils/jwt.handle.js";
import { handleHttpError } from "../utils/error.handle.js";
import { RequestExt } from "../interfaces/requestExtended.interfaces.js";
import { prisma } from "../utils/prisma.client.js";

const checkSession = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["cookie"];
    let jwtCookie: string | null = null;
    if (authHeader) {
      jwtCookie = authHeader.split("=")[1];
    }

    const jwtByUser = req.headers.authorization || "";
    const jwtBearer = jwtByUser.split(" ").pop() || "";

    let tokenCookieBlock = false;
    let tokenBearerBlock = false;

    //console.log("Cookie: " + jwtCookie);
    //console.log("Bearer: " + jwtBearer);

    if (!jwtCookie && !jwtBearer) return handleHttpError(res, "EMPTY_JWT", 401);

    if (jwtCookie) {
      const verifyJwt = verifyToken(jwtCookie);
      if (verifyJwt) {
        const tokenBlock = await prisma.blackListToken.findUnique({
          where: {
            token: jwtCookie,
          },
        });
        if (tokenBlock) {
          tokenCookieBlock = true;
        }
      }
    }

    if (jwtBearer) {
      const verifyJwt = verifyToken(jwtBearer);

      if (verifyJwt) {
        const tokenBlock = await prisma.blackListToken.findUnique({
          where: {
            token: jwtBearer,
          },
        });
        if (tokenBlock) {
          tokenBearerBlock = true;
        }
      }
    }

    if (tokenBearerBlock && tokenCookieBlock)
      return handleHttpError(res, "NO_VALID_SESSION", 401);

    if (jwtCookie && !tokenCookieBlock) {
      req.userSession = jwtPayloadData(jwtCookie);
      return next();
    } else if (jwtBearer && !tokenBearerBlock) {
      req.userSession = jwtPayloadData(jwtBearer);
      return next();
    }
    /* else if (
      jwtBearer &&
      !tokenBearerBlock &&
      jwtCookie &&
      !tokenCookieBlock
    ) {
      req.userSession = jwtPayloadData(jwtBearer);
      return next();
    } else */
    return handleHttpError(res, "NO_VALID_SESSION", 403);
  } catch (error: any) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return handleHttpError(res, "La sesión ha expirado", 403);
    }
    return handleHttpError(res, "NO_VALID_SESSION", 403);
  }
};

export { checkSession };
