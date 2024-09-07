import { check, oneOf } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorAddReview = [
  check("description")
    .exists()
    .withMessage("Es obligatoria")
    .notEmpty()
    .withMessage("No puede estar vacia")
    .isLength({ min: 5 })
    .withMessage("Debe tener al menos 5 caracteres")
    .isString()
    .withMessage("Debe ser de tipo String"),
  check("userId")
    .exists()
    .withMessage("Es obligatorio")
    .notEmpty()
    .withMessage("No puede estar vacia")
    .isString()
    .withMessage("Debe ser de tipo String"),
  oneOf([
    check("businessId").optional().notEmpty().isString(),
    check("offerId").optional().notEmpty().isString(),
  ]),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneReview = [
  check("id").exists().notEmpty().isString(),
  check("description").exists().notEmpty().isLength({ min: 5 }).isString(),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export { validatorAddReview, validatorUpdateOneReview };
