import { EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileSheetContent() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="bg-gray-200 p-2 w-8 h-8 rounded-lg">
					<img src="/src/assets/view.svg" alt="View" />
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="text-center">
					<SheetTitle className="text-lg font-bold">
						View Owner Details
					</SheetTitle>
				</SheetHeader>
				{/* Profile Image and Basic Details */}
				<div className="text-center mt-4 flex justify-center items-center">
					<div className="flex items-center flex-col mt-5">
						<Avatar className="w-24 h-24">
							<AvatarImage
								src="https://github.com/shadcn.png"
								alt="@shadcn"
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<h2 className="mt-2 text-xl font-semibold">
							Roger Lubin
						</h2>
						<p className="text-gray-500">RogerLubin@gmail.com</p>
					</div>
				</div>
				{/* Basic Information */}
				<div className="bg-gray-100 rounded-lg p-4 mt-4 space-y-2">
					<div className="flex justify-between">
						<span className="text-gray-600">Wing</span>
						<span className="font-medium">A</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Unit</span>
						<span className="font-medium">101</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Age</span>
						<span className="font-medium">20</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Gender</span>
						<span className="font-medium">Male</span>
					</div>
				</div>

				{/* Document Section */}
				<div className="bg-gray-100 rounded-lg p-4 mt-4">
					<h3 className="font-semibold text-gray-700">Document</h3>
					<div className="flex items-center justify-between mt-2 p-2 bg-white rounded-lg shadow-sm">
						<div className="flex items-center">
							<img
								src="/src/assets/jpg.svg"
								alt="Document Icon"
								className="w-6 h-6 mr-2"
							/>
							<div>
								<p className="text-sm font-medium">
									Aadharcard Front Side.JPG
								</p>
								<p className="text-xs text-gray-400">3.5 MB</p>
							</div>
						</div>
						<button>
							<EyeIcon />
						</button>
					</div>
					<div className="flex items-center justify-between mt-2 p-2 bg-white rounded-lg shadow-sm">
						<div className="flex items-center">
							<img
								src="/src/assets/document.svg"
								alt="Document Icon"
								className="w-6 h-6 mr-2"
							/>
							<div>
								<p className="text-sm font-medium">
									Address Proof Front Side.PDF
								</p>
								<p className="text-xs text-gray-400">3.5 MB</p>
							</div>
						</div>
						<button>
							<EyeIcon />
						</button>
					</div>
				</div>

				{/* Member Counting Section */}
				<div className="bg-white rounded-lg mt-4">
					<div className="bg-blue-500 text-white p-2 rounded-t-lg flex justify-between items-center">
						<h3 className="font-semibold">Member Counting</h3>
						<span className="bg-white text-blue-500 px-2 py-1 rounded-full text-sm">
							02
						</span>
					</div>
					<div className="p-4 space-y-2">
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>
								<span className="font-medium">First Name:</span>{" "}
								Roger Lubin
							</div>
							<div>
								<span className="font-medium">Phone No:</span>{" "}
								9123455555
							</div>
							<div>
								<span className="font-medium">Age:</span> 20
							</div>
							<div>
								<span className="font-medium">Gender:</span>{" "}
								Male
							</div>
							<div>
								<span className="font-medium">Relation:</span>{" "}
								Brother
							</div>
						</div>
						<hr className="my-2" />
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>
								<span className="font-medium">First Name:</span>{" "}
								Roger Lubin
							</div>
							<div>
								<span className="font-medium">Phone No:</span>{" "}
								9123455555
							</div>
							<div>
								<span className="font-medium">Age:</span> 20
							</div>
							<div>
								<span className="font-medium">Gender:</span>{" "}
								Male
							</div>
							<div>
								<span className="font-medium">Relation:</span>{" "}
								Brother
							</div>
						</div>
					</div>
				</div>

				<SheetFooter className="mt-4">
					<SheetClose asChild>
						<Button
							type="button"
							className="w-full bg-blue-500 text-white py-2 rounded-lg"
						>
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
