import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";

export default function MembersCounting({ control, errors }) {
	const [memberCount, setMemberCount] = useState(0);

	return (
		<Card className="shadow-md rounded-xl mt-2">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="text-[16px] font-poppins">
						Member Counting :
						<span className="text-[#A7A7A7] text-[16px] font-poppins">
							{" "}
							(Other Members)
						</span>
					</CardTitle>
					<div>
						<span className="me-3">Select Member</span>
						<select
							className="border rounded-lg w-14 p-2"
							value={memberCount}
							onChange={(e) => setMemberCount(e.target.value)}
						>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5</option>
						</select>
					</div>
				</div>
			</CardHeader>

			<Separator />

			<CardContent>
				{/* Dynamically render member input fields based on selected count */}
				{Array.from({ length: memberCount }).map((_, i) => (
					<div key={i} className="grid grid-cols-6  gap-4 mt-4">
						<div className="mb-5">
							<Label className="text-left">
								Full Name
								<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
								name={`member[${i}].fullName`}
								control={control}
								rules={{ required: "Full Name is required" }}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										className="border rounded-xl w-full"
										placeholder="Enter Full Name"
									/>
								)}
							/>
							{errors.member?.[i]?.fullName && (
								<span className="text-red-500 text-xs">
									{errors.member[i].fullName.message}
								</span>
							)}
						</div>
						<div className="mb-5">
							<Label className="text-left">
								Phone Number
								<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
								name={`member[${i}].PhoneNumber`}
								control={control}
								rules={{ required: "Phone Number is required" }}
								render={({ field }) => (
									<Input
										{...field}
										type="number"
										className="border rounded-xl w-full"
										placeholder="Enter Your Phone Number"
									/>
								)}
							/>
							{errors.member?.[i]?.PhoneNumber && (
								<span className="text-red-500 text-xs">
									{errors.member[i].PhoneNumber.message}
								</span>
							)}
						</div>
						<div className="mb-5">
							<Label className="text-left">
								Email Address
								<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
								name={`member[${i}].email`}
								control={control}
								rules={{
									required: "email is required",
									pattern: {
										value: /^\S+@\S+\.\S+$/,
										message: "Invalid email",
									},
								}}
								render={({ field }) => (
									<Input
										{...field}
										id="email"
										placeholder="Enter Your email"
										className="rounded-lg"
									/>
								)}
							/>
							{errors.member?.[i]?.email && (
								<span className="text-red-500 text-xs">
									{errors.member[i].email.message}
								</span>
							)}
						</div>
						<div className="mb-5">
							<Label className="text-left">
								Age<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
								name={`member[${i}].age`}
								control={control}
								rules={{
									required: "Age is required",
									pattern: {
										value: /^(1[89]|[2-9]\d)$/,
										message: "Invalid age",
									},
								}}
								render={({ field }) => (
									<Input
										{...field}
										id="age"
										placeholder="Enter Age"
										className="rounded-lg"
									/>
								)}
							/>
							{errors.member?.[i]?.age && (
								<span className="text-red-500 text-xs">
									{errors.member[i].age.message}
								</span>
							)}
						</div>
						<div className="mb-5">
							<Label className="text-left">
								Gender<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
								name={`member[${i}].gender`}
								control={control}
								rules={{ required: "Gender is required" }}
								render={({ field }) => (
									<select
										{...field}
										id="gender"
										className="w-full p-2 border rounded-lg"
									>
										<option value="">Select Gender</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</select>
								)}
							/>
							{errors.member?.[i]?.gender && (
								<span className="text-red-500 text-xs">
									{errors.member[i].gender.message}
								</span>
							)}
						</div>
						<div className="mb-5">
							<Label className="text-left">
								Relation
								<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
								name={`member[${i}].relation`}
								control={control}
								rules={{ required: "relation is required" }}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										className="border rounded-xl w-full"
										placeholder="Enter Your relation"
									/>
								)}
							/>
							{errors.member?.[i]?.relation && (
								<span className="text-red-500 text-xs">
									{errors.member[i].relation.message}
								</span>
							)}
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
