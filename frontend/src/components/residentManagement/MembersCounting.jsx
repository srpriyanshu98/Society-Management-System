import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function MembersCounting() {
	const [memberCount, setMemberCount] = useState(0);

	return (
		<Card className="shadow-md rounded-xl mt-2">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="text-lg">Member Counting:</CardTitle>
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
							<Label className="text-left">Full Name*</Label>
							<Input
								type="text"
								className="border rounded-xl mt-3 p-2 w-full"
								placeholder="Enter Full Name"
							/>
						</div>
						<div className="mb-5">
							<Label className="text-left">Phone Number*</Label>
							<Input
								type="text"
								className="border rounded-xl mt-3 p-2 w-full"
								placeholder="Enter Phone Number"
							/>
						</div>
						<div className="mb-5">
							<Label className="text-left">Email Address*</Label>
							<Input
								type="email"
								className="border rounded-xl mt-3 p-2 w-full"
								placeholder="Enter Email Address"
							/>
						</div>
						<div className="mb-5">
							<Label className="text-left">Age*</Label>
							<Input
								type="number"
								className="border rounded-xl mt-3 p-2 w-full"
								placeholder="Enter Age"
							/>
						</div>
						<div className="mb-5">
							<Label className="text-left">Gender*</Label>
							<select className="border rounded-xl mt-3 p-2 w-full">
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>
						</div>
						<div className="mb-5">
							<Label className="text-left">Relation*</Label>
							<Input
								type="text"
								className="border rounded-xl mt-3 p-2 w-full"
								placeholder="Enter Relation"
							/>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
