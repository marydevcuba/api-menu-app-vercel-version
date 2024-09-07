import { Router } from "express";
import {
  deleteOffer,
  getOffer,
  getOffers,
  postOffer,
  updateOffer,
} from "../../controllers/offer.controllers.js";
import {
  validatorAddOffer,
  validatorUpdateOneOffer,
} from "../../validators/offer.validators.js";

const offerRouter = Router();

/**
 * Recovery all offers
 */
offerRouter
  .get("/", getOffers)

  .get("/:id", getOffer)

  .post("/", validatorAddOffer, postOffer)

  .put("/:id", validatorUpdateOneOffer, updateOffer)

  .delete("/:id", deleteOffer);

export { offerRouter };
