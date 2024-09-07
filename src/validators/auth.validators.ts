import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validator.handle.js";

const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3 }).isString(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3 }).isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3 }).isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorSendCode = [
  check("id").exists().notEmpty().isString(),
  check("name").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorVerifyCode = [
  check("id").exists().notEmpty().isString(),
  check("code").exists().notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export {
  validatorRegister,
  validatorLogin,
  validatorSendCode,
  validatorVerifyCode,
};
