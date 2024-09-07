import { check, oneOf } from "express-validator";
import { validateResult } from "../utils/validator.handle.js";
import { NextFunction, Response, Request } from "express";

const validatorAddStar = [
  check("valoration")
    .exists()
    .withMessage("Es obligatoria")
    .notEmpty()
    .withMessage("No puede estar vacia")
    .isInt({ min: 1, max: 5 })
    .withMessage("Debe ser de tipo Number"),
  check("userId")
    .exists()
    .withMessage("Es obligatorio")
    .notEmpty()
    .withMessage("No puede estar vacia")
    .isString()
    .withMessage("Debe ser de tipo String"),
  check("reviewId")
    .exists()
    .withMessage("Es obligatorio")
    .notEmpty()
    .withMessage("No puede estar vacia")
    .isString()
    .withMessage("Debe ser de tipo String"),
  oneOf([
    check("businessId")
      .optional()
      .notEmpty()
      .withMessage("No puede estar vacia")
      .isString()
      .withMessage("Debe ser de tipo String"),
    check("offerId")
      .optional()
      .notEmpty()
      .withMessage("No puede estar vacia")
      .isString()
      .withMessage("Debe ser de tipo String"),
  ]),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

const validatorUpdateOneStar = [
  check("id")
    .exists()
    .notEmpty()
    .withMessage("No puede estar vacia")
    .isString()
    .withMessage("Debe ser de tipo String"),
  check("valoration")
    .exists()
    .withMessage("Es obligatoria")
    .notEmpty()
    .withMessage("No puede estar vacia")
    .isInt({ min: 1, max: 5 })
    .withMessage("Debe ser de tipo Number con valores entre 1 y 5"),

  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export { validatorAddStar, validatorUpdateOneStar };
