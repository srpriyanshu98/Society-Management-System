import { Controller } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function OwnerDetail({ control, errors }) {
	return (
		<Card className="p-4 pt-10 rounded-xl mb-2">
			<CardContent className="space-y-4">
				<div className="space-y-6">
					<div className="grid grid-cols-3 gap-8">
						{/* Full Name */}
						<div className="flex flex-col">
							<Label htmlFor="OwnerFullName" className="mb-3">
								Owner Full Name<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
									name="OwnerFullName"
									control={control}
									rules={{ required: "Owner Full Name is required" }}
									render={({ field }) => (
										<Input
											{...field}
											id="OwnerFullName"
											placeholder="Enter Owner Full Name"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.OwnerFullName && <span className="text-red-500 font-poppins text-xs">{errors.OwnerFullName.message}</span>}
						</div>

						{/* Phone Number */}
						<div className="flex flex-col">
							<Label htmlFor="OwnerPhone" className="mb-3">
								Owner Phone<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
									name="OwnerPhone"
									control={control}
									rules={{ required: "Owner Phone is required" }}
									render={({ field }) => (
										<Input
											{...field}
											id="OwnerPhone"
											placeholder="Enter Your Owner Phone"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.OwnerPhone && <span className="text-red-500 font-poppins text-xs">{errors.OwnerPhone.message}</span>}
						</div>

						{/* Email Address */}
						<div className="flex flex-col">
							<Label htmlFor="OwnerAddress" className="mb-3">
								Owner Address<span className="text-[#E74C3C]">*</span>
							</Label>
							<Controller
									name="OwnerAddress"
									control={control}
									rules={{ required: "Owner Address is required" }}
									render={({ field }) => (
										<Input
											{...field}
											id="OwnerAddress"
											placeholder="Enter Your Owner Address"
											className="rounded-lg"
										/>
									)}
								/>
								{errors.OwnerAddress && <span className="text-red-500 font-poppins text-xs">{errors.OwnerAddress.message}</span>}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
