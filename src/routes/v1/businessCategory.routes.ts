import { Request, Response, Router } from "express";

import {
  validatorAddBusiness,
  validatorUpdateOneBusiness,
} from "../../validators/business.validators.js";
import {
  deleteBusinessCategory,
  getBusinessCategories,
  getOnlyOneBusinessCategory,
  postBusinessCategory,
  updateBusinessCategory,
} from "../../controllers/businessCategory.controller.js";
import {
  validatorAddBusinessCategory,
  validatorUpdateOneBusinessCategory,
} from "../../validators/businessCategory.validators.js";

const businessCategoryRouter = Router();

/**
 * Recovery all products
 */
businessCategoryRouter
  .get("/", getBusinessCategories)

  .get("/:id", getOnlyOneBusinessCategory)

  .post("/", validatorAddBusinessCategory, postBusinessCategory)

  .put("/:id", validatorUpdateOneBusinessCategory, updateBusinessCategory)

  .delete("/:id", deleteBusinessCategory);

export { businessCategoryRouter };
