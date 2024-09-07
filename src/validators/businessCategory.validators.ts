import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorAddBusinessCategory = [
  check("businessId").exists().notEmpty().isString(),
  check("categoryId").exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneBusinessCategory = [
  check("businessId").exists().notEmpty().isString(),
  check("categoryId").exists().notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
export { validatorAddBusinessCategory, validatorUpdateOneBusinessCategory };
