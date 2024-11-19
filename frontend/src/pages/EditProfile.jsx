import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/test/axiosInstance";
import { jwtDecode } from "jwt-decode";

export default function EditProfile({ userRole }) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		societyname: "",
		country: "",
		state: "",
		city: "",
	});

	const [errors, setErrors] = useState({});

	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					throw new Error("No token found in local storage");
				}
				const decodedToken = jwtDecode(token);

				const userId = decodedToken.id;

				const response = await axiosInstance.get(`/auth/${userId}`);
				const {
					firstName,
					lastName,
					phoneNumber,
					email,
					societyname,
					country,
					state,
					city,
				} = response.data;
				setFormData({
					firstName,
					lastName,
					phoneNumber,
					email,
					societyname,
					country,
					state,
					city,
				});
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		fetchUserProfile();
	}, []);

	const validateFields = () => {
		const newErrors = {};

		if (!formData.firstName.trim())
			newErrors.firstName = "First Name is required";
		if (!formData.lastName.trim())
			newErrors.lastName = "Last Name is required";
		if (
			!/^(?![ -])(?!.*[- ]$)(?!.*[- ]{2})[0-9- ]+$/.test(
				formData.phoneNumber
			)
		) {
			newErrors.phoneNumber = "Enter a valid phone number";
		}
		if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Enter a valid email address";
		if (!formData.society.trim()) newErrors.society = "Society is required";
		if (!formData.country.trim()) newErrors.country = "Country is required";
		if (!formData.state.trim()) newErrors.state = "State is required";
		if (!formData.city.trim()) newErrors.city = "City is required";

		return newErrors;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validateFields();
		if (Object.keys(validationErrors).length === 0) {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					throw new Error("No token found in local storage");
				}
				const decodedToken = jwtDecode(token);
				const userId = decodedToken.id;

				await axiosInstance.put(`/auth/${userId}`, formData);
				setIsEditing(false);
			} catch (error) {
				console.error("Error updating profile:", error);
			}
		} else {
			setErrors(validationErrors);
		}
	};

	return (
		<Layout userRole={userRole}>
			<div className="relative w-full overflow-hidden">
				<div className="absolute inset-0 bg-blue-200 opacity-50 z-10"></div>
				<div className="flex items-center justify-between w-full  left-0 top-0 z-0">
					<img
						src="./src/assets/background-design-1.svg"
						alt=""
						className="w-1/2 h-auto"
					/>
					<img
						src="./src/assets/background-design-2.svg"
						alt=""
						className="w-1/3 h-auto"
					/>
					<img
						src="./src/assets/background-design-3.svg"
						alt=""
						className="w-1/3 h-auto"
					/>
				</div>
			</div>
			<div className="relative">
				<div className="w-[991px] h-[526px] gap-0 absolute top-[-270px] left-[304px] z-20">
					<div className="flex justify-between">
						<div className="text-[20px] font-semibold font-poppins leading-[30px] text-left decoration-slice">
							{isEditing ? "Edit Profile" : "Profile"}
						</div>

						{!isEditing && (
							<Button
								className="font-poppins flex items-center"
								onClick={() => setIsEditing(true)} // Enable editing mode
							>
								<img
									src="./src/assets/editwhite.svg"
									alt=""
									className="rounded-full w-[20px] h-[20px] mr-2"
								/>
								Edit Profile
							</Button>
						)}
					</div>

					<Card className="p-3 w-[991px] h-[526px] mt-3 transition-all rounded-[20px] duration-300 ease-in-out transform">
						<form
							onSubmit={handleSubmit}
							className="flex mt-10 ml-10"
						>
							<div className="w-[285px] h-[460px]">
								<div className="relative w-[145px] h-[145px] border-t-4 border-transparent">
									<img
										src="./src/assets/img1.png"
										alt=""
										className="w-full h-full object-cover rounded-full"
									/>
									<Link className="absolute bottom-0 right-0 m-2 rounded-full bg-[#F6F8FB]">
										<img
											src="./src/assets/editblack.svg"
											alt=""
											className="rounded-full m-1 w-[20px] h-[20px] fill-[#202224]"
										/>
									</Link>
									<div className="text-center mt-5 font-semibold font-poppins">
										Arlene McCoy
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2">
								{[
									"firstName",
									"lastName",
									"phoneNumber",
									"email",
									"society",
									"country",
									"state",
									"city",
								].map((field, index) => (
									<div
										key={field}
										className={
											index % 2 !== 0 ? "ml-5" : ""
										}
									>
										<Label
											htmlFor={field}
											className="text-sm text-[#202224] capitalize"
										>
											{field.replace(/([A-Z])/g, " $1")}
											<span className="text-red-500">
												*
											</span>
										</Label>
										<Input
											name={field}
											type={
												field === "email"
													? "email"
													: "text"
											}
											placeholder={field.replace(
												/([A-Z])/g,
												" $1"
											)}
											value={formData[field]}
											onChange={handleChange}
											className="rounded-xl w-[300px]"
											disabled={!isEditing}
										/>
										{errors[field] && (
											<p className="text-red-500 text-xs mt-1">
												{errors[field]}
											</p>
										)}
									</div>
								))}
								<div className="flex justify-end col-span-2 mt-4">
									{isEditing && (
										<Button type="submit">
											Update Profile
										</Button>
									)}
								</div>
							</div>
						</form>
					</Card>
				</div>
			</div>
		</Layout>
	);
}
