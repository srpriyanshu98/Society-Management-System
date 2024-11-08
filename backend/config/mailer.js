import nodemailer from "nodemailer";
import { ENV_VARS } from "../config/envVars.js";

export const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: ENV_VARS.EMAIL_HOST,
    port: ENV_VARS.EMAIL_PORT,
    auth: {
      user: ENV_VARS.EMAIL_USER,
      pass: ENV_VARS.EMAIL_PASSWORD,
    },
    secure: ENV_VARS.EMAIL_PORT == 465, // Use true for port 465, false for port 587
  });
  const mailOptions = {
    from: ENV_VARS.EMAIL_USER,
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
};
