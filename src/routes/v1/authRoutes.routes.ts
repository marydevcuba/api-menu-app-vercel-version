import { Router } from "express";
import {
  authLogin,
  authLogout,
  authRegister,
  checkEmailCode,
  sendEmailVerificationCode,
} from "../../controllers/auth.controllers.js";
import {
  validatorLogin,
  validatorRegister,
  validatorSendCode,
  validatorVerifyCode,
} from "../../validators/auth.validators.js";
import { checkSession } from "../../middleware/session.middleware.js";

const authRouter = Router();
//const loginRouter = express.Router();

authRouter
  .post("/register", validatorRegister, authRegister)

  .post("/login", validatorLogin, authLogin)

  .post("/logout", checkSession, authLogout)

  .post(
    "/send-code/:id",
    validatorSendCode,
    checkSession,
    sendEmailVerificationCode
  )

  .post("/check-code/:id", validatorVerifyCode, checkSession, checkEmailCode);

export { authRouter };
