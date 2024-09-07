import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import { matchedData } from "express-validator";
import {
  BusinessCategory,
  BusinessCategoryToAdd,
} from "../interfaces/businessCategory.interface.js";
import {
  addBusinessCategory,
  deleteOneBusinessCategory,
  getAllBusinessCategory,
  getOneBusinessCategory,
  updateOneBusinessCategory,
} from "../services/businessCategory.services.js";

/**
 *
 * @param req Request de la petición de todos los BusinessCategory
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de los BusinessCategory
 */
const getBusinessCategories = async (req: Request, res: Response) => {
  try {
    const getAllBusinesssCategory = await getAllBusinessCategory();

    if (getAllBusinesssCategory.status !== "OK") {
      handleHttpError(res, `${getAllBusinesssCategory.errorMessage}`);
    } else {
      res.send(getAllBusinesssCategory);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_BUSINESSCATEGORY");
  }
};

/**
 *
 * @param param0 Params con el id de la BusinessCategory a buscar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un BusinessCategory
 */
const getOnlyOneBusinessCategory = async (
  { params }: Request,
  res: Response
) => {
  try {
    const { id } = params;

    const businessCategory = await getOneBusinessCategory(id);

    if (businessCategory.status !== "OK")
      handleHttpError(res, `${businessCategory.errorMessage}`, 400);
    else res.send(businessCategory);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_SUB_BUSINESSCATEGORY");
  }
};

/**
 *
 * @param req Request para la petición de adicionar BusinessCategory
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un BusinessCategory añadido
 */
const postBusinessCategory = async (req: Request, res: Response) => {
  try {
    const body: BusinessCategoryToAdd = matchedData(req);
    const { businessId, categoryId }: BusinessCategoryToAdd = body;
    const businessCategoryToAdd = await addBusinessCategory({
      businessId,
      categoryId,
    });

    if (businessCategoryToAdd.status !== "OK") {
      handleHttpError(res, `${businessCategoryToAdd.errorMessage}`, 400);
    } else {
      res.status(201).send({
        status: "OK",
        message: "La businessCategory ha sido insertado correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_BUSINESSCATEGORY");
  }
};

/**
 *
 * @param param0 Datos correspondientes al BusinessCategory a actualizar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un BusinessCategory actualizado
 */
const updateBusinessCategory = async (req: Request, res: Response) => {
  try {
    const body: BusinessCategory = matchedData(req);
    const { id } = req.params;
    const { businessId, categoryId } = body;
    let phoneToNumber = undefined;

    const businessCategoryToUpdate = await updateOneBusinessCategory({
      id,
      businessId,
      categoryId,
    });

    if (businessCategoryToUpdate.status !== "OK")
      return handleHttpError(
        res,
        `${businessCategoryToUpdate.errorMessage}`,
        400
      );

    res.send({
      status: "OK",
      message: "La businessCategory ha sido actualizado correctamente",
      data: businessCategoryToUpdate.data,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_BUSINESSCATEGORY");
  }
};

/**
 *
 * @param param0 Datos correspondientes al BusinessCategory a eliminar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un BusinessCategory eliminado
 */
const deleteBusinessCategory = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const businessCategoryToDelete = await deleteOneBusinessCategory(id);

    if (businessCategoryToDelete.status !== "OK")
      handleHttpError(res, `${businessCategoryToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "La BusinessCategory ha sido eliminado Correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_BUSINESSCATEGORY");
  }
};

export {
  getBusinessCategories,
  getOnlyOneBusinessCategory,
  postBusinessCategory,
  updateBusinessCategory,
  deleteBusinessCategory,
};
