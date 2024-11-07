import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function VehicleCounting() {
	const [vehicleCount, setVehicleCount] = useState(0);
	return (
		<Card className="shadow-md rounded-lg">
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
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{/* Card Content can go here if needed */}
			</CardContent>
		</Card>
	);
}
