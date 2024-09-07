import { Prisma } from "@prisma/client";
import { validateDataError } from "../utils/error.handle.js";
import { prisma } from "../utils/prisma.client.js";
import { Business } from "../interfaces/business.interface.js";
import { getOneCategory } from "./category.services.js";

/**
 *
 * @param param0 Name and Description from Business to add
 * @returns
 */
const addBusiness = async ({
  name,
  email,
  phone,
  web,
  description,
  address,
  categoriesIds,
}: Business) => {
  try {
    if (!name) return validateDataError("ERROR_DATA_BUSINESS");
    if (!categoriesIds) {
      categoriesIds = [];
    }

    if (categoriesIds.length > 0) {
      let exist = {};
      categoriesIds.forEach(async (element) => {
        exist = await getOneCategory(element);
        if (exist !== "OK") {
          return validateDataError(`ID_CATEGORY_FOR_BUSINESS_NOT_FOUND`);
        }
      });
    }

    const businessToAdd = await prisma.business.create({
      data: {
        name,
        email,
        phone,
        web,
        description: description || "",
        address,
      },
    });

    if (categoriesIds.length > 0) {
      categoriesIds.forEach(async (element) => {
        await prisma.businessCategory.create({
          data: {
            businessId: businessToAdd.id,
            categoryId: element,
          },
        });
      });
    }

    return { status: "OK", errorMessage: null, data: businessToAdd };
  } catch (e) {
    return validateDataError("ERROR_ADD_BUSINESS");
  }
};

/**
 *
 * @returns All Business
 */
const getAllBusiness = async () => {
  try {
    const business = await prisma.business.findMany({
      include: {
        businessImage: true,
        offer: {
          include: {
            offerImage: true,
          },
        },
        review: true,
        stars: true,
        propietario: true,
        businessCategory: true,
      },
    });

    return { status: "OK", errorMessage: null, data: business };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return validateDataError(`${e.message}`);
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return validateDataError(`ERROR_DATABASE_CONNECTION`);
    }
    return validateDataError("ERROR_GET_BUSINESS");
  }
};

/**
 *
 * @param id Business ID to find
 * @returns
 */
const getOneBusiness = async (id: string) => {
  try {
    const business = await prisma.business.findFirst({
      where: {
        id,
      },
      include: {
        businessImage: true,
        offer: true,
        review: true,
        stars: true,
        propietario: true,
        businessCategory: true,
      },
    });

    if (!business) return validateDataError("BUSINESS_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: business };
  } catch (e) {
    return validateDataError("ERROR_GET_BUSINESS");
  }
};

/**
 *
 * @param id Business ID to update
 * @param name Business name to update
 * @param description Business description to update
 * @returns
 */
const updateOneBusiness = async ({
  id,
  name,
  email,
  phone,
  web,
  description,
  address,
  categoriesIds,
}: Business) => {
  try {
    const business = await prisma.business.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        web,
        description,
        address,
      },
    });

    if (!business) return validateDataError("BUSINESS_NOT_FOUND");

    if (categoriesIds) {
      if (categoriesIds.length > 0) {
        await prisma.businessCategory.deleteMany({
          where: {
            id: business.id,
          },
        });
        categoriesIds.forEach(async (element) => {
          await prisma.businessCategory.create({
            data: {
              businessId: business.id,
              categoryId: element,
            },
          });
        });
      }
    }

    return {
      status: "OK",
      errorMessage: null,
      data: {
        name: business.name,
        email: business.email,
        phone: business.phone,
        web: business.web,
        description: business.description,
        address: business.address,
      },
    };
  } catch (e) {
    console.log(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return validateDataError(`Business to update does not exist.`);
    }
    return validateDataError("ERROR_UPDATING_BUSINESS");
  }
};

/**
 *
 * @param id Business ID to delete
 * @returns
 */
const deleteOneBusiness = async (id: string) => {
  try {
    const businessToDelete = await prisma.business.delete({
      where: {
        id,
      },
    });

    if (!businessToDelete || businessToDelete === undefined)
      return validateDataError("BUSINESS_NOT_FOUND");

    return { status: "OK", errorMessage: null, data: businessToDelete };
  } catch (e) {
    return validateDataError("ERROR_DELETING_BUSINESS");
  }
};

export {
  addBusiness,
  getAllBusiness,
  getOneBusiness,
  updateOneBusiness,
  deleteOneBusiness,
};
