import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

function ViewSecurityProtocol({ isOpen, onClose, log }) {
	if (!log) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md rounded-xl">
				<DialogHeader>
					<DialogTitle>View Security Protocol</DialogTitle>
				</DialogHeader>
				<Separator className="w-45" />
				<div className="mt-2">
					<p className="text-gray-700 font-semibold font-poppins">
						Title
					</p>
					<p className="text-gray-600">{log.Title}</p>
				</div>
				<div className="mt-2">
					<p className="text-gray-700 font-semibold font-poppins">
						Description
					</p>
					<p className="text-gray-600">{log.description}</p>
				</div>
				<div className="mt-2 flex space-x-4">
					<div className="flex flex-col">
						<p className="text-gray-700 font-semibold font-poppins">
							Date
						</p>
						<span className="pe-5 pb-2 mt-2 ">{log.date}</span>
					</div>
					<div className="flex flex-col">
						<p className="text-gray-700 font-semibold font-poppins">
							Time
						</p>
						<span className="pe-5 pb-2 mt-2 ">{log.Time}</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ViewSecurityProtocol;
