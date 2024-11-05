import { useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";

export default function CreateSociety({ onCreateSociety }) {
	const [societyName, setSocietyName] = useState("");
	const [societyAddress, setSocietyAddress] = useState("");
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [zipCode, setZipCode] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const newSociety = {
			label: societyName,
		};
		onCreateSociety(newSociety);
		setSocietyName("");
		setSocietyAddress("");
		setCountry("");
		setState("");
		setCity("");
		setZipCode("");
	};

	return (
		<DialogHeader>
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Create New Society
			</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Society Name */}
				<div>
					<label
						htmlFor="societyName"
						className="block text-sm font-medium text-gray-700"
					>
						Society Name<span className="text-red-500">*</span>
					</label>
					<input
						id="societyName"
						type="text"
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
						placeholder="Enter Society Name"
						value={societyName}
						onChange={(e) => setSocietyName(e.target.value)}
					/>
				</div>

				{/* Society Address */}
				<div>
					<label
						htmlFor="societyAddress"
						className="block text-sm font-medium text-gray-700"
					>
						Society Address
						<span className="text-red-500">*</span>
					</label>
					<input
						id="societyAddress"
						type="text"
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
						placeholder="Enter Address"
						value={societyAddress}
						onChange={(e) => setSocietyAddress(e.target.value)}
					/>
				</div>

				{/* Country & State */}
				<div className="flex space-x-4">
					<div className="w-1/2">
						<label
							htmlFor="country"
							className="block text-sm font-medium text-gray-700"
						>
							Country<span className="text-red-500">*</span>
						</label>
						<input
							id="country"
							type="text"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
							placeholder="Enter Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
					</div>
					<div className="w-1/2">
						<label
							htmlFor="state"
							className="block text-sm font-medium text-gray-700"
						>
							State<span className="text-red-500">*</span>
						</label>
						<input
							id="state"
							type="text"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
							placeholder="Enter State"
							value={state}
							onChange={(e) => setState(e.target.value)}
						/>
					</div>
				</div>

				{/* City & Zip Code */}
				<div className="flex space-x-4">
					<div className="w-1/2">
						<label
							htmlFor="city"
							className="block text-sm font-medium text-gray-700"
						>
							City<span className="text-red-500">*</span>
						</label>
						<input
							id="city"
							type="text"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
							placeholder="Enter City"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</div>
					<div className="w-1/2">
						<label
							htmlFor="zipCode"
							className="block text-sm font-medium text-gray-700"
						>
							Zip Code<span className="text-red-500">*</span>
						</label>
						<input
							id="zipCode"
							type="text"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
							placeholder="Enter Zip Code"
							value={zipCode}
							onChange={(e) => setZipCode(e.target.value)}
						/>
					</div>
				</div>

				{/* Buttons */}
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
