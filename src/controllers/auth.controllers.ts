import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import {
  loginUser,
  registerNewUser,
  sendEmailCode,
} from "../services/auth.services.js";
import { generateToken, verifyToken } from "../utils/jwt.handle.js";
import { matchedData } from "express-validator";
import { LoginAuth, RegisterAuth } from "../interfaces/auth.interface.js";
import { prisma } from "../utils/prisma.client.js";

const JWT_SECRET = process.env.JWT_SECRET || "tokensecreto.333";

const authRegister = async (req: Request, res: Response) => {
  try {
    const body: RegisterAuth = matchedData(req);
    const responseNewUser = await registerNewUser(body);

    if (responseNewUser.status !== "OK")
      handleHttpError(res, `${responseNewUser.errorMessage}`, 400);
    else {
      if (responseNewUser.data) {
        const token = generateToken({
          id: responseNewUser.data.id,
          email: responseNewUser.data.email,
          role: responseNewUser.data.role,
        });

        // Poner el Token en cookies por HttpOnly
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "none",
          maxAge: 7200000,
        });

        const sendingEmail = await sendEmailCode(
          responseNewUser.data.email,
          responseNewUser.data.name
        );

        if (sendingEmail.status !== "OK") {
          return handleHttpError(
            res,
            "ERROR_SENDING_CODE_FOR_REGISTRATION",
            400
          );
        }

        if (sendingEmail.data !== null) {
          const verificationCode = await prisma.verificationCode.create({
            data: {
              code: sendingEmail.data.toString(),
              token,
              userId: responseNewUser.data.id,
            },
          });
        }

        res.send({
          status: "OK",
          errorMessage: null,
          data: {
            id: responseNewUser.data.id,
            email: responseNewUser.data.email,
            token,
          },
        });
      } else handleHttpError(res, "ERROR_REGISTER", 400);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER", 400);
  }
};

const authLogin = async (req: Request, res: Response) => {
  try {
    const body: LoginAuth = matchedData(req);
    const { email, password } = body;
    const loginOneUser = await loginUser(email, password);

    if (loginOneUser.errorMessage === "USER_OR_PASSWORD_WRONG")
      return handleHttpError(res, `${loginOneUser.errorMessage}`, 403);

    if (loginOneUser.status !== "OK")
      return handleHttpError(res, `${loginOneUser.errorMessage}`, 400);

    // Poner el Token en cookies por HttpOnly
    res.cookie("token", loginOneUser.data?.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
      maxAge: 7200000,
    });

    res.send({
      status: "OK",
      errorMessage: null,
      data: loginOneUser.data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN", 400);
  }
};

const authLogout = async (req: Request, res: Response) => {
  try {
    const cookieJwt = req.cookies.token;

    const jwtByUser = req.headers.authorization || "";
    const jwtBearer = jwtByUser.split(" ").pop() || "";

    if (!cookieJwt && !jwtBearer)
      return handleHttpError(res, "NO_SESSION", 401);

    if (jwtBearer === cookieJwt) {
      await prisma.blackListToken.create({
        data: {
          token: cookieJwt,
        },
      });
    }

    if (!jwtBearer && cookieJwt) {
      await prisma.blackListToken.create({
        data: {
          token: cookieJwt,
        },
      });
    }

    if (jwtBearer && !cookieJwt) {
      await prisma.blackListToken.create({
        data: {
          token: jwtBearer,
        },
      });
    }

    // Para eliminar la cookie.
    //*Es necesario ponerle en el primer parametro el mismo nombre que cuando se crea la cookie en Register o Login (en este caso "token")
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.send({
      status: "OK",
      errorMessage: null,
      data: "Ha cerrado la sesion correctamente",
    });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN", 400);
  }
};

const sendEmailVerificationCode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: RegisterAuth = matchedData(req);
    const { name, email } = body;

    const jwtByUser = req.headers.authorization || "";
    const jwtBearer = jwtByUser.split(" ").pop() || "";

    /* const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
      },
    }); */

    //if (!foundUser) return handleHttpError(res, "USER_ERROR_OR_NOT_EXIST", 400);

    const sendingEmail = await sendEmailCode(email, name);

    if (sendingEmail.status !== "OK") {
      return handleHttpError(res, "ERROR_SENDING_CODE_FOR_REGISTRATION", 400);
    }

    //if (sendingEmail.data !== null && foundUser !== null) {
    if (sendingEmail.data !== null) {
      const verificationCode = await prisma.verificationCode.create({
        data: {
          code: sendingEmail.data.toString(),
          token: jwtBearer,
          userId: id,
        },
      });
    }
    res.send({
      status: "OK",
      errorMessage: null,
      data: "Se ha enviado un codigo a su correo",
    });
  } catch (error) {
    handleHttpError(res, "ERROR_SENDING_VALIDATION_CODE", 400);
  }
};

const checkEmailCode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const jwtByUser = req.headers.authorization || "";
    const jwtBearer = jwtByUser.split(" ").pop() || "";

    const verifyJwt = verifyToken(jwtBearer);

    if (!verifyJwt)
      return handleHttpError(res, "INVALID_SESSION_OR_SESSION_EXPIRED", 400);

    const verifyCode = await prisma.verificationCode.findFirst({
      where: {
        code,
        token: jwtBearer,
        userId: id,
      },
    });

    if (!verifyCode) return handleHttpError(res, "ERROR_VERIFYING_CODE", 400);

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        is_verified: true,
      },
    });

    res.send({
      status: "OK",
      errorMessage: null,
      data: "El codigo se ha verificado correctamente",
    });
  } catch (error) {
    console.log(error);

    handleHttpError(res, "ERROR_CHECKING_CODE", 400);
  }
};

export {
  authRegister,
  authLogin,
  authLogout,
  sendEmailVerificationCode,
  checkEmailCode,
};
