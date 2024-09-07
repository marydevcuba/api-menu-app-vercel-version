import { Request, Response, Router } from "express";
import {
  changeRole,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/user.controllers.js";
import { checkSession } from "../../middleware/session.middleware.js";
import { isAdmin } from "../../middleware/isAdmin.middleware.js";
import {
  validatorChangeRoleUser,
  validatorDeleteOneUser,
  validatorGetOneUser,
  validatorUpdateOneUser,
} from "../../validators/users.validators.js";
import { checkSameUserGetUser } from "../../middleware/checkSameUserGetUser.js";

const userRouter = Router();

/**
 * All Category Routes
 */
userRouter
  .get("/", checkSession, isAdmin, getUsers)

  .get("/:id", checkSession, checkSameUserGetUser, validatorGetOneUser, getUser)

  .put(
    "/:id",
    checkSession,
    checkSameUserGetUser,
    validatorUpdateOneUser,
    updateUser
  )

  .delete("/:id", checkSession, isAdmin, validatorDeleteOneUser, deleteUser)

  .put(
    "/changerole/:id",
    checkSession,
    isAdmin,
    validatorChangeRoleUser,
    changeRole
  );

export { userRouter };
