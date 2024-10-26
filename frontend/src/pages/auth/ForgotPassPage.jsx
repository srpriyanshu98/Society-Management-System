import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassPage() {
	// States for the process
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

	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center relative">
			{/* LOGO */}
			<img
				src="./src/assets/Bright Web.png"
				alt="Illustration"
				className="absolute top-14 left-40"
			/>
			{/* Left side - Image */}
			<div className="hidden md:block m-auto ">
				<img
					src="./src/assets/forgot.png"
					alt="Illustration"
					className="z-10"
				/>
				<img
					src="./src/assets/bg-graphic.png"
					alt=""
					className="absolute top-0 right-0 h-screen -z-10"
				/>
			</div>

			{/* Right side - Form */}
			<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
				{/* Error Message */}
				{errorMessage && (
					<p className="text-red-500 mb-4">{errorMessage}</p>
				)}

				{!otpSent ? (
					<>
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Forget Password
						</h2>
						<p className="text-sm text-gray-600 mb-6">
							Enter your email and we&apos;ll send you an OTP to
							reset your password.
						</p>

						<form
							onSubmit={handleGetOtpSubmit}
							className="space-y-6"
						>
							{/* Email or Phone Input */}
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Email or Phone
									<span className="text-red-500">*</span>
								</label>
								<Input
									type="text"
									value={emailOrPhone}
									onChange={(e) =>
										setEmailOrPhone(e.target.value)
									}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
									placeholder="Enter Email or Phone number"
									required
								/>
							</div>

							{/* Get OTP Button */}
							<div className="pt-4">
								<Button
									type="submit"
									className="w-full py-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-md"
								>
									Get OTP
								</Button>
							</div>
						</form>
					</>
				) : otpVerified ? (
					<>
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Reset Password
						</h2>

						<form
							onSubmit={handlePasswordResetSubmit}
							className="space-y-6"
						>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									New Password
									<span className="text-red-500">*</span>
								</label>
								<Input
									type="password"
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
									placeholder="Enter New Password"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Confirm Password
									<span className="text-red-500">*</span>
								</label>
								<Input
									type="password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
									placeholder="Confirm New Password"
									required
								/>
							</div>

							<div className="pt-4">
								<Button
									type="submit"
									className="w-full py-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-md"
								>
									Reset Password
								</Button>
							</div>
						</form>
					</>
				) : (
					<>
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Enter OTP
						</h2>
						<p className="text-sm text-gray-600 mb-6">
							We&apos;ve sent an OTP to {emailOrPhone}.
						</p>

						<form onSubmit={handleOtpSubmit} className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									OTP<span className="text-red-500">*</span>
								</label>
								<Input
									type="text"
									value={enteredOtp}
									onChange={(e) =>
										setEnteredOtp(e.target.value)
									}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
									placeholder="Enter the OTP"
									required
								/>
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

							<div className="pt-4">
								<Button
									type="submit"
									className="w-full py-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-md"
								>
									Verify OTP
								</Button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
