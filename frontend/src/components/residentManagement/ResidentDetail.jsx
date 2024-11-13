import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";

export default function ResidentDetail({ control, errors }) {

	return (
		<Card className="p-4 pt-10 rounded-xl">
			<CardContent className="space-y-4">
				{/* Personal Information */}
				<div className="flex flex-row gap-4 mb-8">
					{/* Profile Photo */}
					<div className="flex-col items-center">
						<div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
							<span className="text-gray-500">
								<img src="./src/assets/add-photo.svg" alt="" />
							</span>
						</div>
						<Button variant="link" className="text-blue-700">
							Add Photo
						</Button>
					</div>
					<div className="space-y-6 ms-5">
						{/* First Row */}
						<div className="flex flex-row space-x-8">
							<div className="flex flex-col w-[430px]">
								<Label htmlFor="fullName" className="mb-3 font-poppins">
									Full Name<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name="fullName"
									control={control}
									rules={{ required: "Full Name is required" }}
									render={({ field }) => (
										<Input
											{...field}
											id="fullName"
											placeholder="Enter Full Name"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.fullName && <span className="text-red-500 font-poppins text-[12px]">{errors.fullName.message}</span>}
							</div>
							<div className="flex flex-col w-[430px]">
								<Label htmlFor="phoneNumber" className="mb-3 font-poppins">
									Phone Number<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name="phoneNumber"
									control={control}
									rules={{ required: "phone Number is required" }}
									render={({ field }) => (
										<Input
											{...field}
											id="phoneNumber"
											placeholder="Enter Your phoneNumber"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.phoneNumber && <span className="text-red-500 font-poppins text-[12px]">{errors.phoneNumber.message}</span>}

							</div>
							<div className="flex flex-col w-[430px]">
								<Label htmlFor="email" className="mb-3 font-poppins">
									Email Address<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name="email"
									control={control}
									rules={{ required: "email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } }}
									render={({ field }) => (
										<Input
											{...field}
											id="email"
											placeholder="Enter Your email"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.email && <span className="text-red-500 font-poppins text-[12px]">{errors.email.message}</span>}
							</div>
						</div>

						{/* Second Row */}
						<div className="flex flex-row flex-wrap space-x-5">
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="age" className="mb-3 font-poppins">
									Age<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name="age"
									control={control}
									rules={{ required: "Age is required", pattern: { value: /^(1[89]|[2-9]\d)$/, message: "Invalid age" } }}
									render={({ field }) => (
										<Input
											{...field}
											id="age"
											placeholder="Enter Age"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.age && <span className="text-red-500 text-[12px]">{errors.age.message}</span>}
							</div>
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="gender" className="mb-3 font-poppins">
									Gender<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name="gender"
									control={control}
									rules={{ required: "Gender is required" }}
									render={({ field }) => (
										<select
											{...field}
											id="gender"
											className="w-full p-2 border rounded-lg text-[14px] font-poppins"
										>
											<option value="">Select Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
											<option value="Other">Other</option>
										</select>
									)}
								/>
								{errors.gender && <span className="text-red-500 text-[12px]">{errors.gender.message}</span>}
							</div>
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="wing" className="mb-3 font-poppins">
									Wing<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name="wing"
									control={control}
									rules={{ required: "Wing is required" }}
									render={({ field }) => (
										<Input
											{...field}
											id="wing"
											placeholder="Enter Your Wing"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.wing && <span className="text-red-500 text-[12px]">{errors.wing.message}</span>}
							</div>
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="unit" className="mb-3 font-poppins">
									Unit<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name="unit"
									control={control}
									rules={{ required: "unit is required" }}
									render={({ field }) => (
										<Input
											{...field}
											id="unit"
											placeholder="Enter Your unit"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.unit && <span className="text-red-500 ">{errors.unit.message}</span>}
							</div>
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="relation" className="mb-3 font-poppins">
									Relation<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name="relation"
									control={control}
									rules={{ required: "relation is required" }}
									render={({ field }) => (
										<Input
											{...field}
											id="relation"
											placeholder="Enter Your relation"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.relation && <span className="text-red-500 text-[12px]">{errors.relation.message}</span>}
							</div>
						</div>
					</div>
				</div>

				{/* Document Uploads */}
				<div className="grid grid-cols-4 gap-4">
					<div>
						<span className="text-left text-md font-thin">
							Upload Aadhar Card (Front Side)
						</span>
						<div className="border-2 border-dashed border-gray-400 p-6 rounded text-center mt-2">
							<Button variant="link">
								Upload a file or drag and drop
							</Button>
							<p className="text-xs mt-1">
								PNG, JPG, GIF up to 10MB
							</p>
						</div>
					</div>

					<div>
						<span className="text-left text-md font-thin">
							Upload Aadhar Card (Back Side)
						</span>
						<div className="border-2 border-dashed border-gray-400 p-6 rounded text-center mt-2">
							<Button variant="link">
								Upload a file or drag and drop
							</Button>
							<p className="text-xs mt-1">
								PNG, JPG, GIF up to 10MB
							</p>
						</div>
					</div>

					<div>
						<span className="text-left text-md font-thin">
							Address Proof (Vera Bill OR Light Bill)
						</span>
						<div className="border-2 border-dashed border-gray-400 p-6 rounded text-center mt-2">
							<Button variant="link">
								Upload a file or drag and drop
							</Button>
							<p className="text-xs mt-1">
								PNG, JPG, GIF up to 10MB
							</p>
						</div>
					</div>

					<div>
						<span className="text-left text-md font-thin">
							Rent Agreement
						</span>
						<div className="border-2 border-dashed border-gray-400 p-6 rounded text-center mt-2">
							<Button variant="link">
								Upload a file or drag and drop
							</Button>
							<p className="text-xs mt-1">
								PNG, JPG, GIF up to 10MB
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
