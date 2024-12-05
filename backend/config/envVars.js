import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT || 5000,
	JWT_SECRET: process.env.JWT_SECRET,
	EMAIL_USER: process.env.EMAIL_USER,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
	EMAIL_PORT: process.env.EMAIL_PORT,
	EMAIL_HOST: process.env.EMAIL_HOST,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	NODE_ENV: process.env.NODE_ENV || "development",

	STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
	STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
