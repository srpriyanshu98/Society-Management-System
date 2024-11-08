import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { InputOTP, InputOTPSlot } from "../ui/input-otp";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Assume lucide-react icons are used
import { Link } from "react-router-dom";
import axiosInstance from "../../test/axiosInstance"; // Adjust the path accordingly

// Custom Password Input Component
function PasswordInput({ label, value, onChange, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
                {label} <span className="text-red-500">*</span>
            </label>
            <Input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full pr-10"
                placeholder={placeholder}
                required
            />
            <div
                className="absolute inset-y-0 right-3 top-6 flex items-center cursor-pointer"
                onClick={toggleShowPassword}
            >
                {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                ) : (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                )}
            </div>
        </div>
    );
}

export default function ResetPassword() {
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [countdown, setCountdown] = useState(30);
    const [otp, setOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (otpSent) {
            const generatedOtp = " "; // This should be replaced with actual OTP generation logic
            setOtp(generatedOtp);
        }
    }, [otpSent]);

    const handleGetOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/forgot-password", {
                email: emailOrPhone,
            });
            if (response.status === 200) {
                setOtpSent(true);
                setCountdown(30);
                setEnteredOtp("");
            }
        } catch (error) {
            console.error("Error in handleGetOtpSubmit:", error);
            setErrorMessage("Failed to send OTP. Please try again.");
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (enteredOtp === otp) {
            setOtpVerified(true);
            setErrorMessage("");
        } else {
            setErrorMessage("Incorrect OTP. Please try again.");
        }
    };

    const handlePasswordResetSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            setErrorMessage("Password should be at least 6 characters long.");
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/auth/reset-password/${otp}`,
                {
                    password: newPassword,
                }
            );
            if (response.status === 200) {
                console.log("Password reset successful:", newPassword);
                setErrorMessage("");
            }
        } catch (error) {
            console.error("Error in handlePasswordResetSubmit:", error);
            setErrorMessage("Failed to reset password. Please try again.");
        }
    };

    useEffect(() => {
        let timer;
        if (otpSent && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [otpSent, countdown]);

    const handleOtpChange = (value) => {
        setEnteredOtp(value);
    };

    return (
        <Card className="max-w-[630px] w-full md:w-1/2 m-auto shadow-md p-4 md:p-6 rounded-2xl">
            <CardHeader>
                <CardTitle className="text-2xl md:text-4xl font-bold text-gray-800">
                    {otpSent
                        ? otpVerified
                            ? "Reset Password"
                            : "Enter OTP"
                        : "Forget Password"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                {errorMessage && (
                    <p className="text-red-500 mb-4 text-center text-sm md:text-base">
                        {errorMessage}
                    </p>
                )}

                {!otpSent ? (
                    <>
                        <p className="text-sm text-gray-600 mb-6">
                            Enter your email, and we&apos;ll send you an OTP to
                            reset your password.
                        </p>

                        <form
                            onSubmit={handleGetOtpSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email or Phone{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    value={emailOrPhone}
                                    onChange={(e) =>
                                        setEmailOrPhone(e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    placeholder="Enter Email or Phone number"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className={`w-full py-2 md:py-3 rounded-xl text-white ${
                                    emailOrPhone
                                        ? "bg-gradient-to-r from-orange-600 to-orange-400"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!emailOrPhone}
                            >
                                Get OTP
                            </Button>

                            <div className="text-center mt-4 text-sm">
                                <p>
                                    <Link
                                        to="/login"
                                        className="text-orange-500"
                                    >
                                        Back To Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </>
                ) : otpVerified ? (
                    <>
                        <form
                            onSubmit={handlePasswordResetSubmit}
                            className="space-y-4"
                        >
                            <PasswordInput
                                label="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter New Password"
                            />
                            <PasswordInput
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm New Password"
                            />
                            <Button
                                type="submit"
                                className="w-full py-2 md:py-3  text-white rounded-xl"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-gray-600 mb-6">
                            We&apos;ve sent an OTP to {emailOrPhone}.
                        </p>

                        <form onSubmit={handleOtpSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Please enter the 6 digit code sent to your
                                    phone number
                                </label>

                                <InputOTP
                                    maxLength={6}
                                    onChange={handleOtpChange}
                                    className="mt-1 w-full"
                                >
                                    {Array.from({ length: 6 }).map(
                                        (_, index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                            />
                                        )
                                    )}
                                </InputOTP>
                            </div>

                            <p className="text-center text-sm text-gray-500">
                                {countdown > 0
                                    ? `You can request a new OTP in ${countdown} seconds.`
                                    : "You can now request a new OTP."}
                            </p>

                            <Button
                                type="submit"
                                className="w-full py-2 md:py-3  text-white rounded-xl"
                            >
                                Verify OTP
                            </Button>
                        </form>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
