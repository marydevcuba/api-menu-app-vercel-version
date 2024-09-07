import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import {
  addOffer,
  deleteOneOffer,
  getAllOffers,
  getOneOffer,
  updateOneOffer,
} from "../services/offer.services.js";
import { Offer } from "../interfaces/offer.interface.js";
import { matchedData } from "express-validator";

/**
 *
 * @param req
 * @param res
 */
const getOffer = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const offer = await getOneOffer(id);

    if (offer.status !== "OK")
      handleHttpError(res, `${offer.errorMessage}`, 400);
    else res.send(offer);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_OFFER");
  }
};

/**
 *
 * @param req
 * @param res
 */
const getOffers = async (req: Request, res: Response) => {
  try {
    const getAlladdOffers = await getAllOffers();

    if (getAlladdOffers.status !== "OK") {
      handleHttpError(res, `${getAlladdOffers.errorMessage}`);
    } else {
      res.send(getAlladdOffers);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_OFFERS");
  }
};

/**
 *
 * @param req
 * @param res
 */
const postOffer = async (req: Request, res: Response) => {
  try {
    const body: Offer = matchedData(req);
    const { name, price, code, description, ingredients, businessId }: Offer =
      body;

    const offerToAdd = await addOffer(
      name,
      price,
      businessId,
      code,
      ingredients,
      description
    );

    if (offerToAdd.status !== "OK") {
      handleHttpError(res, `${offerToAdd.errorMessage}`, 400);
    } else {
      res.status(201).send({
        status: "OK",
        message: "La oferta ha sido insertada correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_OFFER");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const updateOffer = async ({ params, body }: Request, res: Response) => {
  try {
    const bodyOffer: Offer = matchedData(body);
    const { id } = params;
    const { name, description, code, price, businessId, ingredients }: Offer =
      bodyOffer;

    if (
      name === undefined &&
      description === undefined &&
      code === undefined &&
      price === undefined &&
      ingredients === undefined &&
      businessId === undefined
    ) {
      handleHttpError(res, "EMPTY_DATA_FIELDS", 400);
    } else {
      const offerToUpdate = await updateOneOffer(
        id,
        name,
        price,
        code,
        description,
        ingredients
      );
      if (offerToUpdate.status !== "OK")
        handleHttpError(res, `${offerToUpdate.errorMessage}`, 400);
      else {
        res.send({
          status: "OK",
          message: "La oferta ha sido actualizado correctamente",
          data: offerToUpdate.data,
        });
      }
    }
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_OFFER");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const deleteOffer = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const offerToDelete = await deleteOneOffer(id);

    if (offerToDelete.status !== "OK")
      handleHttpError(res, `${offerToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "La oferta ha sido eliminado correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_OFFER");
  }
};

export { getOffer, getOffers, postOffer, updateOffer, deleteOffer };
