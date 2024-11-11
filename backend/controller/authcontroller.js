import { ENV_VARS } from "../config/envVars.js";
import User from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../config/mailer.js";
import otpGenerator from "otp-generator";

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
        role,
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
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const cdate = new Date();

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
                { otp, otpExpiration: new Date(cdate.getTime()) },
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
        } else {
            // For phone number handling (to be added later)
        }
    } catch (error) {
        console.log(error);
        return res.status(500);
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
        const userprofile = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!userprofile) {
            return res.status(404).json({ message: "userprofile not found" });
        }
        res.status(200).json(userprofile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
