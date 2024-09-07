import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorAddBusiness = [
  check("name").exists().notEmpty().isLength({ min: 3 }).isString(),
  check("categoriesIds").isArray(),
  check("email").optional().notEmpty().isEmail(),
  check("phone").optional().notEmpty().isLength({ min: 8 }).isNumeric(),
  check("web").optional().notEmpty().isURL(),
  check("address").exists().notEmpty().isLength({ min: 8 }).isString(),
  check("description").optional().isLength({ min: 5 }).isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneBusiness = [
  check("id").exists().notEmpty().isString(),
  check("name").optional().notEmpty().isLength({ min: 3 }).isString(),
  check("email").optional().notEmpty().isEmail(),
  check("phone").optional().notEmpty().isLength({ min: 8 }).isNumeric(),
  check("web").optional().notEmpty().isURL(),
  check("address").optional().notEmpty().isLength({ min: 8 }).isString(),
  check("description").optional().isLength({ min: 5 }).isString(),
  check("categoriesIds").optional().isArray(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
export { validatorAddBusiness, validatorUpdateOneBusiness };
