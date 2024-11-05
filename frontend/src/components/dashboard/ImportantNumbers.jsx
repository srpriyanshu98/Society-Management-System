import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

function ImportantNumbers() {
	const [numbers, setNumbers] = useState([
		{ id: 1, name: "Hanna Donin", phone: "+9199587 33657", work: "Doctor" },
	]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [newWork, setNewWork] = useState("");
	const [editId, setEditId] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleAdd = () => {
		if (newName && newPhone && newWork) {
			setNumbers([
				...numbers,
				{
					id: numbers.length + 1,
					name: newName,
					phone: newPhone,
					work: newWork,
				},
			]);
			resetForm();
		}
	};

	const handleDelete = (id) => {
		setNumbers(numbers.filter((number) => number.id !== id));
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
					className="bg-gradient-to-l from-orange-400 to-orange-600"
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
								<div className="">
									Name:{" "}
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
									Work:{" "}
									<span className="text-stone-400 ms-1">
										{number.work}
									</span>
								</div>
							</div>
							<div className="space-x-2 flex">
								<Link
									variant="outline"
									onClick={() => handleDelete(number.id)}
								>
									<img src="./src/assets/delete.svg" alt="" />
								</Link>
								<Link
									variant="outline"
									onClick={() => handleEdit(number.id)}
								>
									<img src="./src/assets/edit.svg" alt="" />
								</Link>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
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
							onChange={(e) => setNewPhone(e.target.value)}
						/>
						<Input
							placeholder="Work"
							type="text"
							value={newWork}
							onChange={(e) => setNewWork(e.target.value)}
						/>
						<Button
							onClick={handleAdd}
							className="bg-gradient-to-l from-orange-400 to-orange-600"
						>
							Add
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default ImportantNumbers;
