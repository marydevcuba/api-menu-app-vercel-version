import { Router } from "express";
import {
  validatorAddOffer,
  validatorUpdateOneOffer,
} from "../../validators/offer.validators.js";
import {
  validatorAddOfferCategory,
  validatorUpdateOneOfferCategory,
} from "../../validators/offerCategory.validators.js";
import {
  deleteOfferCategory,
  getOfferCategory,
  getOffersCategories,
  postOfferCategory,
  updateOfferCategory,
} from "../../controllers/offerCategory.controllers.js";

const offerCategoryRouter = Router();

/**
 * Recovery all offersCategories
 */
offerCategoryRouter
  .get("/", getOffersCategories)

  .get("/:id", getOfferCategory)

  .post("/", validatorAddOfferCategory, postOfferCategory)

  .put("/:id", validatorUpdateOneOfferCategory, updateOfferCategory)

  .delete("/:id", deleteOfferCategory);

export { offerCategoryRouter };
