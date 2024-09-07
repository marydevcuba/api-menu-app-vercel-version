import { Router } from "express";
import {
  deleteImageUrl,
  getImageUrl,
  getImagesUrl,
  postImageUrl,
  updateImageUrl,
  getImageUrlByUserId,
  getImageUrlByOfferId,
  getImageUrlByCategoryId,
  getImageUrlByBusinessId,
} from "../../controllers/imageUrl.controllers.js";
import { uploadMulter } from "../../utils/multer.handle.js";
import {
  validatorAddImageUrl,
  validatorGetImageUrlBusinessId,
  validatorGetImageUrlCategoryId,
  validatorGetImageUrlOffersId,
  validatorGetImageUrlUserId,
  validatorUpdateOneImageUrl,
} from "../../validators/imagesUrl.validators.js";

const imageUrlRouter = Router();

imageUrlRouter
  .get("/", getImagesUrl)

  .get("/:id", getImageUrl)

  .get("/userid/:id", getImageUrlByUserId)
  .get("/offerid/:id", getImageUrlByOfferId)
  .get("/categoryid/:id", getImageUrlByCategoryId)
  .get("/businessid/:id", getImageUrlByBusinessId)

  .post("/", uploadMulter.single("image"), validatorAddImageUrl, postImageUrl)

  .put(
    "/:id",
    uploadMulter.single("image"),
    validatorUpdateOneImageUrl,
    updateImageUrl
  )

  .delete("/:id", deleteImageUrl);

export { imageUrlRouter };
