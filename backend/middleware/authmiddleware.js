import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";
import { ENV_VARS } from "../config/envVars.js";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) return res.status(403).json({ message: "No token provided" });

	jwt.verify(token, ENV_VARS.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).json({ message: "Unauthorized" });
		req.userId = decoded.id;
		next();
	});
};

export const admin = async (req, res, next) => {
	try {
		// Check for token in headers
		const token =
			req.cookies.token || req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res
				.status(401)
				.json({ message: "No token provided, authorization denied" });
		}

		// Verify token
		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
		req.user = await User.findById(decoded.id);

		// Check if user exists and has an admin role
		if (!req.user) {
			return res.status(404).json({ message: "User not found" });
		}
		if (req.user.role !== "admin") {
			return res
				.status(403)
				.json({ message: "Access denied, admin only" });
		}

		next(); // User is an admin, continue to the next middleware
	} catch (error) {
		res.status(401).json({
			message: "Token verification failed",
			error: error.message,
		});
	}
};
