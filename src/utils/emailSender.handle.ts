import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 *
 * @param to Email to send code
 * @param subject Subject for Email
 * @param bodyHtml structure for Email
 * @param code Random code for verify email
 */
const sendEmail = async (to: string, subject: string, bodyHtml: string) => {
  const fromEmail = {
    name: "Todo Menú",
    address: `${process.env.FROM_EMAIL}`,
  };

  const info = await transporter.sendMail(
    {
      from: fromEmail,
      to,
      subject,
      //text: "Este es su codigo de verificacion para la aplicacion:",
      html: bodyHtml,
    },
    (err, info) => {
      if (err) {
        throw new Error(`Error enviando codigo por correo: ${err}`);
      }
    }
  );
};

export { transporter, sendEmail };
