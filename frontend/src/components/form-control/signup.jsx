import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Link } from "react-router-dom";
import SellectSociety from "./SellectSociety";

export default function SignUpForm() {
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
		society: "",
		termsAccepted: false,
	});
	const [errors, setErrors] = useState({});

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
		if (!formData.termsAccepted) {
			newErrors.termsAccepted =
				"You must accept the terms and privacy policies";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form submitted successfully", formData);
		}
	};

	return (
		<Card className="max-w-[630px] md:w-1/2 m-auto shadow-md p-6 rounded-2xl ">
			<CardHeader>
				<CardTitle className="text-4xl font-bold ">
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
								className="rounded-xl w-64"
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
							<Label htmlFor="lastName">
								Last Name{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								name="lastName"
								type="text"
								placeholder="last name"
								className="rounded-xl  w-64"
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

					{/* Email & Phone number */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="email">
								Email Address{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								name="email"
								type="email"
								placeholder="email"
								className="rounded-xl w-64"
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
							<Label htmlFor="phone">
								Phone Number{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								name="phone"
								type="tel"
								placeholder="91+"
								className="rounded-xl w-64"
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

					{/* Country & State */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<Label htmlFor="country">
								Country <span className="text-red-500">*</span>
							</Label>
							<Input
								name="country"
								type="text"
								placeholder="country"
								className="rounded-xl"
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
							<Label htmlFor="state">
								State <span className="text-red-500">*</span>
							</Label>
							<Input
								name="state"
								type="text"
								placeholder="state"
								className="rounded-xl"
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
							<Label htmlFor="state">
								City <span className="text-red-500">*</span>
							</Label>
							<Input
								name="city"
								type="text"
								placeholder="city"
								className="rounded-xl"
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
						<Label htmlFor="society">
							Select Society{" "}
							<span className="text-red-500">*</span>
						</Label>
						<SellectSociety />
					</div>

					{/* Password */}
					<div>
						<Label htmlFor="password">
							Password <span className="text-red-500">*</span>
						</Label>
						<Input
							name="password"
							type="password"
							placeholder="password"
							className="rounded-xl"
							value={formData.password}
							onChange={handleInputChange}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">
								{errors.password}
							</p>
						)}
					</div>

					{/* Confirm Password */}
					<div>
						<Label htmlFor="confirmPassword">
							Confirm Password{" "}
							<span className="text-red-500">*</span>
						</Label>
						<Input
							name="confirmPassword"
							type="Password"
							placeholder="confirm password"
							className="rounded-xl"
							value={formData.confirmPassword}
							onChange={handleInputChange}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm">
								{errors.confirmPassword}
							</p>
						)}
					</div>

					{/* Terms & Conditions */}
					<div className="flex items-center">
						<Checkbox />
						<Label htmlFor="terms" className="ml-2">
							I agree to all the Terms and{" "}
							<span className="text-orange-500">
								Privacy Policies.
							</span>
						</Label>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full bg-gradient-to-r  from-orange-600 to-orange-400 h-[51px]"
					>
						Register
					</Button>
				</form>

				{/* Already have an account */}
				<div className="text-center mt-4">
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
