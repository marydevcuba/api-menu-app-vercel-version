import { Request, Response, Router } from "express";
import {
  deleteCategory,
  deleteManyCategories,
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
} from "../../controllers/category.controllers.js";
import {
  validatorAddCategory,
  validatorDeleteManyCategories,
  validatorUpdateOneCategory,
} from "../../validators/categories.validators.js";
import { uploadMulter } from "../../utils/multer.handle.js";

const categoryRouter = Router();

/**
 * All Category Routes
 */
categoryRouter
  .get("/", getCategories)

  .get("/:id", getCategory)

  .post("/", uploadMulter.single("image"), validatorAddCategory, postCategory)

  .put("/:id", validatorUpdateOneCategory, updateCategory)

  .delete("/:id", deleteCategory)

  .delete("/", validatorDeleteManyCategories, deleteManyCategories);

export { categoryRouter };
