import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function PasswordDialog({ isOpen, onClose, onSubmit }) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handlePasswordSubmit = () => {
		const isValidPassword = password === "123456"; // Replace with actual password check

		if (isValidPassword) {
			setError("");
			onSubmit();
			onClose();
		} else {
			setError("Incorrect password. Please try again.");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Set Maintenance</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<Label>Password</Label>
					<input
						type="password"
						className="w-full p-2 border border-gray-300 rounded-lg"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <p className="text-red-500 text-sm">{error}</p>}
				</div>
				<DialogFooter>
					<Button
						variant="secondary"
						onClick={onClose}
						className="w-40"
					>
						Cancel
					</Button>
					<Button onClick={handlePasswordSubmit} className="w-40">
						Submit
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
