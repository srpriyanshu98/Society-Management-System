import { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import ConfirmationDialog from "../ConfirmationDialog ";
import axiosInstance from "../../test/axiosInstance"; // Adjust the path accordingly

export default function ImportantNumbers() {
	const [numbers, setNumbers] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [newWork, setNewWork] = useState("");
	const [editId, setEditId] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	useEffect(() => {
		fetchImportantNumbers();
	}, []);

	const fetchImportantNumbers = async () => {
		try {
			const response = await axiosInstance.get("/important-numbers");
			setNumbers(response.data);
			console.log(
				"Important numbers fetched successfully:",
				response.data
			);
		} catch (error) {
			console.error("Error fetching important numbers:", error);
		}
	};

	const handleAdd = async () => {
		if (newName && newPhone && newWork) {
			try {
				if (editId) {
					// Editing existing item
					const response = await axiosInstance.put(
						`/important-numbers/${editId}`,
						{
							fullName: newName,
							phoneNumber: newPhone,
							work: newWork,
						}
					);
					console.log(
						"Important number updated successfully:",
						response.data
					);
				} else {
					// Adding new item
					const response = await axiosInstance.post(
						"/important-numbers",
						{
							fullName: newName,
							phoneNumber: newPhone,
							work: newWork,
						}
					);
					console.log(
						"Important number added successfully:",
						response.data
					);
				}
				resetForm();
				fetchImportantNumbers();
			} catch (error) {
				console.error("Error adding/updating important number:", error);
			}
		}
	};

	const handleDelete = (id) => {
		setDeleteId(id);
		setIsConfirmDialogOpen(true);
	};

	const confirmDelete = async () => {
		try {
			const response = await axiosInstance.delete(
				`/important-numbers/${deleteId}`
			);
			console.log(
				"Important number deleted successfully:",
				response.data
			);
			setIsConfirmDialogOpen(false);
			fetchImportantNumbers();
		} catch (error) {
			console.error("Error deleting important number:", error);
		}
	};

	const handleEdit = (id) => {
		const numberToEdit = numbers.find((number) => number._id === id);
		setNewName(numberToEdit.fullName);
		setNewPhone(numberToEdit.phoneNumber);
		setNewWork(numberToEdit.work);
		setEditId(id);
		setIsDialogOpen(true);
	};

	const resetForm = () => {
		setNewName("");
		setNewPhone("");
		setNewWork("");
		setEditId(null);
		setIsDialogOpen(false);
	};

	return (
		<div className="bg-white p-4 shadow-md rounded-xl">
			<div className="flex justify-between">
				<h2 className="text-xl font-bold mb-4">Important Numbers</h2>
				<Button
					onClick={() => {
						resetForm();
						setIsDialogOpen(true);
					}}
				>
					<span className="text-2xl ">+</span> Add
				</Button>
			</div>
			<ScrollArea className="h-80">
				<div className="space-y-4">
					{numbers.map((number) => (
						<div
							key={number._id}
							className="flex justify-between items-center border rounded-lg border-gray-100 p-2 mt-4"
						>
							<div className="truncate">
								<div className="text-gray-700">
									Name:
									<span className="text-stone-400 ms-1">
										{number.fullName}
									</span>
								</div>
								<div className="text-gray-700">
									Phone:
									<span className="text-stone-400 ms-1">
										{number.phoneNumber}
									</span>
								</div>
								<div className="text-gray-700">
									Work:
									<span className="text-stone-400 ms-1">
										{number.work}
									</span>
								</div>
							</div>
							<div className="mx-4">
								<Separator />
							</div>
							<div className="space-x-2 flex">
								<Link
									variant="outline"
									onClick={() => handleDelete(number._id)}
									className="bg-gray-100 p-1.5 rounded-md"
								>
									<img
										src="./src/assets/delete.svg"
										alt="Delete"
									/>
								</Link>
								<Link
									variant="outline"
									onClick={() => handleEdit(number._id)}
									className="bg-gray-100 p-1.5 rounded-md"
								>
									<img
										src="./src/assets/edit.svg"
										alt="Edit"
									/>
								</Link>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>

			{/* Confirmation Dialog */}
			<ConfirmationDialog
				isOpen={isConfirmDialogOpen}
				title="Delete Number ?"
				description="Are you sure you want to delete this contact?"
				onConfirm={confirmDelete}
				onCancel={() => setIsConfirmDialogOpen(false)}
			/>

			{/* Add/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="w-96">
					<DialogHeader>
						<DialogTitle>
							{editId
								? "Edit Important Number"
								: "Add Important Number"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div className="grid grid-cols-1 gap-2">
							<div className="text-left">
								Full Name
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								placeholder="Name"
								type="text"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>

						<div className="grid grid-cols-1 gap-2">
							<div className="text-left">
								<div>
									Phone Number
									<span className="text-[#E74C3C]">*</span>
								</div>
								<Input
									placeholder="+91"
									value={newPhone}
									type="number"
									maxLength={10}
									onChange={(e) => {
										if (e.target.value.length <= 10) {
											setNewPhone(e.target.value);
										}
									}}
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-2">
							<div className="text-left">
								<div>
									Work
									<span className="text-[#E74C3C]">*</span>
								</div>
								<Input
									placeholder="Work"
									type="text"
									value={newWork}
									onChange={(e) => setNewWork(e.target.value)}
								/>
							</div>
						</div>
						<Button variant="outline"
						className="w-40 mr-3"
						onClick={() => setIsDialogOpen(false)} // Close dialog on cancel
						>
							Cancle
						</Button>
						<Button onClick={handleAdd}
						className="w-40"
						disabled={!newName || !newPhone || !newWork} // Disable button if any field is empty
						>
							{editId ? "Add" : "Save"}
						</Button>
						
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
