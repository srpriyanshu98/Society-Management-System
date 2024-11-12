import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Controller } from "react-hook-form";

export default function VehicleCounting({ control, errors }) {
	const [vehicleCount, setVehicleCount] = useState(0);

	return (
		<Card className="shadow-md rounded-xl mt-2">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="text-[16px] font-poppins">Vehicle Counting :</CardTitle>
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
									Vehicle Type<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name={`member[${i}].vehicle`}
									control={control}
									rules={{ required: "Vehicle Type is required" }}
									render={({ field }) => (
										<select
											{...field}
											id="vehicle"
											className="w-full p-2 border rounded-lg text-[14px] font-poppins"
										>
											<option value="">Select Vehicle</option>
											<option value="Two Wheelers">Two Wheelers</option>
											<option value="Four Wheelers">Four Wheelers</option>

										</select>
									)}
								/>
								{errors.member?.[i]?.vehicle && <span className="text-red-500 text-[12px]">{errors.member[i].vehicle.message}</span>}
							</div>
							<div className="mb-5">
								<Label className="text-left">
									Vehicle Name<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name={`vehicle[${i}].vehicleName`}
									control={control}
									rules={{ required: "Vehicle Name is required" }}
									render={({ field }) => (
										<Input
											{...field}
											type="text"
											className="border rounded-xl w-full"
											placeholder="Enter Your Vehicle Name"
										/>
									)}
								/>
								{errors.vehicle?.[i]?.vehicleName && <span className="text-red-500 text-[12px]">{errors.vehicle[i].vehicleName.message}</span>}
							</div>
							<div className="mb-5">
								<Label className="text-left">
									Vehicle Number<span className="text-[#E74C3C]">*</span>
								</Label>
								<Controller
									name={`vehicle[${i}].vehicleNumber`}
									control={control}
									rules={{ required: "Vehicle Number is required" }}
									render={({ field }) => (
										<Input
											{...field}
											type="text"
											className="border rounded-xl w-full"
											placeholder="Enter Your Vehicle Number"
										/>
									)}
								/>
								{errors.vehicle?.[i]?.vehicleNumber && <span className="text-red-500 text-[12px]">{errors.vehicle[i].vehicleNumber.message}</span>}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
