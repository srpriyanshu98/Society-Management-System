import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

export default function SecurityProtocolDialog({ isOpen, onClose }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	// Check if both title and description have values
	const isSaveEnabled = title.trim() !== "" && description.trim() !== "";

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-85">
				<DialogHeader>
					<DialogTitle>Security Protocol</DialogTitle>
				</DialogHeader>
				<Separator className="w-45" />
				<div className="flex flex-col space-y-4">
					<Label>
						Title<span className="text-red-500">*</span>
					</Label>
					<div className="relative">
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full p-2 border rounded-lg"
							placeholder="Enter Title"
						/>
					</div>
					<Label>
						Description<span className="text-red-500">*</span>
					</Label>
					<div className="relative">
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
							rows="3"
							placeholder="Enter description"
						/>
					</div>
				</div>
				<div className="space-x-5 mt-4">
					{/* Cancel Button */}
					<Button
						variant="secondary"
						onClick={onClose}
						className="w-40"
					>
						Cancel
					</Button>
					{/* Save Button */}
					<Button
						className="w-40"
						disabled={!isSaveEnabled} // Disable if inputs are empty
					>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
