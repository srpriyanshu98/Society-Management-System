import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";

export default function Society() {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
	};
	return (
		<DialogHeader>
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Create New Society
			</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Society Name */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Society Name<span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
						placeholder="Enter Society Name"
					/>
				</div>

				{/* Society Address */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Society Address
						<span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
						placeholder="Enter Address"
					/>
				</div>

				{/* Country & State */}
				<div className="flex space-x-4">
					<div className="w-1/2">
						<label className="block text-sm font-medium text-gray-700">
							Country<span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
							placeholder="Enter Country"
						/>
					</div>
					<div className="w-1/2">
						<label className="block text-sm font-medium text-gray-700">
							State<span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
							placeholder="Enter State"
						/>
					</div>
				</div>

				{/* City & Zip Code */}
				<div className="flex space-x-4">
					<div className="w-1/2">
						<label className="block text-sm font-medium text-gray-700">
							City<span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
							placeholder="Enter City"
						/>
					</div>
					<div className="w-1/2">
						<label className="block text-sm font-medium text-gray-700">
							Zip Code<span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
							placeholder="Enter Zip Code"
						/>
					</div>
				</div>

				{/* Buttons */}
				{/* //TODO: ADD CANCLE AND SAVE FUNC.... */}
				<div className="flex justify-between items-center pt-4">
					<Button
						variant="outline"
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
						type="button"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="px-4 py-2 bg-orange-500 text-white rounded-md"
					>
						Save
					</Button>
				</div>
			</form>
		</DialogHeader>
	);
}
