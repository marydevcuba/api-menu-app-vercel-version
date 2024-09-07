import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorAddOfferCategory = [
  check("offerId").exists().notEmpty().isString(),
  check("categoryId").exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneOfferCategory = [
  check("offerId").exists().notEmpty().isString(),
  check("categoryId").exists().notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
export { validatorAddOfferCategory, validatorUpdateOneOfferCategory };
