import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import { matchedData } from "express-validator";
import { Star } from "../interfaces/star.interface.js";
import {
  addStar,
  deleteOneStar,
  getAllStars,
  getOneStar,
  updateOneStar,
} from "../services/star.services.js";

/**
 *
 * @param req
 * @param res
 */
const getStar = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const star = await getOneStar(id);

    if (star.status !== "OK") handleHttpError(res, `${star.errorMessage}`, 400);
    else res.send(star);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_STAR");
  }
};

/**
 *
 * @param req
 * @param res
 */
const getStars = async (req: Request, res: Response) => {
  try {
    const getAlladdStars = await getAllStars();

    if (getAlladdStars.status !== "OK") {
      handleHttpError(res, `${getAlladdStars.errorMessage}`);
    } else {
      res.send(getAlladdStars);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_STARS");
  }
};

/**
 *
 * @param req
 * @param res
 */
const postStar = async (req: Request, res: Response) => {
  try {
    const body: Star = matchedData(req);
    const { valoration, userId, businessId, offerId, reviewId }: Star = body;

    const starToAdd = await addStar({
      valoration,
      userId,
      businessId,
      offerId,
      reviewId,
    });

    if (starToAdd.status !== "OK") {
      handleHttpError(res, `${starToAdd.errorMessage}`, 400);
    } else {
      res.status(201).send({
        status: "OK",
        message: "La valoracion ha sido insertada correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_VALORATION");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const updateStar = async ({ params, body }: Request, res: Response) => {
  try {
    const bodyStar: Star = matchedData(body);
    const { id } = params;
    const { valoration }: Star = bodyStar;

    if (valoration === undefined) {
      handleHttpError(res, "VALORATION_REQUIRED", 400);
    } else {
      const starToUpdate = await updateOneStar({
        id,
        valoration,
      });
      if (starToUpdate.status !== "OK")
        handleHttpError(res, `${starToUpdate.errorMessage}`, 400);
      else {
        res.send({
          status: "OK",
          message: "La valoracion ha sido actualizado correctamente",
          data: starToUpdate.data,
        });
      }
    }
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_VALORATION");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const deleteStar = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const starToDelete = await deleteOneStar(id);

    if (starToDelete.status !== "OK")
      handleHttpError(res, `${starToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "La valoracion ha sido eliminado correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_VALORATION");
  }
};

export { getStar, getStars, postStar, updateStar, deleteStar };
