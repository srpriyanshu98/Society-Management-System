import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function AddResidentDialog({ isOpen, onClose, onSave }) {
	const [unitStatus, setUnitStatus] = useState("");
	const [confirm, setConfirm] = useState(false);
	const [unitStatusError, setUnitStatusError] = useState("");
	const [confirmError, setConfirmError] = useState("");

	const navigate = useNavigate();

	// const router = useRoutes();
	const handleSave = () => {
		let valid = true;

		// Clear previous errors
		setUnitStatusError("");
		setConfirmError("");

		// Validation for unit status
		if (!unitStatus) {
			setUnitStatusError("Please select a unit status.");
			valid = false;
		}

		// Validation for confirmation checkbox
		if (!confirm) {
			setConfirmError("Please confirm the option.");
			valid = false;
		}

		// If everything is valid, proceed to save
		if (valid) {
			onSave(unitStatus);
			onClose();
		}
		navigate("/resident-form");
	};

	// Handle changing the unit status
	const handleUnitStatusChange = (value) => {
		setUnitStatus(value);
		setUnitStatusError(""); // Clear the error when a selection is made
	};

	// Handle changing the confirmation checkbox
	const handleConfirmChange = () => {
		setConfirm(!confirm);
		setConfirmError(""); // Clear the error when the checkbox is checked
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogContent className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Residence Status
					</label>
					<div className="flex items-center space-x-4 mt-2">
						<label className="border w-36 p-2 rounded-lg ">
							<input
								type="radio"
								name="unitStatus"
								value="Occupied"
								checked={unitStatus === "Occupied"}
								onChange={() =>
									handleUnitStatusChange("Occupied")
								}
							/>
							<span className="ml-2">Occupied</span>
						</label>
						<label className="border w-36 p-2 rounded-lg ">
							<input
								type="radio"
								name="unitStatus"
								value="Vacant"
								checked={unitStatus === "Vacant"}
								onChange={() =>
									handleUnitStatusChange("Vacant")
								}
							/>
							<span className="ml-2">Vacant</span>
						</label>
					</div>
					{/* Show error message if unit status is not selected */}
					{unitStatusError && (
						<p className="text-red-500 text-sm mt-1">
							{unitStatusError}
						</p>
					)}

					<div className="flex items-center space-x-2 mt-4">
						<input
							type="checkbox"
							id="confirmCheckbox"
							checked={confirm}
							onChange={handleConfirmChange}
						/>
						<label htmlFor="confirmCheckbox">
							By submitting, you agree to select Occupied
						</label>
					</div>
					{/* Show error message if confirm is not checked */}
					{confirmError && (
						<p className="text-red-500 text-sm mt-1">
							{confirmError}
						</p>
					)}
				</div>
				<div className="space-x-28 mt-4">
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
						to="/resident"
						onClick={handleSave}
						className="w-40"
					>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
