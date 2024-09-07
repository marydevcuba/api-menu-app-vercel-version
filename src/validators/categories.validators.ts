import { NextFunction, Response, Request } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";

const validatorAddCategory = [
  check("name").exists().notEmpty().isLength({ min: 3 }).isString(),
  check("description").optional().isLength({ min: 5 }).isString(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneCategory = [
  check("id").exists().notEmpty().isString(),
  check("name").optional().notEmpty().isLength({ min: 3 }).isString(),
  check("description").optional().notEmpty().isLength({ min: 5 }).isString(),
  check("business").optional().notEmpty(),
  check("categoryImage").optional().notEmpty(),
  check("offers").optional().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorDeleteManyCategories = [
  check("arrayIds").exists().isArray(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export {
  validatorAddCategory,
  validatorUpdateOneCategory,
  validatorDeleteManyCategories,
};
