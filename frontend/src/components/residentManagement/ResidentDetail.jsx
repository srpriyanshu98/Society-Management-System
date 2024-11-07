import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ResidentDetail() {
	return (
		<Card className="p-4">
			<CardHeader>
				<CardTitle>Resident Details</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Personal Information */}
				<div className="flex flex-row gap-4 mb-8">
					{/* Profile Photo */}
					<div className="flex-col items-center">
						<div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
							<span className="text-gray-500">📷</span>
						</div>
						<Button variant="link" className="text-blue-700">
							Add Photo
						</Button>
					</div>
					<div className="space-y-6 ms-5">
						{/* First Row */}
						<div className="flex flex-row space-x-8">
							<div className="flex flex-col w-[430px]">
								<Label htmlFor="fullName" className="mb-3">
									Full Name*
								</Label>
								<Input
									id="fullName"
									placeholder="Enter Full Name"
									className="rounded-lg"
								/>
							</div>
							<div className="flex flex-col w-[430px]">
								<Label htmlFor="phoneNumber" className="mb-3">
									Phone Number*
								</Label>
								<Input
									id="phoneNumber"
									placeholder="+91"
									className="rounded-lg"
								/>
							</div>
							<div className="flex flex-col w-[430px]">
								<Label htmlFor="email" className="mb-3">
									Email Address
								</Label>
								<Input
									id="email"
									placeholder="Enter Email Address"
									className="rounded-lg"
								/>
							</div>
						</div>

						{/* Second Row */}
						<div className="flex flex-row flex-wrap space-x-5">
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="age" className="mb-3">
									Age*
								</Label>
								<Input
									id="age"
									placeholder="Enter Age"
									className="rounded-lg"
								/>
							</div>
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="gender" className="mb-3">
									Gender*
								</Label>
								<select
									id="gender"
									className="w-full p-2 border rounded-lg "
								>
									<option>Select Gender</option>
									<option>Male</option>
									<option>Female</option>
									<option>Other</option>
								</select>
							</div>
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="wing" className="mb-3">
									Wing*
								</Label>
								<Input
									id="wing"
									placeholder="Enter Wing"
									className="rounded-lg"
								/>
							</div>
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="unit" className="mb-3">
									Unit*
								</Label>
								<Input
									id="unit"
									placeholder="Enter Unit"
									className="rounded-lg"
								/>
							</div>
							<div className="flex flex-col w-[255px]">
								<Label htmlFor="relation" className="mb-3">
									Relation*
								</Label>
								<Input
									id="relation"
									placeholder="Enter Relation"
									className="rounded-lg"
								/>
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
						<div className="border-4 border-dashed border-gray-400 p-6 rounded text-center mt-2">
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
						<div className="border border-dashed p-4 rounded text-center mt-2">
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
						<div className="border border-dashed p-4 rounded text-center mt-2">
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
						<div className="border border-dashed p-4 rounded text-center mt-2">
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
