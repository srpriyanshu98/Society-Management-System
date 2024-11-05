import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
} from "../controller/authcontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.put("/:id", updateProfile);

export default router;
