import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT || 5000,
	JWT_SECRET: process.env.JWT_SECRET,
	MY_GMAIL: process.env.MY_GMAIL,
	MY_PASSWORD: process.env.MY_PASSWORD,
	CLIENT_URL: process.env.CLIENT_URL,
	NODE_ENV: process.env.NODE_ENV || "development",
};
