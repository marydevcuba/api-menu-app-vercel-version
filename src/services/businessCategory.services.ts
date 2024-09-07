import { Prisma } from "@prisma/client";
import { validateDataError } from "../utils/error.handle.js";
import { prisma } from "../utils/prisma.client.js";
import {
  BusinessCategory,
  BusinessCategoryToAdd,
} from "../interfaces/businessCategory.interface.js";
/**
 *
 * @param param0 Name and Description from BusinessCategory to add
 * @returns
 */
const addBusinessCategory = async ({
  businessId,
  categoryId,
}: BusinessCategoryToAdd) => {
  try {
    if (!businessId && !categoryId)
      return validateDataError("BUSINESSID_AND_CATEGORYID_ARE_REQUIRED");

    if (categoryId && categoryId) {
    }

    const businessCategoryToAdd = await prisma.businessCategory.create({
      data: {
        businessId,
        categoryId,
      },
    });

    return { status: "OK", errorMessage: null, data: businessCategoryToAdd };
  } catch (e) {
    return validateDataError("ERROR_ADD_BUSINESSCATEGORY");
  }
};

/**
 *
 * @returns All BusinessCategory
 */
const getAllBusinessCategory = async () => {
  try {
    const businessCategory = await prisma.businessCategory.findMany();

    return { status: "OK", errorMessage: null, data: businessCategory };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GET_BUSINESSCATEGORY");
  }
};

/**
 *
 * @param id BusinessCategory ID to find
 * @returns
 */
const getOneBusinessCategory = async (id: string) => {
  try {
    const businessCategory = await prisma.businessCategory.findFirst({
      where: {
        id,
      },
    });

    if (!businessCategory)
      return validateDataError("BUSINESSCATEGORY_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: businessCategory };
  } catch (e) {
    return validateDataError("ERROR_GET_BUSINESSCATEGORY");
  }
};

/**
 *
 * @param id BusinessCategory ID to update
 * @param name BusinessCategory name to update
 * @param description BusinessCategory description to update
 * @returns
 */
const updateOneBusinessCategory = async ({
  id,
  businessId,
  categoryId,
}: BusinessCategory) => {
  try {
    const businessCategory = await prisma.businessCategory.update({
      where: {
        id,
      },
      data: {
        businessId,
        categoryId,
      },
    });

    if (!businessCategory)
      return validateDataError("BUSINESSCATEGORY_NOT_FOUND");

    return {
      status: "OK",
      errorMessage: null,
      data: {
        businessId,
        categoryId,
      },
    };
  } catch (e) {
    console.log(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`BusinessCategory to update does not exist.`);
    }
    return validateDataError("ERROR_UPDATING_BUSINESSCATEGORY");
  }
};

/**
 *
 * @param id BusinessCategory ID to delete
 * @returns
 */
const deleteOneBusinessCategory = async (id: string) => {
  try {
    const businessCategoryToDelete = await prisma.businessCategory.delete({
      where: {
        id,
      },
    });

    if (!businessCategoryToDelete || businessCategoryToDelete === undefined)
      return validateDataError("BUSINESS_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: businessCategoryToDelete };
  } catch (e) {
    return validateDataError("ERROR_DELETING_BUSINESSCATEGORY");
  }
};

export {
  addBusinessCategory,
  getAllBusinessCategory,
  getOneBusinessCategory,
  updateOneBusinessCategory,
  deleteOneBusinessCategory,
};
