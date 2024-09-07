import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.client.js";
import { validateDataError } from "../utils/error.handle.js";

const addOffer = async (
  name: string,
  price: number,
  businessId: string,
  code?: string,
  description?: string,
  ingredients?: string
) => {
  try {
    if (!name || !price || !businessId)
      return validateDataError("ERROR_DATA_OFFER");

    const offerToAdd = await prisma.offer.create({
      data: {
        name,
        price,
        code,
        description,
        ingredients,
        businessId,
      },
    });

    return { status: "OK", errorMessage: null, data: offerToAdd };
  } catch (error) {
    return validateDataError("ERROR_ADD_OFFER");
  }
};

const getOneOffer = async (id: string) => {
  try {
    if (!id) return validateDataError("ID_IS_REQUIRED");

    const offerToFind = await prisma.offer.findUnique({
      where: {
        id,
      },
      include: {
        offerImage: true,
        stars: true,
        review: true,
        offerCategory: true,
      },
    });

    if (!offerToFind) return validateDataError("OFFER_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: offerToFind };
  } catch (e) {
    return validateDataError("ERROR_GET_OFFER");
  }
};

/**
 *
 * @returns All Offers
 */
const getAllOffers = async () => {
  try {
    const offers = await prisma.offer.findMany({
      include: {
        offerImage: true,
        stars: true,
        review: true,
        offerCategory: true,
      },
    });

    return { status: "OK", errorMessage: null, data: offers };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GETING_OFFERS");
  }
};

/**
 *
 * @param id ID del Offer a Actualizar
 * @param name Name del Offer a Actualizar
 * @param price Price del Offer a Actualizar
 * @param code Code del Offer a Actualizar
 * @param description Description del Offer a Actualizar
 * @returns Datos del Offer actualizado
 */
const updateOneOffer = async (
  id: string,
  name?: string,
  price?: number,
  code?: string,
  description?: string,
  ingredients?: string
) => {
  try {
    const offer = await prisma.offer.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        code,
        description,
        ingredients,
      },
    });

    if (!offer) return validateDataError("OFFER_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: { offer },
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_UPDATING_OFFER");
  }
};

const deleteOneOffer = async (id: string) => {
  try {
    const offerToDelete = await prisma.offer.delete({
      where: {
        id,
      },
    });

    if (!offerToDelete || offerToDelete === undefined)
      return validateDataError("OFFER_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: offerToDelete };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Record to update does not exist.`);
    }
    return validateDataError("ERROR_DELETING_OFFER");
  }
};

export { addOffer, getOneOffer, getAllOffers, updateOneOffer, deleteOneOffer };
