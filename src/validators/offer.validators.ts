import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorAddOffer = [
  check("name").exists().notEmpty().isLength({ min: 3 }).isString(),
  check("price").exists().notEmpty().isNumeric(),
  check("code").optional().notEmpty().isString(),
  check("description").optional().isLength({ min: 5 }).isString(),
  check("ingredients").optional().isLength({ min: 5 }).isString(),
  check("businessId").exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneOffer = [
  check("id").exists().notEmpty().isNumeric(),
  check("name").optional().notEmpty().isLength({ min: 3 }).isString(),
  check("code").optional().notEmpty().isString(),
  check("description").optional().isLength({ min: 5 }).isString(),
  check("ingredients").optional().isLength({ min: 5 }).isString(),
  check("businessId").optional().notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export { validatorAddOffer, validatorUpdateOneOffer };
