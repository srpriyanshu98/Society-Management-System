import { getPriorityColor, getStatusColor } from "@/data/complaintsData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

function ComplaintViewModal({ isOpen, onClose, complaint }) {
	if (!complaint) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>View Complaint</DialogTitle>
				</DialogHeader>
				<div className="flex items-center space-x-4">
					<img
						src={complaint.complainerImg}
						alt={complaint.complainerName}
						className="w-12 h-12 rounded-full object-cover"
					/>
					<div>
						<h3 className="text-lg font-semibold">
							{complaint.complainerName}
						</h3>
						<p className="text-sm text-gray-500">
							{complaint.date}
						</p>
					</div>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold">Request Name</p>
					<p className="text-gray-600">{complaint.complaintName}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold">Description</p>
					<p className="text-gray-600">{complaint.description}</p>
				</div>
				<div className="mt-4 flex space-x-4">
					<div className="flex flex-col items-center">
						<p className="text-gray-700 font-semibold">Wing</p>
						<span className="bg-blue-100 text-blue-600 ps-5 pe-5 pt-2 pb-2 rounded-full mt-2 ">
							{complaint.wing}
						</span>
					</div>
					<div className="flex flex-col items-center">
						<p className="text-gray-700 font-semibold">Unit</p>
						<span className="ps-5 pe-5 pt-2 pb-2 mt-2 ">
							{complaint.unit}
						</span>
					</div>
					<div className="flex flex-col items-center">
						<p className="text-gray-700 font-semibold">Priority</p>
						<span
							className={`ps-5 pe-5 pt-2 pb-2 rounded-full text-white mt-2 ${getPriorityColor(
								complaint.priority
							)}`}
						>
							{complaint.priority}
						</span>
					</div>
					<div className="flex flex-col items-center">
						<p className="text-gray-700 font-semibold">Status</p>
						<span
							className={`ps-5 pe-5 pt-2 pb-2 rounded-full  mt-2 ${getStatusColor(
								complaint.status
							)}`}
						>
							{complaint.status}
						</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ComplaintViewModal;
