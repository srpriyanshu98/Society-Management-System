import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export default function MaintenanceViewModal({ isOpen, onClose, maintenance }) {
	if (!maintenance) return null;

	const statusColor =
		maintenance.status === "Owner"
			? "bg-blue-100 text-blue-800"
			: "bg-pink-100 text-pink-800";
	const maintenanceStatusColor =
		maintenance.maintenanceStatus === "Done"
			? "bg-green-100 text-green-800"
			: "bg-yellow-100 text-yellow-800";
	const paymentModeColor =
		maintenance.paymentMode === "Online"
			? "bg-blue-100 text-blue-800"
			: "bg-gray-100 text-gray-800";

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>View Maintenance Details</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="flex items-center space-x-4">
					<Avatar className="w-12 h-12">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt={maintenance.name}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="text-lg font-semibold font-poppins">
							{maintenance.name}
						</h3>
						<p className="text-sm text-gray-500">
							{maintenance.date}
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4">
					<div>
						<p className="text-gray-700 font-semibold font-poppins">
							Unit Number
						</p>
						<p className="text-gray-600">
							{maintenance.unitNumber}
						</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold font-poppins">
							Status
						</p>
						<p
							className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
						>
							<img
								src={
									maintenance.status === "Owner"
										? "./src/assets/owner.svg"
										: "./src/assets/tenant.svg"
								}
								className="w-5 h-5 mr-2"
								alt={`${maintenance.status} Icon`}
							/>
							{maintenance.status}
						</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold font-poppins">
							Amount
						</p>
						<p className="text-green-500">{maintenance.amount}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold font-poppins">
							Penalty
						</p>
						<p className="text-red-500">{maintenance.penalty}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold font-poppins">
							Status
						</p>
						<p
							className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${maintenanceStatusColor}`}
						>
							<img
								src={
									maintenance.maintenanceStatus === "Done"
										? "./src/assets/verify.svg"
										: "./src/assets/timer.svg"
								}
								className="w-5 h-5 mr-2"
								alt="Status Icon"
							/>
							{maintenance.maintenanceStatus}
						</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold font-poppins">
							Payment
						</p>
						<p
							className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${paymentModeColor}`}
						>
							<img
								src={
									maintenance.paymentMode === "Online"
										? "./src/assets/wallet-2.svg"
										: "./src/assets/wallet-1.svg"
								}
								className="w-5 h-5 mr-2"
								alt="Payment Icon"
							/>
							{maintenance.paymentMode}
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
