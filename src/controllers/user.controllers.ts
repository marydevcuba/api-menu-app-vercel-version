import { Request, Response } from "express";
import { handleHttpError } from "../utils/error.handle.js";
import {
  changeOneUserRole,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
} from "../services/user.services.js";
import { body, matchedData } from "express-validator";

/**
 *
 * @param req Request de la petición de todas los Usuarios
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de Usuarios
 */
const getUsers = async (req: Request, res: Response) => {
  try {
    const getUsers = await getAllUsers();

    if (getUsers.status !== "OK") {
      handleHttpError(res, `${getUsers.errorMessage}`);
    } else {
      res.send(getUsers);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_USERS");
  }
};

/**
 *
 * @param param0 Params con el id del User a buscar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un User
 */
const getUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const user = await getOneUser(id);

    if (user.status !== "OK") handleHttpError(res, `${user.errorMessage}`, 400);
    else res.send(user);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_USER");
  }
};

/**
 *
 * @param param0 Datos correspondientes al User a actualizar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un User actualizado
 */
const updateUser = async (req: Request, res: Response) => {
  try {
    const bodyUser = matchedData(req);
    const { id, name, email } = bodyUser;

    if (name === undefined && email === undefined) {
      handleHttpError(res, "NAME_OR_EMAIL_ARE_REQUIRED", 400);
    } else {
      const userToUpdate = await updateOneUser(id, name, email);

      if (userToUpdate.status !== "OK")
        handleHttpError(res, `${userToUpdate.errorMessage}`, 400);
      else {
        res.send({
          status: "OK",
          message: "El Usuario ha sido actualizado correctamente",
          data: userToUpdate.data,
        });
      }
    }
  } catch (error) {
    console.log(error);

    handleHttpError(res, "ERROR_UPDATING_USER");
  }
};

/**
 *
 * @param param0 Datos correspondientes al User a eliminar.
 * @param res Response con un objeto que contiene informacion de status, error y/o datos de un User eliminado
 */
const deleteUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const userToDelete = await deleteOneUser(id);

    if (userToDelete.status !== "OK")
      return handleHttpError(res, `${userToDelete.errorMessage}`, 400);

    res.status(200).send({
      status: "OK",
      message: "El Usuario ha sido eliminado correctamente",
    });
  } catch (error) {
    console.log(error);

    handleHttpError(res, "ERROR_DELETING_USER");
  }
};

const changeRole = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const userToChangeRole = await changeOneUserRole(id);

    if (userToChangeRole.status !== "OK")
      handleHttpError(res, `${userToChangeRole.errorMessage}`, 400);

    res.send({
      status: "OK",
      message: "El rol del Usuario ha sido actualizado correctamente",
      data: userToChangeRole.data,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_CHANGE_USER_ROLE");
  }
};

export { getUser, getUsers, updateUser, deleteUser, changeRole };
