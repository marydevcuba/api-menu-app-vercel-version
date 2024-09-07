import { Request, Response, Router } from "express";

import {
  deleteBusiness,
  getBusiness,
  getOnlyOneBusiness,
  postBusiness,
  updateBusiness,
} from "../../controllers/business.controllers.js";
import {
  validatorAddBusiness,
  validatorUpdateOneBusiness,
} from "../../validators/business.validators.js";

const businessRouter = Router();

/**
 * Recovery all products
 */
businessRouter
  .get("/", getBusiness)

  .get("/:id", getOnlyOneBusiness)

  .post("/", validatorAddBusiness, postBusiness)

  .put("/:id", validatorUpdateOneBusiness, updateBusiness)

  .delete("/:id", deleteBusiness);

export { businessRouter };
