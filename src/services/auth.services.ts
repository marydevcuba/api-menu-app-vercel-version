import { log } from "console";
import { RegisterAuth, LoginAuth } from "../interfaces/auth.interface.js";
import { passwordHash, verifyHashedPassword } from "../utils/bcrypt.handle.js";
import { validateDataError } from "../utils/error.handle.js";
import { generateToken } from "../utils/jwt.handle.js";
import { prisma } from "../utils/prisma.client.js";
import { sendEmail } from "../utils/emailSender.handle.js";

/**
 *
 * @param param0 Params data from new User
 * @returns new User if all data is correct or null if not
 */
const registerNewUser = async ({ name, email, password }: RegisterAuth) => {
  try {
    if (!name || !email || !password)
      validateDataError("Todos los datos son requeridos");

    const passworHashed = await passwordHash(password);

    const userToRegister = await prisma.user.create({
      data: {
        name,
        email,
        password: passworHashed,
      },
    });
    return { status: "OK", errorMessage: null, data: userToRegister };
  } catch (e) {
    console.log(e);

    return { status: "ERROR", errorMessage: `ERROR_REGISTERING`, data: null };
  }
};

const loginUser = async (email: string, password: string) => {
  if (!email || !password || email === "" || password === "")
    return validateDataError("Los campos email y contraseña son obligatorios");
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) return validateDataError("Email o contraseña no válidos");

    const passwordToCompare = await verifyHashedPassword(
      password,
      foundUser.password
    );

    if (!passwordToCompare)
      return validateDataError("Email o contraseña no válidos");

    const token = generateToken({
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    });

    return {
      status: "OK",
      errorMessage: null,
      data: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        token,
      },
    };
  } catch (error) {
    console.log(error);

    return validateDataError("ERROR_LOGIN");
  }
};

const sendEmailCode = async (email: string, name: string) => {
  if (!email)
    return validateDataError("No se pudo obtener la direccion de correo");
  try {
    // Generando Codigo Aleatorio
    function getRandomInt() {
      const min = Math.ceil(100000);
      const max = Math.floor(999999);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const code = getRandomInt();

    const body = `<h3>Hola ${name}!!</h3>
      <h2>Código: ${code}</h2>`;

    await sendEmail(email, "Codigo de Verificacón", body);

    return {
      status: "OK",
      errorMessage: null,
      data: code,
    };
  } catch (error) {
    return validateDataError("ERROR_SENDING_VERIFICATION_CODE");
  }
};

const checkEmailCode = async (email: string, name: string) => {
  if (!email)
    return validateDataError("No se pudo obtener la direccion de correo");
  try {
    // Generando Codigo Aleatorio
    function getRandomInt() {
      const min = Math.ceil(100000);
      const max = Math.floor(999999);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const code = getRandomInt();

    const body = `<h3>Hola ${name}!!</h3>
      <h2>Código: ${code}</h2>`;

    await sendEmail(email, "Codigo de Verificacón", body);

    return {
      status: "OK",
      errorMessage: null,
      data: code,
    };
  } catch (error) {
    return validateDataError("ERROR_SENDING_VERIFICATION_CODE");
  }
};

export { registerNewUser, loginUser, sendEmailCode, checkEmailCode };
