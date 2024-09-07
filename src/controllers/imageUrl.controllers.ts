import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import { cloudinaryApi } from "../utils/cloudinary.handle.js";
import {
  addImageUrl,
  deleteOneImageUrl,
  getAllImageUrl,
  getOneImageUrl,
  getOneImageUrlByBusinessId,
  getOneImageUrlByCategoryId,
  getOneImageUrlByOfferId,
  getOneImageUrlByUserId,
  updateOneImageUrl,
} from "../services/imageUrl.services.js";
import { ImageUrl } from "../interfaces/imageUrl.interfaces.js";
import { matchedData } from "express-validator";
import { prisma } from "../utils/prisma.client.js";

/**
 * Devolvera la URL de la imagen dependiendo del Id
 * @param req
 * @param res
 */
const getImageUrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const imageUrl = await getOneImageUrl(id);
    res.send(imageUrl);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGE");
  }
};

/**
 * Devolvera la URL de la imagen dependiendo del Id
 * @param req
 * @param res
 */
const getImageUrlByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return handleHttpError(res, "USERID_IS_REQUIRED");

    const imageUrlByUserId = await getOneImageUrlByUserId(id);

    res.send(imageUrlByUserId);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGE_FOR_USERID");
  }
};

/**
 * Devolvera la URL de la imagen dependiendo del Id
 * @param req
 * @param res
 */
const getImageUrlByOfferId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return handleHttpError(res, "OFFERID_IS_REQUIRED");

    const imageUrlByUserId = await getOneImageUrlByOfferId(id);

    res.send(imageUrlByUserId);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGE_FOR_USERID");
  }
};

/**
 * Devolvera la URL de la imagen dependiendo del Id
 * @param req
 * @param res
 */
const getImageUrlByCategoryId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return handleHttpError(res, "CATEGORYID_IS_REQUIRED");

    const imageUrlByCategoryId = await getOneImageUrlByCategoryId(id);

    res.send(imageUrlByCategoryId);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_CATEGORY_FOR_USERID");
  }
};

/**
 * Devolvera la URL de la imagen dependiendo del Id
 * @param req
 * @param res
 */
const getImageUrlByBusinessId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return handleHttpError(res, "BUSINESSID_IS_REQUIRED");

    const imageUrlByBusinessId = await getOneImageUrlByBusinessId(id);

    res.send(imageUrlByBusinessId);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_BUSINESS_FOR_USERID");
  }
};

/**
 * Devolvera todas las URL de las imagenes guardadas
 * @param req
 * @param res
 */
const getImagesUrl = async (req: Request, res: Response) => {
  try {
    const imageUrl = await getAllImageUrl();

    if (imageUrl.status !== "OK")
      return handleHttpError(res, `${imageUrl.errorMessage}`);

    res.send(imageUrl);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGES");
  }
};

/**
 * Adicionara los datos de una imagen subida a la tabla ImagesUrl y guardara la imagen en Cloudinary
 * @param req
 * @param res
 * @returns
 */
const postImageUrl = async (req: Request, res: Response) => {
  try {
    const body: ImageUrl = matchedData(req);
    const imageToUpload = req.file?.path;
    const { userId, offerId, categoryId, businessId } = body;

    if (!imageToUpload) {
      return handleHttpError(res, "NOT_IMAGE_FILE_TO_UPLOAD");
    }

    /* if (
      imageToUpload.split(".").pop() !== ".jpeg" ||
      imageToUpload.split(".").pop() !== ".jpg" ||
      imageToUpload.split(".").pop() !== ".png"
    )
      return handleHttpError(res, "FILE_IS_NOT_A_VALID_IMAGE");
 */
    if (!offerId && !userId && !categoryId && !businessId)
      return handleHttpError(
        res,
        "NOT_OFFERID_USERID_CATEGORYID_OR_BUSINESSID_FOR_IMAGE"
      );

    const addImageToCloudinary = await addImageUrl({
      imageUrl: imageToUpload,
      offerId,
      categoryId,
      businessId,
      userId,
    });

    if (addImageToCloudinary.status !== "OK")
      return handleHttpError(res, `${addImageToCloudinary.errorMessage}`);
    else {
      res.status(201).send({
        status: "OK",
        errorMessage: null,
        data: { image_url: addImageToCloudinary.data },
      });
    }
  } catch (error) {
    handleHttpError(res, "Error uploading image");
  }
};

/**
 * Actualizara los datos de una imagen en la tabla ImagesUrl
 * @param req
 * @param res
 */
const updateImageUrl = async (req: Request, res: Response) => {
  try {
    const body: ImageUrl = matchedData(req);
    const {
      id,
      imageUrl,
      public_id,
      userId,
      offerId,
      categoryId,
      businessId,
    }: ImageUrl = body;

    const imageToUpdate = await updateOneImageUrl({
      id,
      imageUrl,
      public_id,
      userId,
      offerId,
      categoryId,
      businessId,
    });

    if (imageToUpdate.status !== "OK")
      return handleHttpError(res, `${imageToUpdate.errorMessage}`);

    res.status(200).send({
      status: "OK",
      errorMessage: null,
      data: imageToUpdate,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_IMAGE");
  }
};

/**
 * Eliminara los datos de una imagen en la tabla ImagesUrl y la eliminara de Cloudinary
 * @param req
 * @param res
 */
const deleteImageUrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const imageUrlToDelete = await deleteOneImageUrl(id);

    if (imageUrlToDelete.status !== "OK")
      return handleHttpError(res, `${imageUrlToDelete.errorMessage}`, 400);

    return res.send({
      status: "OK",
      message: "La Imagen ha sido eliminada correctamente",
    });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_IMAGE");
  }
};

export {
  getImageUrl,
  getImagesUrl,
  postImageUrl,
  updateImageUrl,
  deleteImageUrl,
  getImageUrlByUserId,
  getImageUrlByOfferId,
  getImageUrlByCategoryId,
  getImageUrlByBusinessId,
};
