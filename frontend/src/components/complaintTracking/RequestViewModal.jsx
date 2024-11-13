import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getPriorityColor, getStatusColor } from "@/data/requestData";

export default function RequestViewModal({ isOpen, onClose, request }) {
	if (!request) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>View Request</DialogTitle>
				</DialogHeader>
				<div className="flex items-center space-x-4">
					<Avatar className="w-10 h-10">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt={request.RequesterName}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="text-lg font-semibold font-poppins">
							{request.RequesterName}
						</h3>
						<p className="text-sm text-gray-500">{request.date}</p>
					</div>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Request Name
					</p>
					<p className="text-gray-600">{request.RequestName}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Description
					</p>
					<p className="text-gray-600">{request.description}</p>
				</div>
				<div className="mt-4 flex space-x-4">
					<div className="flex flex-col items-center">
						<p className="text-gray-700 font-semibold font-poppins">
							Wing
						</p>
						<span className="bg-blue-100 text-blue-600 ps-5 pe-5 pt-2 pb-2 rounded-full mt-2 ">
							{request.wing}
						</span>
					</div>
					<div className="flex flex-col items-center">
						<p className="text-gray-700 font-semibold font-poppins">
							Unit
						</p>
						<span className="ps-5 pe-5 pt-2 pb-2 mt-2 ">
							{request.unit}
						</span>
					</div>
					<div className="flex flex-col items-center">
						<p className="text-gray-700 font-semibold font-poppins">
							Priority
						</p>
						<span
							className={`ps-5 pe-5 pt-2 pb-2 rounded-full text-white mt-2 ${getPriorityColor(
								request.priority
							)}`}
						>
							{request.priority}
						</span>
					</div>
					<div className="flex flex-col items-center">
						<p className="text-gray-700 font-semibold font-poppins">
							Status
						</p>
						<span
							className={`ps-5 pe-5 pt-2 pb-2 rounded-full  mt-2 ${getStatusColor(
								request.status
							)}`}
						>
							{request.status}
						</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
