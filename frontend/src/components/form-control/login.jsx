import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Custom PasswordInput component
function PasswordInput({ placeholder, value, onChange }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="relative">
			<Input
				type={showPassword ? "text" : "password"}
				placeholder={placeholder}
				className="rounded-xl pr-10"
				value={value}
				onChange={onChange}
			/>
			<div
				onClick={togglePasswordVisibility}
				className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
			>
				{showPassword ? (
					<EyeIcon className="w-5 h-5 text-gray-500" />
				) : (
					<EyeOffIcon className="w-5 h-5 text-gray-500" />
				)}
			</div>
		</div>
	);
}

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ email: "", password: "" });

	const validateForm = () => {
		let valid = true;
		const newErrors = { email: "", password: "" };

		if (!email) {
			newErrors.email = "Email or phone is required.";
			valid = false;
		}
		if (!password) {
			newErrors.password = "Password is required.";
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form submitted");
		}
	};

	return (
		<Card className="max-w-[90%] md:max-w-[630px] lg:w-1/2 m-auto shadow-md p-4 md:p-6 rounded-2xl">
			<CardHeader>
				<CardTitle className="text-3xl md:text-4xl font-bold text-center md:text-left">Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email & Phone number */}
					<div>
						<Label htmlFor="email">
							Email or Phone <span className="text-red-500">*</span>
						</Label>
						<Input
							type="email"
							placeholder="Enter your email or phone"
							className="rounded-xl"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
					</div>

					{/* Password */}
					<div>
						<Label htmlFor="password">
							Password <span className="text-red-500">*</span>
						</Label>
						<PasswordInput
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
					</div>

					{/* Remember me and Forgot Password */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Remember me */}
						<div className="flex items-center">
							<Checkbox />
							<Label htmlFor="terms" className="ml-2">
								Remember me
							</Label>
						</div>
						{/* Forgot Password */}
						<div className="text-right md:text-right">
							<Link to="/forgot-pass" className="text-orange-500">
								Forgot Password?
							</Link>
						</div>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						disabled={!email || !password}
						className={`w-full h-12 md:h-[51px] mt-2 ${
							email && password
								? "bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300"
								: "bg-gray-300 cursor-not-allowed"
						}`}
					>
						Sign In
					</Button>
				</form>

				{/* Sign Up Link */}
				<div className="text-center mt-4">
					<p className="text-sm md:text-base">
						Don’t have an account?{" "}
						<Link to="/signup" className="text-orange-500">
							Sign Up
						</Link>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
