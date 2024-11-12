import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function AddResidentDialog({
	isOpen,
	onClose,
	onSave,
	isEditMode,
}) {
	const [unitStatus, setUnitStatus] = useState(isEditMode ? "Occupied" : "");
	const [confirm, setConfirm] = useState(false);
	const [unitStatusError, setUnitStatusError] = useState("");
	const [confirmError, setConfirmError] = useState("");

	const navigate = useNavigate();

	const handleSave = () => {
		let valid = true;

		setUnitStatusError("");
		setConfirmError("");

		if (!unitStatus) {
			setUnitStatusError("Please select a unit status.");
			valid = false;
		}

		if (!confirm) {
			setConfirmError("Please confirm the option.");
			valid = false;
		}

		if (valid) {
			onSave(unitStatus);
			onClose();
		}
		navigate("/resident-form");
	};

	const handleUnitStatusChange = (value) => {
		setUnitStatus(value);
		setUnitStatusError("");
	};

	const handleConfirmChange = () => {
		setConfirm(!confirm);
		setConfirmError("");
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogContent className="space-y-4">
				<div>
					<label className="block text-[20px] font-semibold font-poppins leading-[30px] text-left text-gray-900 decoration-skip-ink-auto">
						Residence Status
					</label>
					<div className="flex items-center space-x-4 mt-2">
						<label className="border-[1px] p-2 rounded-lg w-36 border-[linear-gradient(90deg,_#FE512E_0%,_#F09619_100%)]">
							<input
								type="radio"
								name="unitStatus"
								className="font-semibold font-poppins"
								value="Occupied"
								checked={unitStatus === "Occupied"}
								onChange={() => handleUnitStatusChange("Occupied")}
								disabled={isEditMode}
							/>
							<span className="ml-2">Occupied</span>
						</label>

						<label className="border w-36 p-2 rounded-lg">
							<input
								type="radio"
								name="unitStatus"
								className="font-semibold font-poppins"
								value="Vacant"
								checked={unitStatus === "Vacant"}
								onChange={() => { } /* Prevent any action on change */}
								disabled={isEditMode || unitStatus === "Occupied"} // Disable if "Occupied" is selected
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
						<label
							htmlFor="confirmCheckbox"
							className="text-[#A7A7A7] text-sm font-normal leading-[21px] font-poppins text-left decoration-skip-ink-auto"
						>
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
