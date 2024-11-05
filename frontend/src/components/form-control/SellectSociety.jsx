import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import CreateSociety from "@/components/form-control/society";

export default function SelectSociety() {
	const [selectedValue, setSelectedValue] = useState("");
	const [societies, setSocieties] = useState([]);

	const handleCreateSociety = (newSociety) => {
		const uniqueValue = `${newSociety.label
			.toLowerCase()
			.replace(/\s+/g, "-")}-${Date.now()}`;
		const societyWithUniqueValue = { ...newSociety, value: uniqueValue };
		setSocieties([...societies, societyWithUniqueValue]);
		setSelectedValue(uniqueValue); // Set the newly created society as the selected value
	};

	return (
		<Select
			value={selectedValue}
			onValueChange={(value) => setSelectedValue(value)}
		>
			<SelectTrigger>
				<SelectValue
					placeholder="Select society"
					className="rounded-xl"
				>
					{selectedValue
						? societies.find(
								(society) => society.value === selectedValue
						  ).label
						: "Select society"}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{societies.map((society) => (
						<SelectItem key={society.value} value={society.value}>
							{society.label}
						</SelectItem>
					))}
				</SelectGroup>

				{/* Create Society */}
				<Dialog>
					<DialogTrigger className="w-full bg-gradient-to-r from-orange-600 to-orange-400 h-[51px] rounded-md text-white mt-2">
						Create Society
					</DialogTrigger>
					<DialogContent>
						<DialogTitle></DialogTitle>
						<CreateSociety onCreateSociety={handleCreateSociety} />
					</DialogContent>
				</Dialog>
			</SelectContent>
		</Select>
	);
}
