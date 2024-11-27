import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  getUserProfile,
  refreshToken,
} from "../controller/authcontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/:id", getUserProfile);
router.put("/:id", updateProfile);
router.post("/refresh-token", refreshToken);
export default router;
