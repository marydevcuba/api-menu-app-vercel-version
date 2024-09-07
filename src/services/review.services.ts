import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.client.js";
import { validateDataError } from "../utils/error.handle.js";
import { Review } from "../interfaces/review.interface.js";

const addReview = async ({
  description,
  userId,
  businessId,
  offerId,
}: Review) => {
  try {
    if (!description) return validateDataError("DESCRIPTION_REQUERID");

    if (!userId) return validateDataError("USERID_IS_REQUIRED");

    if (!businessId && !offerId)
      return validateDataError("BUSINESSID_AND_OFFERID_ARE_REQUIRED");

    const searchForOtherReview = await prisma.review.findFirst({
      where: {
        userId,
        OR: [
          {
            businessId,
          },
          {
            offerId,
          },
        ],
      },
    });

    if (searchForOtherReview)
      return validateDataError(
        "REVIEW_WITH_THIS_USERID_AND_BUSINESSID/OFFERID_ALREADY_EXISTS"
      );

    const reviewToAdd = await prisma.review.create({
      data: {
        description,
        userId,
        businessId,
        offerId,
      },
    });

    return { status: "OK", errorMessage: null, data: reviewToAdd };
  } catch (error) {
    return validateDataError("ERROR_ADD_REVIEW");
  }
};

const getOneReview = async (id: string) => {
  try {
    if (!id) return validateDataError("ID_IS_REQUIRED");

    const reviewToFind = await prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!reviewToFind) return validateDataError("REVIEW_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: reviewToFind };
  } catch (e) {
    return validateDataError("ERROR_GET_REVIEW");
  }
};

/**
 *
 * @returns All Reviews
 */
const getAllReviews = async () => {
  try {
    const reviews = await prisma.review.findMany();

    return { status: "OK", errorMessage: null, data: reviews };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GETING_REVIEWS");
  }
};

/**
 *
 * @param id ID del Review a Actualizar
 * @param name Name del Review a Actualizar
 * @param price Price del Review a Actualizar
 * @param code Code del Review a Actualizar
 * @param description Description del Review a Actualizar
 * @returns Datos del Review actualizado
 */
const updateOneReview = async ({
  id,
  description,
  userId,
  businessId,
  offerId,
}: Review) => {
  try {
    const review = await prisma.review.update({
      where: {
        id,
      },
      data: {
        description,
        userId,
        businessId,
        offerId,
      },
    });

    if (!review) return validateDataError("REVIEW_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: { review },
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_UPDATING_REVIEW");
  }
};

const deleteOneReview = async (id: string) => {
  try {
    const reviewToDelete = await prisma.review.delete({
      where: {
        id,
      },
    });

    if (!reviewToDelete || reviewToDelete === undefined)
      return validateDataError("REVIEW_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: reviewToDelete };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_DELETING_REVIEW");
  }
};

export {
  addReview,
  getOneReview,
  getAllReviews,
  updateOneReview,
  deleteOneReview,
};
