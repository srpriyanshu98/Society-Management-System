import { useState } from "react";
import { incomeData as initialData } from "@/data/otherIncomeData";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MoreVertical } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../ui/dropdown-menu";
import AddIncomeDialog from "./AddIncomeDialog";
import EditIncomeDialog from "./EditIncomeDialog";
import ConfirmationDialog from "../ConfirmationDialog ";

export default function OtherIncome() {
	const [incomeData, setIncomeData] = useState(initialData);
	const [dropdownOpenId, setDropdownOpenId] = useState(null);
	const [editingIncome, setEditingIncome] = useState(null);
	const [deleteItem, setDeleteItem] = useState(null); // State to handle delete dialog

	const toggleDropdown = (id) => {
		setDropdownOpenId((prevId) => (prevId === id ? null : id));
	};

	const handleSaveIncome = (newIncome) => {
		setIncomeData((prevData) => [...prevData, newIncome]);
	};

	const handleEditSave = (updatedIncome) => {
		setIncomeData((prevData) =>
			prevData.map((item) =>
				item.id === updatedIncome.id ? updatedIncome : item
			)
		);
		setEditingIncome(null);
	};

	const handleDeleteConfirm = () => {
		setIncomeData((prevData) =>
			prevData.filter((item) => item.id !== deleteItem.id)
		);
		setDeleteItem(null); // Close the dialog after deletion
	};

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between items-center">
				<CardTitle className="text-lg font-semibold">
					Other Income
				</CardTitle>
				<AddIncomeDialog onSave={handleSaveIncome} />
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{incomeData.map((item) => (
						<Card
							key={item.id}
							className="border shadow-lg rounded-xl border-blue-200 pb-8"
						>
							<CardHeader className="relative bg-blue-500 text-white p-4 rounded-t-lg">
								<h3 className="text-lg font-semibold">
									{item.title}
								</h3>
								<div className="absolute top-3 right-3">
									<DropdownMenu
										open={dropdownOpenId === item.id}
										onOpenChange={() =>
											toggleDropdown(item.id)
										}
									>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												size="sm"
												className="text-white"
											>
												<MoreVertical />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="bg-white border rounded shadow-md">
											<DropdownMenuItem
												onClick={() =>
													setEditingIncome(item)
												}
											>
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													alert("View item")
												}
											>
												View
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													setDeleteItem(item)
												} // Open delete confirmation dialog
											>
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CardHeader>
							<CardContent className="p-4 space-y-3">
								<p>
									<span className="inline-block text-slate-600">
										Amount Per Member:
									</span>
									<span className="text-blue-600 bg-blue-200 ps-4 pe-4 rounded-full p-1 font-semibold float-right">
										₹{item.amount}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Total Member:
									</span>
									<span className="float-right">
										{item.members}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Date:
									</span>
									<span className="float-right">
										{item.date}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Due Date:
									</span>
									<span className="float-right">
										{item.dueDate}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600 mb-2">
										Description:
									</span>
									<span className="float-right">
										{item.description}
									</span>
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</CardContent>

			{/* Render the EditIncomeDialog only when an item is being edited */}
			{editingIncome && (
				<EditIncomeDialog
					incomeItem={editingIncome}
					onSave={handleEditSave}
					onClose={() => setEditingIncome(null)}
				/>
			)}

			{/* Render the ConfirmationDialog only when a delete item is selected */}
			{deleteItem && (
				<ConfirmationDialog
					isOpen={!!deleteItem}
					title={deleteItem.title} // Use deleteItem.title here
					description={`Are you sure you want to delete "${deleteItem.title}"?`}
					onConfirm={handleDeleteConfirm}
					onCancel={() => setDeleteItem(null)}
				/>
			)}
		</Card>
	);
}
