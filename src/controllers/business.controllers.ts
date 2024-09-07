import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import {
  addBusiness,
  deleteOneBusiness,
  getAllBusiness,
  getOneBusiness,
  updateOneBusiness,
} from "../services/business.services.js";
//import { SubCategory } from "@prisma/client";
import { Business } from "../interfaces/business.interface.js";
import { matchedData } from "express-validator";

/**
 *
 * @param req Request de la petición de todos los Business
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de los Business
 */
const getBusiness = async (req: Request, res: Response) => {
  try {
    const getAllBusinesss = await getAllBusiness();

    if (getAllBusinesss.status !== "OK") {
      handleHttpError(res, `${getAllBusinesss.errorMessage}`);
    } else {
      res.send(getAllBusinesss);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_BUSINESS");
  }
};

/**
 *
 * @param param0 Params con el id de la Business a buscar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un Business
 */
const getOnlyOneBusiness = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const business = await getOneBusiness(id);

    if (business.status !== "OK")
      handleHttpError(res, `${business.errorMessage}`, 400);
    else res.send(business);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_SUB_BUSINESS");
  }
};

/**
 *
 * @param req Request para la petición de adicionar Business
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un Business añadido
 */
const postBusiness = async (req: Request, res: Response) => {
  try {
    const body: Business = matchedData(req);
    const {
      name,
      email,
      phone,
      web,
      description,
      address,
      categoriesIds,
    }: Business = body;
    const businessToAdd = await addBusiness({
      name,
      email,
      phone,
      web,
      description,
      address,
      categoriesIds,
    });

    if (businessToAdd.status !== "OK") {
      handleHttpError(res, `${businessToAdd.errorMessage}`, 400);
    } else {
      res.status(201).send({
        status: "OK",
        message: "El business ha sido insertado correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_BUSINESS");
  }
};

/**
 *
 * @param param0 Datos correspondientes al Business a actualizar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un Business actualizado
 */
const updateBusiness = async (req: Request, res: Response) => {
  try {
    const body: Business = matchedData(req);
    const { id } = req.params;
    const { name, email, phone, web, description, address, categoriesIds } =
      body;
    let phoneToNumber = undefined;

    if (phone) {
      phoneToNumber = Number(phone);
    }

    const businessToUpdate = await updateOneBusiness({
      id,
      name,
      email,
      phone: phoneToNumber,
      web,
      description,
      address,
      categoriesIds,
    });

    if (businessToUpdate.status !== "OK")
      return handleHttpError(res, `${businessToUpdate.errorMessage}`, 400);

    res.send({
      status: "OK",
      message: "El business ha sido actualizado correctamente",
      data: businessToUpdate.data,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_BUSINESS");
  }
};

/**
 *
 * @param param0 Datos correspondientes al Business a eliminar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un Business eliminado
 */
const deleteBusiness = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const businessToDelete = await deleteOneBusiness(id);

    if (businessToDelete.status !== "OK")
      handleHttpError(res, `${businessToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "El Business ha sido eliminado Correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_BUSINESS");
  }
};

export {
  getBusiness,
  getOnlyOneBusiness,
  postBusiness,
  updateBusiness,
  deleteBusiness,
};
