import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { JwtPayloadData } from "../interfaces/jwt.interface.js";
const JWT_SECRET = process.env.JWT_SECRET || "tokensecreto.333";

/**
 *
 * @param id ID from User login
 * @returns Valid Token for Session
 */
const generateToken = (payload: JwtPayloadData) => {
  const jwt = sign(payload, JWT_SECRET, {
    expiresIn: "2h",
    //expiresIn: "10000",
  });

  /* // Poner el Token en cookies por HttpOnly
  res.cookie("token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3600000,
  }); */

  return jwt;
};

/**
 *
 * @param jwt Token from login
 * @returns User data if JWT is correct
 */
const verifyToken = (jwt: string) => {
  const isJwtOk = verify(jwt, JWT_SECRET);
  return isJwtOk;
};

/**
 *  Metodo para recuperar los datos del payload del token
 * @param jwt JWT de la sesion iniciada
 * @returns
 */
const jwtPayloadData = (jwt: string) => {
  const arrayToken = jwt.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));

  return tokenPayload;
};
export { generateToken, verifyToken, jwtPayloadData };
