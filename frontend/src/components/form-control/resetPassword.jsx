import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { InputOTP, InputOTPSlot } from "../ui/input-otp";

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
			const generatedOtp = "123456";
			setOtp(generatedOtp);
		}
	}, [otpSent]);

	const handleGetOtpSubmit = (e) => {
		e.preventDefault();
		setOtpSent(true);
		setCountdown(30);
		setEnteredOtp("");
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

	const handlePasswordResetSubmit = (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			setErrorMessage("Passwords do not match.");
			return;
		}
		if (newPassword.length < 6) {
			setErrorMessage("Password should be at least 6 characters long.");
			return;
		}

		console.log("Password reset successful:", newPassword);
		setErrorMessage("");
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
		<Card className="max-w-[630px] md:w-1/2 m-auto shadow-md p-6 rounded-2xl">
			<CardHeader className="text-center">
				<CardTitle className="text-4xl font-bold text-gray-800">
					{otpSent
						? otpVerified
							? "Reset Password"
							: "Enter OTP"
						: "Forget Password"}
				</CardTitle>
			</CardHeader>

			<CardContent>
				{errorMessage && (
					<p className="text-red-500 mb-4 text-center">
						{errorMessage}
					</p>
				)}

				{!otpSent ? (
					<>
						<p className="text-sm text-gray-600 mb-6 text-center">
							Enter your email, and we&apos;ll send you an OTP to
							reset your password.
						</p>

						<form
							onSubmit={handleGetOtpSubmit}
							className="space-y-4"
						>
							{/* Email or Phone Input */}
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

							{/* Get OTP Button */}
							<Button
								type="submit"
								className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-xl"
							>
								Get OTP
							</Button>
						</form>
					</>
				) : otpVerified ? (
					<>
						<form
							onSubmit={handlePasswordResetSubmit}
							className="space-y-4"
						>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									New Password{" "}
									<span className="text-red-500">*</span>
								</label>
								<Input
									type="password"
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									className="mt-1 block w-full"
									placeholder="Enter New Password"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Confirm Password{" "}
									<span className="text-red-500">*</span>
								</label>
								<Input
									type="password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									className="mt-1 block w-full"
									placeholder="Confirm New Password"
									required
								/>
							</div>
							<Button
								type="submit"
								className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-xl"
							>
								Reset Password
							</Button>
						</form>
					</>
				) : (
					<>
						<p className="text-sm text-gray-600 mb-6 text-center">
							We&apos;ve sent an OTP to {emailOrPhone}.
						</p>

						<form onSubmit={handleOtpSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									OTP <span className="text-red-500">*</span>
								</label>

								<InputOTP
									maxLength={6}
									onChange={handleOtpChange}
								>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTP>
							</div>

							{/* Countdown Timer */}
							{countdown > 0 ? (
								<p className="text-center text-sm text-gray-500">
									You can request a new OTP in {countdown}{" "}
									seconds.
								</p>
							) : (
								<p className="text-center text-sm text-gray-500">
									You can now request a new OTP.
								</p>
							)}

							<Button
								type="submit"
								className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-xl"
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
