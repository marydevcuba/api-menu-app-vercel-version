import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import {
  addCategory,
  deleteCategories,
  deleteOneCategory,
  getAllCategories,
  getOneCategory,
  updateOneCategory,
} from "../services/category.services.js";
import { addImageUrl } from "../services/imageUrl.services.js";
import { matchedData } from "express-validator";
import {
  CategoriesIdArray,
  Category,
} from "../interfaces/category.interface.js";

const getCategory = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const data = await getOneCategory(id);

    if (data.status !== "OK") handleHttpError(res, "CATEGORY_NOT_FOUND", 404);
    else res.send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_CATEGORY");
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await getAllCategories();

    if (allCategories.status !== "OK")
      handleHttpError(res, "ERROR_GET_CATEGORIES", 500);
    else res.send(allCategories);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CATEGORIES");
  }
};

const postCategory = async (req: Request, res: Response) => {
  try {
    const body: Category = matchedData(req);

    const categoryToAdd = await addCategory(body);

    if (categoryToAdd.status !== "OK")
      return handleHttpError(res, `${categoryToAdd.errorMessage}`, 400);
    else {
      res.status(201).send({
        status: "OK",
        message: "La categoria ha sido insertada correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_CATEGORY");
  }
};

const updateCategory = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const { name, description } = body;
    if (name === undefined && description === undefined)
      handleHttpError(res, "EMPTY_DATA", 400);
    else {
      const categoryToUpdate = await updateOneCategory(id, name, description);

      if (categoryToUpdate.status !== "OK")
        handleHttpError(res, `${categoryToUpdate.errorMessage}`, 400);
      else {
        res.send({
          status: "OK",
          message: "La categoria ha sido actualizada correctamente",
        });
      }
    }
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_CATEGORY");
  }
};

const deleteCategory = async ({ params }: Request, res: Response) => {
  try {
    //throw new Error();
    const { id } = params;
    const categoryToDelete = await deleteOneCategory(id);

    if (categoryToDelete.status !== "OK")
      handleHttpError(res, `${categoryToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "La Categoria ha sido eliminada Correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETING_CATEGORY");
  }
};

const deleteManyCategories = async (req: Request, res: Response) => {
  try {
    const body: CategoriesIdArray = matchedData(req);
    const arrayIdCategories = body;
    const categoryToDelete = await deleteCategories(arrayIdCategories.arrayIds);

    if (categoryToDelete.status !== "OK")
      handleHttpError(res, `${categoryToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "Las Categorias ha sido eliminadas correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETING_CATEGORY");
  }
};

export {
  getCategory,
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
  deleteManyCategories,
};
