import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorGetOneUser = [
  check("id").exists().notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneUser = [
  check("id").exists().notEmpty().isString(),
  check("name").optional().notEmpty().isLength({ min: 3 }).isString(),
  check("email").optional().notEmpty().isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorDeleteOneUser = [
  check("id").exists().notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorChangeRoleUser = [
  check("id").exists().notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export {
  validatorGetOneUser,
  validatorUpdateOneUser,
  validatorDeleteOneUser,
  validatorChangeRoleUser,
};
