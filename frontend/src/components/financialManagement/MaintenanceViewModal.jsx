import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function MaintenanceViewModal({ isOpen, onClose, maintenance }) {
	if (!maintenance) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>View Maintenance Details</DialogTitle>
				</DialogHeader>
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
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Unit Number
					</p>
					<p className="text-gray-600">{maintenance.unitNumber}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Status
					</p>
					<p className="text-gray-600">{maintenance.status}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Phone Number
					</p>
					<p className="text-gray-600">{maintenance.phoneNumber}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Amount
					</p>
					<p className="text-gray-600">{maintenance.amount}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Penalty
					</p>
					<p className="text-gray-600">{maintenance.penalty}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Maintenance Status
					</p>
					<p className="text-gray-600">
						{maintenance.maintenanceStatus}
					</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Payment Mode
					</p>
					<p className="text-gray-600">{maintenance.paymentMode}</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
