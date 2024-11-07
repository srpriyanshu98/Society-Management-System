import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import SellectSociety from "./SellectSociety";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axiosInstance from "../../test/axiosInstance";

// Custom PasswordInput component
function PasswordInput({ name, placeholder, value, onChange, error }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="relative">
			<Input
				name={name}
				type={showPassword ? "text" : "password"}
				placeholder={placeholder}
				className="rounded-xl w-full pr-10"
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
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
}

export default function SignUpForm() {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked((prev) => !prev);
	};

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		country: "",
		state: "",
		city: "",
		password: "",
		confirmPassword: "",
		// society: "",
		termsAccepted: false,
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.firstName) newErrors.firstName = "First Name is required";
		if (!formData.lastName) newErrors.lastName = "Last Name is required";
		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email format is invalid";
		}
		if (!formData.phone) {
			newErrors.phone = "Phone number is required";
		} else if (!/^\d{10}$/.test(formData.phone)) {
			newErrors.phone = "Phone number must be 10 digits";
		}
		if (!formData.country) newErrors.country = "Country is required";
		if (!formData.state) newErrors.state = "State is required";
		if (!formData.city) newErrors.city = "City is required";
		if (!formData.password) newErrors.password = "Password is required";
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}
		// if (!formData.termsAccepted) {
		//     newErrors.termsAccepted =
		//         "You must accept the terms and privacy policies";
		// }

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form submitted");
		if (validateForm()) {
			console.log("Form data is valid, submitting...");
			try {
				const response = await axiosInstance.post("/auth/register", {
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					phoneNumber: formData.phone,
					country: formData.country,
					state: formData.state,
					city: formData.city,
					societyId: "671adb5bda297528780cf57c", // Assuming society is the ID
					password: formData.password,
					confirmPassword: formData.confirmPassword,
				});
				console.log("Form submitted successfully", response.data);
				// Redirect to the login page after successful registration
				navigate("/login");
			} catch (error) {
				console.error("Error submitting form", error);
				// Handle error, show error message to the user
			}
		} else {
			console.log("Form data is invalid, not submitting.");
		}
	};
	return (
		<Card className="max-w-[630px] w-full md:w-1/2 m-auto shadow-md p-6 rounded-2xl">
			<CardHeader>
				<CardTitle className="text-3xl md:text-4xl font-bold">
					Registration
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* First Name & Last Name */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="firstName" className="text-sm">
								First Name{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								name="firstName"
								type="text"
								placeholder="First name"
								className="rounded-xl w-full"
								value={formData.firstName}
								onChange={handleInputChange}
							/>
							{errors.firstName && (
								<p className="text-red-500 text-sm">
									{errors.firstName}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor="lastName" className="text-sm">
								Last Name{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								name="lastName"
								type="text"
								placeholder="Last name"
								className="rounded-xl w-full"
								value={formData.lastName}
								onChange={handleInputChange}
							/>
							{errors.lastName && (
								<p className="text-red-500 text-sm">
									{errors.lastName}
								</p>
							)}
						</div>
					</div>

					{/* Email & Phone Number */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="email" className="text-sm">
								Email Address{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								name="email"
								type="email"
								placeholder="Email"
								className="rounded-xl w-full"
								value={formData.email}
								onChange={handleInputChange}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm">
									{errors.email}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor="phone" className="text-sm">
								Phone Number{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								name="phone"
								type="tel"
								placeholder="91+"
								className="rounded-xl w-full"
								value={formData.phone}
								onChange={handleInputChange}
							/>
							{errors.phone && (
								<p className="text-red-500 text-sm">
									{errors.phone}
								</p>
							)}
						</div>
					</div>

					{/* Country, State, and City */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<Label htmlFor="country" className="text-sm">
								Country <span className="text-red-500">*</span>
							</Label>
							<Input
								name="country"
								type="text"
								placeholder="Country"
								className="rounded-xl w-full"
								value={formData.country}
								onChange={handleInputChange}
							/>
							{errors.country && (
								<p className="text-red-500 text-sm">
									{errors.country}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor="state" className="text-sm">
								State <span className="text-red-500">*</span>
							</Label>
							<Input
								name="state"
								type="text"
								placeholder="State"
								className="rounded-xl w-full"
								value={formData.state}
								onChange={handleInputChange}
							/>
							{errors.state && (
								<p className="text-red-500 text-sm">
									{errors.state}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor="city" className="text-sm">
								City <span className="text-red-500">*</span>
							</Label>
							<Input
								name="city"
								type="text"
								placeholder="City"
								className="rounded-xl w-full"
								value={formData.city}
								onChange={handleInputChange}
							/>
							{errors.city && (
								<p className="text-red-500 text-sm">
									{errors.city}
								</p>
							)}
						</div>
					</div>

					{/* Select Society */}
					<div>
						<Label htmlFor="society" className="text-sm">
							Select Society{" "}
							<span className="text-red-500">*</span>
						</Label>
						<SellectSociety />
					</div>

					{/* Password & Confirm Password */}

					<div>
						<Label htmlFor="password" className="text-sm">
							Password <span className="text-red-500">*</span>
						</Label>
						<PasswordInput
							name="password"
							placeholder="Enter your password"
							value={formData.password}
							onChange={handleInputChange}
							error={errors.password}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">
								{errors.password}
							</p>
						)}
					</div>

					{/* Confirm Password Field */}
					<div>
						<Label htmlFor="confirmPassword" className="text-sm">
							Confirm Password{" "}
							<span className="text-red-500">*</span>
						</Label>
						<PasswordInput
							name="confirmPassword"
							placeholder="Confirm your password"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							error={errors.confirmPassword}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm">
								{errors.confirmPassword}
							</p>
						)}
					</div>

					{/* Terms & Conditions */}
					<div className="flex items-center">
						<input
							type="checkbox"
							id="terms"
							checked={isChecked}
							onChange={handleCheckboxChange}
							className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
						/>
						<Label htmlFor="terms" className="ml-2 text-sm">
							I agree to all the Terms and{" "}
							<span className="text-orange-500">
								Privacy Policies.
							</span>
						</Label>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full  h-[51px] rounded-xl text-white"
						disabled={!isChecked} // Disable button when checkbox is not checked
					>
						Register
					</Button>
				</form>

				{/* Already have an account */}
				<div className="text-center mt-4 text-sm">
					<p>
						Already have an account?{" "}
						<Link to="/login" className="text-orange-500">
							Login
						</Link>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
