import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { noteData } from "@/data/noteData";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddAndEditNote from "@/components/financialManagement/note/AddAndEditNote";
import NoteViewDialog from "@/components/financialManagement/note/NoteViewDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog ";

export default function Note({ userRole }) {
	const [dropdownOpenId, setDropdownOpenId] = useState(null);
	const [editingNote, setEditingNote] = useState(null);
	const [notes, setNotes] = useState(noteData);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [viewDialogOpen, setViewDialogOpen] = useState(false);
	const [viewingNote, setViewingNote] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [noteToDelete, setNoteToDelete] = useState(null);

	const toggleDropdown = (id) => {
		setDropdownOpenId(dropdownOpenId === id ? null : id);
	};

	const handleSaveNote = (newNote) => {
		setNotes([...notes, newNote]);
		setDialogOpen(false);
	};

	const handleEditNote = (editedNote) => {
		const updatedNotes = notes.map((note) =>
			note.id === editedNote.id ? editedNote : note
		);
		setNotes(updatedNotes);
		setEditingNote(null);
		setDialogOpen(false);
	};

	const handleViewNote = (note) => {
		setViewingNote(note);
		setViewDialogOpen(true);
	};

	const handleDeleteNote = (note) => {
		setNoteToDelete(note);
		setDeleteDialogOpen(true);
	};

	const confirmDeleteNote = () => {
		if (noteToDelete) {
			setNotes(notes.filter((note) => note.id !== noteToDelete.id));
			setDeleteDialogOpen(false);
			setNoteToDelete(null);
		}
	};

	const cancelDeleteNote = () => {
		setDeleteDialogOpen(false);
		setNoteToDelete(null);
	};

	return (
		<Layout userRole={userRole}>
			<Card>
				<CardHeader className="flex flex-row justify-between items-center">
					<CardTitle className="text-lg font-semibold">
						Note
					</CardTitle>
					<AddAndEditNote
						onSave={handleSaveNote}
						onEdit={handleEditNote}
						noteToEdit={editingNote}
						open={dialogOpen}
						setOpen={setDialogOpen}
					/>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						{notes.map((item) => (
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
													onClick={() => {
														setEditingNote(item);
														setDialogOpen(true);
													}}
												>
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														handleViewNote(item)
													}
												>
													View
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														handleDeleteNote(item)
													}
												>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</CardHeader>
								<CardContent className="p-4 space-y-3 h-20">
									<span className="text-slate-500">
										Description
									</span>
									<p className="truncate">
										{item.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>

			<NoteViewDialog
				isOpen={viewDialogOpen}
				onClose={() => setViewDialogOpen(false)}
				note={viewingNote}
			/>
			<ConfirmationDialog
				isOpen={deleteDialogOpen}
				title="Delete Note"
				description="Are you sure you want to delete this note?"
				onConfirm={confirmDeleteNote}
				onCancel={cancelDeleteNote}
			/>
		</Layout>
	);
}
