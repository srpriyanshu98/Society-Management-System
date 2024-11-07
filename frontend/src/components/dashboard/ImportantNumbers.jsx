import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import ConfirmationDialog from "../ConfirmationDialog ";

export default function ImportantNumbers() {
	const [numbers, setNumbers] = useState([
		{ id: 1, name: "Hanna Donin", phone: "+9199587 33657", work: "Doctor" },
	]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [newWork, setNewWork] = useState("");
	const [editId, setEditId] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const handleAdd = () => {
		if (newName && newPhone && newWork) {
			if (editId) {
				// Editing existing item
				setNumbers(
					numbers.map((number) =>
						number.id === editId
							? {
									...number,
									name: newName,
									phone: newPhone,
									work: newWork,
							  }
							: number
					)
				);
			} else {
				// Adding new item
				setNumbers([
					...numbers,
					{
						id: numbers.length + 1,
						name: newName,
						phone: newPhone,
						work: newWork,
					},
				]);
			}
			resetForm();
		}
	};

	const handleDelete = (id) => {
		setDeleteId(id);
		setIsConfirmDialogOpen(true);
	};

	const confirmDelete = () => {
		setNumbers(numbers.filter((number) => number.id !== deleteId));
		setIsConfirmDialogOpen(false);
	};

	const handleEdit = (id) => {
		const numberToEdit = numbers.find((number) => number.id === id);
		setNewName(numberToEdit.name);
		setNewPhone(numberToEdit.phone);
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
							key={number.id}
							className="flex justify-between items-center border rounded-lg border-gray-100 p-2 mt-4"
						>
							<div className="truncate">
								<div className="text-gray-700">
									Name:
									<span className="text-stone-400 ms-1">
										{number.name}
									</span>
								</div>
								<div className="text-gray-700">
									Phone:
									<span className="text-stone-400 ms-1">
										{number.phone}
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
									onClick={() => handleDelete(number.id)}
									className="bg-gray-100 p-1.5 rounded-md"
								>
									<img
										src="./src/assets/delete.svg"
										alt="Delete"
									/>
								</Link>
								<Link
									variant="outline"
									onClick={() => handleEdit(number.id)}
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
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editId
								? "Edit Important Number"
								: "Add Important Number"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<Input
							placeholder="Name"
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<Input
							placeholder="Phone"
							value={newPhone}
							type="number"
							maxLength={10}
							onChange={(e) => {
								if (e.target.value.length <= 10) {
									setNewPhone(e.target.value);
								}
							}}
						/>
						<Input
							placeholder="Work"
							type="text"
							value={newWork}
							onChange={(e) => setNewWork(e.target.value)}
						/>
						<Button onClick={handleAdd}>
							{editId ? "Save" : "Add"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
