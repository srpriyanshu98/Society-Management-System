import { ENV_VARS } from "../config/envVars.js";
import User from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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
		expiresIn: "1h",
	});
	res.cookie("token", token, { httpOnly: true, secure: true }); // Set cookie
	res.status(200).json({ message: "Login successful" });
};

export const logout = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;

		// Check if the user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Generate a reset token and set expiration
		const resetToken = crypto.randomBytes(32).toString("hex");
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
		await user.save();

		// Set up email transport
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: ENV_VARS.MY_GMAIL,
				pass: ENV_VARS.MY_PASSWORD,
			},
		});

		// Send the email
		const mailOptions = {
			to: email,
			from: "vishal@gmail.com",
			subject: "Password Reset",
			text: `You requested a password reset.\n\n
                 Click the link below to reset your password:http://localhost:5000/api/auth \n
                 /reset-password/${resetToken}\n\n`,
		};

		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: "Password reset email sent" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		// Find user by reset token and check expiration
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid or expired token" });
		}

		// Hash the new password and update user
		user.password = await bcrypt.hash(password, 10);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();

		res.status(200).json({
			message: "Password has been reset successfully",
		});
	} catch (error) {
		res.status(500).json({ message: "Server error" });
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
