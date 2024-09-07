import { hash, compare } from "bcrypt";

/**
 *
 * @param password Password sent from User
 * @returns Hashed Password.
 */
const passwordHash = async (password: string) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

/**
 *
 * @param password Password sent from User
 * @param hashedPassword Hashed Password in Data Base
 * @returns Boolean. "True" if password correct or "False" if not
 */
const verifyHashedPassword = async (
  password: string,
  hashedPassword: string
) => {
  const passwordCompare = await compare(password, hashedPassword);
  return passwordCompare;
};

export { passwordHash, verifyHashedPassword };
