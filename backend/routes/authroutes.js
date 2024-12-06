import express from "express";
import upload from "../middleware/upload.js";

import {
	register,
	login,
	logout,
	forgotPassword,
	resetPassword,
	updateProfile,
	getUserProfile,
	validatePassword,
} from "../controller/authcontroller.js";
import { admin, verifyToken } from "../middleware/authmiddleware.js";
const router = express.Router();

router.post(
	"/register",
	upload.fields([{ name: "photo", maxCount: 1 }]),
	register
);
router.post("/login", login);
router.post("/logout", logout);
router.post("/validate-password", admin, validatePassword);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/:id", admin, getUserProfile);
router.patch("/:id", admin, upload.single("photo"), updateProfile);
export default router;
