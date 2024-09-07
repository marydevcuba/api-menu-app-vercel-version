import { check, oneOf } from "express-validator";
import { NextFunction, Response, Request } from "express";
import { validateResult } from "../utils/validator.handle.js";

const validatorAddImageUrl = [
  //check("userId").exists().notEmpty().isString(),
  oneOf([
    check("userId").notEmpty().isString(),
    check("offerId").notEmpty().isString(),
    check("categoryId").notEmpty().isString(),
    check("businessId").notEmpty().isString(),
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneImageUrl = [
  oneOf([
    check("id").exists().notEmpty().isString(),
    check("imageUrl").optional().notEmpty().isString(),
    check("public_id").optional().notEmpty().isString(),
    check("userId").optional().notEmpty().isString(),
    check("offersId").optional().notEmpty().isString(),
    check("categoryId").optional().notEmpty().isString(),
    check("businessId").optional().notEmpty().isString(),
  ]),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
const validatorGetImageUrlUserId = [
  check("userId").exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
const validatorGetImageUrlOffersId = [
  check("offersId").exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
const validatorGetImageUrlCategoryId = [
  check("categoryId").exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
const validatorGetImageUrlBusinessId = [
  check("businessId").exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
export {
  validatorAddImageUrl,
  validatorUpdateOneImageUrl,
  validatorGetImageUrlUserId,
  validatorGetImageUrlOffersId,
  validatorGetImageUrlCategoryId,
  validatorGetImageUrlBusinessId,
};
