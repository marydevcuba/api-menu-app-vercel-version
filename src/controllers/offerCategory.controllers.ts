import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import { matchedData } from "express-validator";
import {
  OfferCategory,
  OfferCategoryToAdd,
} from "../interfaces/offerCategory.interface.js";
import {
  addOfferCategory,
  deleteOneOfferCategory,
  getAllOffersCategories,
  getOneOfferCategory,
  updateOneOfferCategory,
} from "../services/offerCategory.services.js";

/**
 *
 * @param req
 * @param res
 */
const getOfferCategory = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const offerCategory = await getOneOfferCategory(id);

    if (offerCategory.status !== "OK")
      handleHttpError(res, `${offerCategory.errorMessage}`, 400);
    else res.send(offerCategory);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_OFFERCATEGORY");
  }
};

/**
 *
 * @param req
 * @param res
 */
const getOffersCategories = async (req: Request, res: Response) => {
  try {
    const getAlladdOffersCategories = await getAllOffersCategories();

    if (getAlladdOffersCategories.status !== "OK") {
      handleHttpError(res, `${getAlladdOffersCategories.errorMessage}`);
    } else {
      res.send(getAlladdOffersCategories);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_OFFERSCATEGORIES");
  }
};

/**
 *
 * @param req
 * @param res
 */
const postOfferCategory = async (req: Request, res: Response) => {
  try {
    const body: OfferCategoryToAdd = matchedData(req);
    const { offerId, categoryId }: OfferCategoryToAdd = body;

    const offerCategoryToAdd = await addOfferCategory({ offerId, categoryId });

    if (offerCategoryToAdd.status !== "OK") {
      handleHttpError(res, `${offerCategoryToAdd.errorMessage}`, 400);
    } else {
      res.status(201).send({
        status: "OK",
        message: "La oferta ha sido insertada correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_OFFERCATEGORY");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const updateOfferCategory = async (
  { params, body }: Request,
  res: Response
) => {
  try {
    const bodyOfferCategory: OfferCategory = matchedData(body);
    const { id } = params;
    const { offerId, categoryId }: OfferCategory = bodyOfferCategory;

    if (!offerId && !categoryId) {
      handleHttpError(res, "OFFERID_AND_CATEGORYID_ARE_REQUIRED", 400);
    } else {
      const offerCategoryToUpdate = await updateOneOfferCategory({
        id,
        offerId,
        categoryId,
      });
      if (offerCategoryToUpdate.status !== "OK")
        handleHttpError(res, `${offerCategoryToUpdate.errorMessage}`, 400);
      else {
        res.send({
          status: "OK",
          message: "La oferta ha sido actualizado correctamente",
          data: offerCategoryToUpdate.data,
        });
      }
    }
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_OFFERCATEGORY");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const deleteOfferCategory = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const offerCategoryToDelete = await deleteOneOfferCategory(id);

    if (offerCategoryToDelete.status !== "OK")
      handleHttpError(res, `${offerCategoryToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "La offerCategory ha sido eliminado correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_OFFERCATEGORY");
  }
};

export {
  getOfferCategory,
  getOffersCategories,
  postOfferCategory,
  updateOfferCategory,
  deleteOfferCategory,
};
