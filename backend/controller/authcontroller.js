import { ENV_VARS } from "../config/envVars.js";
import User from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../config/mailer.js";
import otpGenerator from "otp-generator";
import bcryptjs from "bcryptjs";
import fs from "fs";

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    state,
    city,
    societyname,
    password,
    confirmPassword,
    role,
  } = req.body;

  const photo = req.files?.photo ? req.files.photo[0].path : null;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const newUser = new User({
      photo,
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      state,
      city,
      societyname,
      password,
      role,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, ENV_VARS.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).json({ message: "Login successful", token });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const cdate = new Date();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    let user;
    if (email.includes("@")) {
      // Find user by Email_Address instead of Email
      user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Email not registered",
        });
      }

      await User.findOneAndUpdate(
        { email: email },
        { otp, otpExpiration },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      await sendMail(
        email,
        "Password Reset OTP",
        `Your OTP code is ${otp}. It will expire in 5 minutes.`
      );

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to email",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

// Verify OTP and reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Verify OTP
    const currentTime = new Date();
    if (user.otp !== otp || user.otpExpiration < currentTime) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Update user's password and clear OTP fields
    user.password = newPassword;
    user.otp = null; // Clear OTP after successful reset
    user.otpExpiration = null;
    console.log("Password saved in DB:", user.password); // After saving in resetPassword

    await user.save();
    console.log("Password saved in DB:"); // After saving in resetPassword

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in reset password controller:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Get user profile by ID
export const getUserProfile = async (req, res) => {
  try {
    const userprofile = await User.findById(req.params.id);
    if (!userprofile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.status(200).json(userprofile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user profile by ID
export const updateProfile = async (req, res) => {
  try {
    const userprofile = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const photo = req.files?.photo ? req.files.photo[0].path : null;

    if (photo) {
      userprofile.photo = photo;
    }

    if (!userprofile) {
      return res.status(404).json({ message: "userprofile not found" });
    }

    res.status(200).json(userprofile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const validatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.userId; // Use req.userId set by verifyToken middleware

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Password validated successfully" });
  } catch (error) {
    console.error("Error in validate password controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
