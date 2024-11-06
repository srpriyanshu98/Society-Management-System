import { ENV_VARS } from "../config/envVars.js";
import User from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { sendMail } from "../config/mailer.js";

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    state,
    city,
    societyId,
    password,
    confirmPassword,
  } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      state,
      city,
      society: societyId,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, ENV_VARS.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, secure: true }); // Set cookie
  res.status(200).json({ message: "Login successful" });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// Generate a 6-digit OTP
const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// Request OTP for password reset
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP and expiry (5 minutes from now)
    const otp = generateOtp();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    // Update user with OTP and expiry
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    await sendMail(
      email,
      "Password Reset OTP",
      `Your OTP code is ${otp}. It will expire in 5 minutes.`
    );

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP and reset password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update password and clear OTP
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user profile by ID
export const updateProfile = async (req, res) => {
  try {
    const userprofile = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!userprofile) {
      return res.status(404).json({ message: "userprofile not found" });
    }
    res.status(200).json(userprofile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
