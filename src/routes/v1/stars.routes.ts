import { Router } from "express";
import {
  validatorAddStar,
  validatorUpdateOneStar,
} from "../../validators/star.validator.js";
import {
  deleteStar,
  getStar,
  getStars,
  postStar,
  updateStar,
} from "../../controllers/star.controller.js";

const starsRouter = Router();

/**
 * Recovery all offers
 */
starsRouter
  .get("/", getStars)

  .get("/:id", getStar)

  .post("/", validatorAddStar, postStar)

  .put("/:id", validatorUpdateOneStar, updateStar)

  .delete("/:id", deleteStar);

export { starsRouter };
