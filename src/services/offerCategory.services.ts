import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.client.js";
import { validateDataError } from "../utils/error.handle.js";
import {
  OfferCategory,
  OfferCategoryToAdd,
} from "../interfaces/offerCategory.interface.js";

const addOfferCategory = async ({
  offerId,
  categoryId,
}: OfferCategoryToAdd) => {
  try {
    if (!offerId || !categoryId)
      return validateDataError("OFFERID_AND_CATEGORYID_ARE_REQUIRED");

    const offerCategoryToAdd = await prisma.offerCategory.create({
      data: {
        offerId,
        categoryId,
      },
    });

    return { status: "OK", errorMessage: null, data: offerCategoryToAdd };
  } catch (error) {
    return validateDataError("ERROR_ADD_OFFERCATEGORY");
  }
};

const getOneOfferCategory = async (id: string) => {
  try {
    const offerCategoryToFind = await prisma.offerCategory.findUnique({
      where: {
        id,
      },
    });

    if (!offerCategoryToFind)
      return validateDataError("OFFERCATEGORY_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: offerCategoryToFind };
  } catch (e) {
    return validateDataError("ERROR_GET_OFFERCATEGORY");
  }
};

/**
 *
 * @returns All OffersCategories
 */
const getAllOffersCategories = async () => {
  try {
    const offersCategories = await prisma.offerCategory.findMany();

    return { status: "OK", errorMessage: null, data: offersCategories };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GETING_OFFERSCATEGORIES");
  }
};

/**
 *
 * @param id ID del OfferCategory a Actualizar
 * @param name Name del OfferCategory a Actualizar
 * @param price Price del OfferCategory a Actualizar
 * @param code Code del OfferCategory a Actualizar
 * @param description Description del OfferCategory a Actualizar
 * @returns Datos del OfferCategory actualizado
 */
const updateOneOfferCategory = async ({
  id,
  offerId,
  categoryId,
}: OfferCategory) => {
  try {
    const offerCategory = await prisma.offerCategory.update({
      where: {
        id,
      },
      data: {
        offerId,
        categoryId,
      },
    });

    if (!offerCategory) return validateDataError("OFFERCATEGORY_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: { offerCategory },
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_UPDATING_OFFERCATEGORY");
  }
};

const deleteOneOfferCategory = async (id: string) => {
  try {
    const offerCategoryToDelete = await prisma.offerCategory.delete({
      where: {
        id,
      },
    });

    if (!offerCategoryToDelete || offerCategoryToDelete === undefined)
      return validateDataError("OFFER_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: offerCategoryToDelete };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_DELETING_OFFERCATEGORY");
  }
};

export {
  addOfferCategory,
  getOneOfferCategory,
  getAllOffersCategories,
  updateOneOfferCategory,
  deleteOneOfferCategory,
};
