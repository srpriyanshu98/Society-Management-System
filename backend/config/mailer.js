import nodemailer from "nodemailer";
import { ENV_VARS } from "../config/envVars.js";

export const sendMail = async (to, subject, text) => {
	const transporter = nodemailer.createTransport({
		host: ENV_VARS.EMAIL_HOST,
		secure: Number(ENV_VARS.EMAIL_PORT) === 465, // Use secure for port 465
		auth: {
			user: ENV_VARS.EMAIL_USER,
			pass: ENV_VARS.EMAIL_PASSWORD,
		},
	});
	const mailOptions = {
		from: ENV_VARS.EMAIL_USER,
		to: to,
		subject: subject,
		text: text,
	};
	await transporter.sendMail(mailOptions);
};
