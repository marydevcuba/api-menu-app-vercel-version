import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.client.js";
import { validateDataError } from "../utils/error.handle.js";
import { Star, StarToUpdate } from "../interfaces/star.interface.js";

const addStar = async ({
  valoration,
  userId,
  businessId,
  offerId,
  reviewId,
}: Star) => {
  try {
    if (!valoration) return validateDataError("DESCRIPTION_REQUERID");
    if (!userId) return validateDataError("DESCRIPTION_REQUERID");
    if (!reviewId) return validateDataError("DESCRIPTION_REQUERID");

    if (!businessId && !offerId)
      return validateDataError("NEED_BUSINESSID_OR_OFFERID");

    const starToAdd = await prisma.stars.create({
      data: {
        valoration,
        userId,
        businessId,
        offerId,
        reviewId,
      },
    });

    return { status: "OK", errorMessage: null, data: starToAdd };
  } catch (error) {
    return validateDataError("ERROR_ADD_VALORATION");
  }
};

const getOneStar = async (id: string) => {
  try {
    if (!id) return validateDataError("ID_IS_REQUIRED");

    const starToFind = await prisma.stars.findUnique({
      where: {
        id,
      },
    });

    if (!starToFind) return validateDataError("VALORATION_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: starToFind };
  } catch (e) {
    return validateDataError("ERROR_GET_VALORATION");
  }
};

/**
 *
 * @returns All Valorations
 */
const getAllStars = async () => {
  try {
    const stars = await prisma.stars.findMany();

    return { status: "OK", errorMessage: null, data: stars };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GETING_VALORATIONS");
  }
};

/**
 *
 * @param id ID de la Valoracions a Actualizar
 * @param name Name del Valoracion a Actualizar
 * @param price Price del Valoracion a Actualizar
 * @param code Code del Valoracion a Actualizar
 * @param description Description del Valoracion a Actualizar
 * @returns Datos del Valoracion actualizado
 */
const updateOneStar = async ({ id, valoration }: StarToUpdate) => {
  try {
    const star = await prisma.stars.update({
      where: {
        id,
      },
      data: {
        valoration,
      },
    });

    if (!star) return validateDataError("VALORATION_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: { star },
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_UPDATING_VALORATION");
  }
};

const deleteOneStar = async (id: string) => {
  try {
    const starToDelete = await prisma.stars.delete({
      where: {
        id,
      },
    });

    if (!starToDelete || starToDelete === undefined)
      return validateDataError("VALORATION_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: starToDelete };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_DELETING_VALORATION");
  }
};

export { addStar, getOneStar, getAllStars, updateOneStar, deleteOneStar };
