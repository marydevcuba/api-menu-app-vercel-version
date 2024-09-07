import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import { matchedData } from "express-validator";
import { Review } from "../interfaces/review.interface.js";
import {
  addReview,
  deleteOneReview,
  getAllReviews,
  getOneReview,
  updateOneReview,
} from "../services/review.services.js";

/**
 *
 * @param req
 * @param res
 */
const getReview = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const review = await getOneReview(id);

    if (review.status !== "OK")
      handleHttpError(res, `${review.errorMessage}`, 400);
    else res.send(review);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_REVIEW");
  }
};

/**
 *
 * @param req
 * @param res
 */
const getReviews = async (req: Request, res: Response) => {
  try {
    const getAlladdReviews = await getAllReviews();

    if (getAlladdReviews.status !== "OK") {
      handleHttpError(res, `${getAlladdReviews.errorMessage}`);
    } else {
      res.send(getAlladdReviews);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_REVIEWS");
  }
};

/**
 *
 * @param req
 * @param res
 */
const postReview = async (req: Request, res: Response) => {
  try {
    const body: Review = matchedData(req);
    const { description, userId, businessId, offerId }: Review = body;

    const reviewToAdd = await addReview({
      description,
      userId,
      businessId,
      offerId,
    });

    if (reviewToAdd.status !== "OK") {
      handleHttpError(res, `${reviewToAdd.errorMessage}`, 400);
    } else {
      res.status(201).send({
        status: "OK",
        message: "La review ha sido insertada correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_POST_REVIEW");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const updateReview = async ({ params, body }: Request, res: Response) => {
  try {
    const bodyReview: Review = matchedData(body);
    const { id } = params;
    const { description, userId, businessId, offerId }: Review = bodyReview;

    if (
      description === undefined &&
      userId === undefined &&
      businessId === undefined &&
      offerId === undefined
    ) {
      handleHttpError(res, "EMPTY_DATA_FIELDS", 400);
    } else {
      const reviewToUpdate = await updateOneReview({
        id,
        description,
        userId,
        businessId,
        offerId,
      });
      if (reviewToUpdate.status !== "OK")
        handleHttpError(res, `${reviewToUpdate.errorMessage}`, 400);
      else {
        res.send({
          status: "OK",
          message: "La review ha sido actualizado correctamente",
          data: reviewToUpdate.data,
        });
      }
    }
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_REVIEW");
  }
};

/**
 *
 * @param param0
 * @param res
 */
const deleteReview = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const reviewToDelete = await deleteOneReview(id);

    if (reviewToDelete.status !== "OK")
      handleHttpError(res, `${reviewToDelete.errorMessage}`, 400);
    else {
      res.send({
        status: "OK",
        message: "La review ha sido eliminado correctamente",
      });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_REVIEW");
  }
};

export { getReview, getReviews, postReview, updateReview, deleteReview };
