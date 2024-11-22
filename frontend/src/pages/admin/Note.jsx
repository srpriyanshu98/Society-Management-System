import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axiosInstance from "@/test/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";
import AddAndEditNote from "@/components/financialManagement/note/AddAndEditNote";
import NoteViewDialog from "@/components/financialManagement/note/NoteViewDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog ";

export default function Note({ userRole }) {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [viewDialogOpen, setViewDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [editingNote, setEditingNote] = useState(null);
	const [viewingNote, setViewingNote] = useState(null);
	const [noteToDelete, setNoteToDelete] = useState(null);
	const [dropdownStates, setDropdownStates] = useState({});

	// Fetch notes from the API
	const fetchNotes = async () => {
		setLoading(true);
		try {
			const { data } = await axiosInstance.get("/notes");
			setNotes(data);
		} catch (error) {
			console.error("Error fetching notes:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	// Handle adding or editing a note
	const handleSaveNote = async (noteData) => {
		try {
			let response;
			if (noteData._id) {
				// Edit existing note
				response = await axiosInstance.put(
					`/notes/${noteData._id}`,
					noteData
				);
				setNotes((prevNotes) =>
					prevNotes.map((note) =>
						note._id === noteData._id
							? response.data.updatedNote
							: note
					)
				);
			} else {
				// Create new note
				const { ...newNoteData } = noteData; // Remove _id from the payload
				response = await axiosInstance.post("/notes", newNoteData);
				setNotes((prevNotes) => [...prevNotes, response.data.newNote]);
			}
			setDialogOpen(false); // Close the dialog after saving
			setEditingNote(null); // Reset editing note
		} catch (error) {
			console.error("Error saving note:", error);
		}
	};

	// Handle deleting a note
	const confirmDeleteNote = async () => {
		if (noteToDelete) {
			try {
				await axiosInstance.delete(`/notes/${noteToDelete._id}`);
				setNotes(notes.filter((note) => note._id !== noteToDelete._id));
				setDeleteDialogOpen(false);
				setNoteToDelete(null);
			} catch (error) {
				console.error("Error deleting note:", error);
			}
		}
	};

	// Handle viewing a note
	const handleViewNote = (note) => {
		setViewingNote(note);
		setViewDialogOpen(true);
	};

	// Toggle dropdown state for a specific note
	const toggleDropdown = (noteId) => {
		setDropdownStates((prevState) => ({
			...prevState,
			[noteId]: !prevState[noteId],
		}));
	};

	return (
		<Layout userRole={userRole}>
			<Card>
				<CardHeader className="flex flex-row justify-between items-center">
					<CardTitle>Notes</CardTitle>
					<Button onClick={() => setDialogOpen(true)}>
						Create Note
					</Button>
				</CardHeader>
				<CardContent>
					{loading ? (
						<Skeleton />
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
							{notes.map((item) => (
								<Card
									key={item._id}
									className="border shadow-lg rounded-xl pb-8"
								>
									<CardHeader className="relative bg-blue-500 text-white p-4 rounded-t-lg">
										<h3 className="text-lg font-semibold">
											{item.title}
										</h3>
										<div className="absolute top-3 right-3">
											<DropdownMenu
												open={
													dropdownStates[item._id] ||
													false
												}
												onOpenChange={() =>
													toggleDropdown(item._id)
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
															setEditingNote(
																item
															);
															setDialogOpen(true);
														}}
													>
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => {
															handleViewNote(
																item
															);
															toggleDropdown(
																item._id
															);
														}}
													>
														View
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => {
															setNoteToDelete(
																item
															);
															setDeleteDialogOpen(
																true
															);
															toggleDropdown(
																item._id
															);
														}}
													>
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</CardHeader>
									<CardContent className="p-4 space-y-3 h-20">
										<p className="text-slate-600">
											Description
										</p>
										<p>{item.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</CardContent>
			</Card>
			<AddAndEditNote
				onSave={handleSaveNote}
				noteToEdit={editingNote}
				open={dialogOpen}
				setOpen={setDialogOpen}
			/>
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
				onCancel={() => setDeleteDialogOpen(false)}
			/>
		</Layout>
	);
}
