import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function OwnerDetail() {
	return (
		<Card className="p-4 pt-10 rounded-xl mb-2">
			<CardContent className="space-y-4">
				<div className="space-y-6">
					<div className="grid grid-cols-3 gap-8">
						{/* Full Name */}
						<div className="flex flex-col">
							<Label htmlFor="fullName" className="mb-3">
								Owner Full Name*
							</Label>
							<Input
								id="fullName"
								placeholder="Enter Full Name"
								className="rounded-lg"
							/>
						</div>

						{/* Phone Number */}
						<div className="flex flex-col">
							<Label htmlFor="phoneNumber" className="mb-3">
								Owner Phone*
							</Label>
							<Input
								id="phoneNumber"
								placeholder="+91"
								className="rounded-lg"
							/>
						</div>

						{/* Email Address */}
						<div className="flex flex-col">
							<Label htmlFor="email" className="mb-3">
								Owner Address*
							</Label>
							<Input
								id="email"
								placeholder="Enter Email Address"
								className="rounded-lg"
							/>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
