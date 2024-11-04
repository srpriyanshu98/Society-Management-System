import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
		setSocieties([...societies, newSociety]);
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
					{selectedValue || "Select society"}
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
						<CreateSociety onCreateSociety={handleCreateSociety} />
					</DialogContent>
				</Dialog>
			</SelectContent>
		</Select>
	);
}
