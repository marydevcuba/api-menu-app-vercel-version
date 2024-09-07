import { Prisma } from "@prisma/client";
import { validateDataError } from "../utils/error.handle.js";
import { prisma } from "../utils/prisma.client.js";
import { getOneOffer } from "./offer.services.js";
import { cloudinaryApi } from "../utils/cloudinary.handle.js";
import { getOneUser } from "./user.services.js";
import { getOneCategory } from "./category.services.js";
import { getOneBusiness } from "./business.services.js";
import { ImageToUpload, ImageUrl } from "../interfaces/imageUrl.interfaces.js";

/**
 *
 * @param param0 image url and productId
 * @returns
 */

const addImageUrl = async ({
  imageUrl,
  offerId,
  categoryId,
  businessId,
  userId,
}: ImageToUpload) => {
  try {
    if (!imageUrl) return validateDataError("IMAGE_PATH_EMPTY");
    if (!offerId && !userId && !categoryId && !businessId)
      return validateDataError(
        "NOT_PRODUCTID_USERID_CATEGORYID_OR_BUSINESSID_FOR_IMAGE"
      );

    if (offerId) {
      const searchOfferForImage = await getOneOffer(offerId);
      if (searchOfferForImage.status !== "OK") {
        return validateDataError("OFFER_NOT_FOUND");
      }
    }

    if (userId) {
      const searchUserForImage = await getOneUser(userId);
      if (searchUserForImage.status !== "OK") {
        return validateDataError("USERID_NOT_FOUND");
      }
    }

    if (categoryId) {
      const searchCategoryForImage = await getOneCategory(categoryId);
      if (searchCategoryForImage.status !== "OK") {
        return validateDataError("CATEGORY_NOT_FOUND");
      }
    }

    if (businessId) {
      const searchBusinessForImage = await getOneBusiness(businessId);
      if (searchBusinessForImage.status !== "OK") {
        return validateDataError("BUSINESS_NOT_FOUND");
      }
    }

    // Upload image to Cloudinary
    const imageUploaded = await cloudinaryApi.v2.uploader.upload(imageUrl);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinaryApi.v2.url(imageUploaded.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    if (!imageUploaded)
      return validateDataError("ERROR_UPLOADING_IMAGE_TO_CLOUDINARY");

    const imageDataToAdd = await prisma.imageUrl.create({
      data: {
        imageUrl: imageUploaded.secure_url,
        public_id: imageUploaded.public_id,
        offerId,
        userId,
        categoryId,
        businessId,
      },
    });

    if (!imageDataToAdd)
      return validateDataError("ERROR_ADD_IMAGE_TO_IMAGEURL_TABLE");

    return { status: "OK", errorMessage: null, data: imageUploaded };
  } catch (e) {
    console.log(e);

    return validateDataError("ERROR_ADD_IMAGE");
  }
};

/**
 *
 * @returns All Images url
 */
const getAllImageUrl = async () => {
  try {
    const imageUrl = await prisma.imageUrl.findMany({
      select: {
        id: true,
        imageUrl: true,
        public_id: true,
        userId: true,
        offerId: true,
        categoryId: true,
        businessId: true,
      },
    });

    return { status: "OK", errorMessage: null, data: imageUrl };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GET_IMAGESURL");
  }
};

/**
 *
 * @param id ImageUrl ID to find
 * @returns
 */
const getOneImageUrl = async (id: string) => {
  try {
    const imageUrl = await prisma.imageUrl.findFirst({
      where: {
        id,
      },
    });

    if (!imageUrl) return validateDataError("IMAGE_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: imageUrl };
  } catch (e) {
    return validateDataError("ERROR_GET_IMAGE");
  }
};

/**
 *
 * @param id UserId for search image
 * @returns
 */
const getOneImageUrlByUserId = async (id: string) => {
  try {
    const imageUrlByUserId = await prisma.imageUrl.findFirst({
      where: {
        userId: id,
      },
    });

    if (!imageUrlByUserId) return validateDataError("NOT_USER_IMAGE_FOUND");

    return { status: "OK", errorMessage: null, data: imageUrlByUserId };
  } catch (e) {
    return validateDataError("ERROR_GET_USER_IMAGE");
  }
};

/**
 *
 * @param id UserId for search image
 * @returns
 */
const getOneImageUrlByOfferId = async (id: string) => {
  try {
    const imageUrlByOfferId = await prisma.imageUrl.findFirst({
      where: {
        offerId: id,
      },
    });

    if (!imageUrlByOfferId) return validateDataError("NOT_OFFER_IMAGE_FOUND");

    return { status: "OK", errorMessage: null, data: imageUrlByOfferId };
  } catch (e) {
    return validateDataError("ERROR_GET_OFFER_IMAGE");
  }
};

/**
 *
 * @param id UserId for search image
 * @returns
 */
const getOneImageUrlByCategoryId = async (id: string) => {
  try {
    const imageUrlByCategoryId = await prisma.imageUrl.findFirst({
      where: {
        categoryId: id,
      },
    });

    if (!imageUrlByCategoryId)
      return validateDataError("NOT_CATEGORY_IMAGE_FOUND");

    return { status: "OK", errorMessage: null, data: imageUrlByCategoryId };
  } catch (e) {
    return validateDataError("ERROR_GET_CATEGORY__IMAGE");
  }
};

/**
 *
 * @param id UserId for search image
 * @returns
 */
const getOneImageUrlByBusinessId = async (id: string) => {
  try {
    const imageUrlByBusinessId = await prisma.imageUrl.findFirst({
      where: {
        businessId: id,
      },
    });

    if (!imageUrlByBusinessId)
      return validateDataError("NOT_BUSINESS_IMAGE_FOUND");

    return { status: "OK", errorMessage: null, data: imageUrlByBusinessId };
  } catch (e) {
    return validateDataError("ERROR_GET_BUSINESS__IMAGE");
  }
};

/**
 *
 * @param id ImageUrl ID to update
 * @param imageUrl ImageUrl url to update
 * @returns
 */
const updateOneImageUrl = async ({
  id,
  imageUrl,
  public_id,
  userId,
  offerId,
  categoryId,
  businessId,
}: ImageUrl) => {
  try {
    //Delete image on CLoudinary server
    const imageUrlToDeleteCloudinary = await deleteOneImageUrl(id);
    /* const imageUrlToDeleteCloudinary = await cloudinaryApi.v2.uploader.destroy(
      public_id
    ); */

    if (imageUrlToDeleteCloudinary.status !== "OK")
      return validateDataError(`${imageUrlToDeleteCloudinary.errorMessage}`);

    // Upload image to Cloudinary
    const imageUploaded = await cloudinaryApi.v2.uploader.upload(imageUrl);

    if (!imageUploaded)
      return validateDataError("ERROR_UPLOADING_IMAGE_TO_CLOUDINARY");

    const imageDataToAdd = await prisma.imageUrl.update({
      where: {
        id,
      },
      data: {
        imageUrl: imageUploaded.secure_url,
        public_id: imageUploaded.public_id,
        offerId,
        userId,
        categoryId,
        businessId,
      },
    });

    if (!imageDataToAdd)
      return validateDataError("ERROR_UPDATING_IMAGEURL_DATA");

    return {
      status: "OK",
      errorMessage: null,
      data: imageDataToAdd,
    };
  } catch (e) {
    console.log(e);

    return validateDataError("ERROR_GET_IMAGE");
  }
};

/**
 *
 * @param id imageUrl ID to delete
 * @returns
 */
const deleteOneImageUrl = async (id: string) => {
  try {
    const imageUrlToDelete = await prisma.imageUrl.delete({
      where: {
        id,
      },
    });

    const imageUrlToDeleteCloudinary = await cloudinaryApi.v2.uploader.destroy(
      imageUrlToDelete.public_id
    );

    if (!imageUrlToDelete || imageUrlToDelete === undefined)
      return validateDataError("IMAGE_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: imageUrlToDelete };
  } catch (e) {
    return validateDataError("ERROR_DELETING_IMAGE");
  }
};

export {
  addImageUrl,
  getAllImageUrl,
  getOneImageUrl,
  updateOneImageUrl,
  deleteOneImageUrl,
  getOneImageUrlByUserId,
  getOneImageUrlByOfferId,
  getOneImageUrlByCategoryId,
  getOneImageUrlByBusinessId,
};
