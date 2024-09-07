import { Router } from "express";
import {
  deleteReview,
  getReview,
  getReviews,
  postReview,
  updateReview,
} from "../../controllers/review.controller.js";
import {
  validatorAddReview,
  validatorUpdateOneReview,
} from "../../validators/review.validator.js";

const reviewRouter = Router();

/**
 * Recovery all offers
 */
reviewRouter
  .get("/", getReviews)

  .get("/:id", getReview)

  .post("/", validatorAddReview, postReview)

  .put("/:id", validatorUpdateOneReview, updateReview)

  .delete("/:id", deleteReview);

export { reviewRouter };
