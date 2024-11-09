import { useState } from "react";
import { maintenance } from "@/data/incomeAndExpense";
import { Button } from "../ui/button";
import { Card, CardDescription } from "../ui/card";
import PasswordDialog from "./PasswordDialog";
import MaintenanceDetailDialog from "./MaintenanceDetailDialog";

export default function SetMaintenance() {
	const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
	const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] =
		useState(false);

	const handleOpenPasswordDialog = () => {
		setIsPasswordDialogOpen(true);
	};

	const handlePasswordSubmit = () => {
		setIsMaintenanceDialogOpen(true); // Open the maintenance dialog after password verification
	};

	return (
		<Card className="p-4">
			<CardDescription className="flex justify-between items-center">
				<div className="grid grid-flow-col auto-cols-auto gap-4">
					{maintenance.map((item, index) => (
						<Card
							key={index}
							className="p-4 space-x-4 rounded-lg shadow-lg relative w-60"
						>
							<div
								className={`absolute left-0 top-0 bottom-0 w-2 h-14 rounded-e-lg m-auto bg-gradient-to-b ${item.colors.accent} opacity-40`}
							/>
							<div className="flex flex-col">
								<p className="text-sm font-semibold">
									{item.label}
								</p>
								<h2
									className={`text-2xl font-bold ${item.colors.iconColor}`}
								>
									{item.value}
								</h2>
							</div>
						</Card>
					))}
				</div>

				<Button onClick={handleOpenPasswordDialog}>
					Set Maintenance
				</Button>
			</CardDescription>

			{/* Password Dialog */}
			<PasswordDialog
				isOpen={isPasswordDialogOpen}
				onClose={() => setIsPasswordDialogOpen(false)}
				onSubmit={handlePasswordSubmit}
			/>

			{/* Maintenance Detail Dialog */}
			<MaintenanceDetailDialog
				isOpen={isMaintenanceDialogOpen}
				onClose={() => setIsMaintenanceDialogOpen(false)}
			/>
		</Card>
	);
}
