import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ExpenseViewDialog from "@/components/financialManagement/expenses/ExpenseViewDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog ";
import AddAndEditExpense from "@/components/financialManagement/expenses/AddAndEditExpense";
import {
	addExpense,
	updateExpense,
	deleteExpense,
	getAllExpenses,
} from "../../components/services/expenseService";
import moment from "moment";

export default function AddExpenses({ userRole }) {
	const [expenses, setExpenses] = useState([]);
	const [selectedExpense, setSelectedExpense] = useState(null);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	useEffect(() => {
		fetchExpenses();
	}, []);

	const fetchExpenses = async () => {
		try {
			const data = await getAllExpenses();
			setExpenses(data);
		} catch (error) {
			console.error("Error fetching expenses:", error);
		}
	};
	console.log(expenses);

	const handleViewExpense = (expense) => {
		setSelectedExpense(expense);
		setIsViewDialogOpen(true);
	};

	const handleEditExpense = (expense) => {
		setSelectedExpense(expense);
		setIsEditDialogOpen(true);
	};

	const handleDeleteExpense = (expense) => {
		setSelectedExpense(expense);
		setIsDeleteDialogOpen(true);
	};

	const confirmDeleteExpense = async () => {
		try {
			await deleteExpense(selectedExpense._id);
			fetchExpenses();
			setIsDeleteDialogOpen(false);
			setSelectedExpense(null);
		} catch (error) {
			console.error("Error deleting expense:", error);
		}
	};

	const handleAddExpense = async (newExpense) => {
		try {
			await addExpense(newExpense);
			fetchExpenses();
			setIsAddDialogOpen(false);
		} catch (error) {
			console.error("Error adding expense:", error);
		}
	};

	const handleUpdateExpense = async (updatedExpense) => {
		try {
			await updateExpense(selectedExpense._id, updatedExpense);
			fetchExpenses();
			setIsEditDialogOpen(false);
			setSelectedExpense(null);
		} catch (error) {
			console.error("Error updating expense:", error);
		}
	};

	return (
		<Layout userRole={userRole}>
			<Card>
				<CardHeader className="flex flex-row justify-between items-center">
					<CardTitle>Add Expenses Details</CardTitle>
					<Button
						className="flex items-center space-x-2"
						onClick={() => setIsAddDialogOpen(true)}
					>
						<img src="./src/assets/add-square.svg" alt="" />
						<span>Add New Expenses Detail</span>
					</Button>
				</CardHeader>
				<CardContent className="p-0">
					<ScrollArea className="max-h-[705px] overflow-y-auto m-4 custom-scrollbar">
						<table className="w-full border-collapse rounded-tl-3xl text-center">
							<thead className="bg-gray-200 ">
								<tr>
									<th className="p-4 text-left rounded-tl-3xl">
										Title
									</th>
									<th className="p-4 text-left">
										Description
									</th>
									<th className="p-4">Date</th>
									<th className="p-4">Amount</th>
									<th className="p-4">Bill Type</th>
									<th className="p-4 rounded-tr-3xl">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{expenses.map((item, index) => (
									<tr key={index} className="border-b">
										<td className="p-4 text-left">
											{item.title}
										</td>
										<td className="p-4 text-left truncate max-w-96 inline-block">
											{item.description}
										</td>
										<td className="p-4 font-normal">
											{moment(item.date).format(
												"YYYY-MM-DD"
											)}
										</td>
										<td className="p-4 text-green-500">
											₹{item.amount}
										</td>
										<td className="p-4">
											<img
												src={
													item.billPermit === "PDF"
														? "/src/assets/Document.svg"
														: "/src/assets/jpg.svg"
												}
												alt={`${item.billPermit} Icon`}
												className="w-6 h-6 inline-block align-middle mr-2"
											/>
											{/* <img
												src={
													item.bill
														? `http://localhost:5000/${item.bill}`
														: "no image"
												}
												alt="Bill"
												className="w-10 h-10 rounded-full"
											/> */}
											<span className="align-middle truncate max-w-40 inline-block">
												{item.bill
													? item.bill
															.split(".")
															.pop()
															.toUpperCase()
													: "No file uploaded"}
											</span>
										</td>

										<td className="p-4 text-center">
											<button
												className="inline-block rounded-md bg-gray-100 p-2  mr-2"
												onClick={() =>
													handleEditExpense(item)
												}
											>
												<img
													src="./src/assets/edit.svg"
													alt="Edit"
												/>
											</button>
											<button
												className="inline-block rounded-md bg-gray-100 p-2 mr-2"
												onClick={() =>
													handleViewExpense(item)
												}
											>
												<img
													src="./src/assets/view.svg"
													alt="View"
												/>
											</button>
											<button
												className="inline-block rounded-md bg-gray-100 p-2 "
												onClick={() =>
													handleDeleteExpense(item)
												}
											>
												<img
													src="./src/assets/delete.svg"
													alt="Delete"
												/>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</ScrollArea>
				</CardContent>
			</Card>

			{/* View Expense Dialog */}
			<ExpenseViewDialog
				isOpen={isViewDialogOpen}
				onClose={() => setIsViewDialogOpen(false)}
				expense={selectedExpense}
			/>

			{/* Delete Confirmation Dialog */}
			<ConfirmationDialog
				isOpen={isDeleteDialogOpen}
				title="Delete Expense"
				description={`Are you sure you want to delete the expense titled "${selectedExpense?.title}"? This action cannot be undone.`}
				onConfirm={confirmDeleteExpense}
				onCancel={() => setIsDeleteDialogOpen(false)}
			/>

			{/* Add Expense Dialog */}
			<AddAndEditExpense
				isOpen={isAddDialogOpen}
				onClose={() => setIsAddDialogOpen(false)}
				onAddExpense={handleAddExpense}
				mode="add"
			/>

			{/* Edit Expense Dialog */}
			<AddAndEditExpense
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				onEditExpense={handleUpdateExpense}
				mode="edit"
				expense={selectedExpense}
			/>
		</Layout>
	);
}
