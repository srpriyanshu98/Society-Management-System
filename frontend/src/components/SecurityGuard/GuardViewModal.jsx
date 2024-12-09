import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GuardViewModal({ isOpen, onClose, guard }) {
	if (!guard) return null;

	const shiftDate = new Date(guard.shiftDate);
	const shiftTime = new Date(`1970-01-01T${guard.shiftTime}`);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>View Security Guard</DialogTitle>
				</DialogHeader>
				<div className="flex items-center space-x-4">
					<Avatar className="w-10 h-10">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt={guard.fullName}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="text-lg font-semibold font-poppins">
							{guard.fullName}
						</h3>
						<p className="text-sm text-gray-500">
							{guard.phoneNumber}
						</p>
					</div>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Gender
					</p>
					<p
						className={`inline-flex items-center py-1 px-3 rounded-full font-semibold ${
							guard.gender === "Male"
								? "bg-blue-100 text-blue-600"
								: "bg-pink-100 text-pink-600"
						}`}
					>
						<img
							src={
								guard.gender === "Male"
									? "/assets/male.svg"
									: "/assets/female.svg"
							}
							className="w-5 h-5 mr-2"
							alt={`${guard.gender} Icon`}
						/>
						{guard.gender}
					</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Shift
					</p>
					<p
						className={`inline-flex items-center py-1 px-3 rounded-full font-semibold ${
							guard.shift === "Day"
								? "bg-yellow-100 text-yellow-600"
								: "bg-gray-800 text-white"
						}`}
					>
						<img
							src={
								guard.shift === "Day"
									? "/assets/Day.svg"
									: "/assets/Night.svg"
							}
							alt={`${guard.shift} Icon`}
							className="w-4 h-4 mr-2"
						/>
						{guard.shift}
					</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Shift Date
					</p>
					<p className="text-gray-600">
						{shiftDate instanceof Date && !isNaN(shiftDate)
							? shiftDate.toLocaleDateString()
							: "Invalid Date"}
					</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Shift Time
					</p>
					<p className="text-gray-600">
						{shiftTime instanceof Date && !isNaN(shiftTime)
							? shiftTime.toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
									hour12: true,
							  })
							: "Invalid Time"}
					</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Aadhar File
					</p>
					<p className="text-gray-600">{guard.aadharCard}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-700 font-semibold font-poppins">
						Guard guardPhoto
					</p>
					<p className="text-gray-600">{guard.guardPhoto}</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
