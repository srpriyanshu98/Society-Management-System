import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export default function VehicleCounting() {
	const [vehicleCount, setVehicleCount] = useState(0);

	return (
		<Card className="shadow-md rounded-xl mt-2">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="text-lg">Vehicle Counting:</CardTitle>
					<div>
						<span className="me-3">Select Vehicle</span>
						<select
							className="border rounded-lg w-14 p-2"
							value={vehicleCount}
							onChange={(e) => setVehicleCount(e.target.value)}
						>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
					</div>
				</div>
			</CardHeader>

			<Separator />

			<CardContent>
				{/* Dynamically render vehicle input fields based on selected count */}
				<div className="grid grid-cols-2 gap-4 mt-4">
					{Array.from({ length: vehicleCount }).map((_, i) => (
						<div
							key={i}
							className="grid grid-cols-3 gap-4 mt-4 border rounded-lg p-4"
						>
							<div className="mb-5">
								<Label className="text-left">
									Vehicle Type*
								</Label>
								<Input
									type="text"
									className="border rounded-xl mt-3 p-2 w-full"
									placeholder="Enter Vehicle Type"
								/>
							</div>
							<div className="mb-5">
								<Label className="text-left">
									Vehicle Name*
								</Label>
								<Input
									type="text"
									className="border rounded-xl mt-3 p-2 w-full"
									placeholder="Enter Vehicle Name"
								/>
							</div>
							<div className="mb-5">
								<Label className="text-left">
									Vehicle Number*
								</Label>
								<Input
									type="text"
									className="border rounded-xl mt-3 p-2 w-full"
									placeholder="Enter Vehicle Number"
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
