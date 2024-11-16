import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { SecurityprotocolsData } from "@/data/securityprotocolsData";
import { Button } from "../ui/button";
import SecurityProtocolDialog from "./securityProtocolDialog";
import EditSecurityProtocols from "./editSecurityProtocols";
import ConfirmationDialog from "../ConfirmationDialog "; // Import the confirmation dialog Delete
import ViewSecurityProtocol from "./viewSecurityProtocol"; // Import ViewSecurityProtocol dialog

export default function SecurityProtocols() {
	const [logs, setLogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filter] = useState("All");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [selectedProtocol, setSelectedProtocol] = useState(null);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [protocolToDelete, setProtocolToDelete] = useState(null); // To store the protocol to be deleted
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // State for View Protocol dialog

	const fetchLogs = async () => {
		try {
			setIsLoading(true);
			const response = await new Promise((resolve) => {
				setTimeout(() => {
					resolve(SecurityprotocolsData);
				});
			});
			setLogs(response);
		} catch (error) {
			console.error("Error fetching logs:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchLogs();
	}, []);

	const filteredLogs = logs.filter((log) =>
		filter === "All" ? true : log.status === filter
	);

	const handleEditSecurity = (protocol) => {
		setSelectedProtocol(protocol);
		setIsEditDialogOpen(true);
	};

	const handleDeleteProtocol = (protocol) => {
		setProtocolToDelete(protocol);
		setIsConfirmDialogOpen(true); // Open the confirmation dialog
	};

	const handleViewProtocol = (protocol) => {
		setSelectedProtocol(protocol);
		setIsViewDialogOpen(true); // Open the view dialog
	};

	const confirmDelete = () => {
		// Logic to delete the protocol
		setLogs(logs.filter((log) => log.id !== protocolToDelete.id)); // Filter out the deleted protocol
		setIsConfirmDialogOpen(false); // Close the confirmation dialog
	};

	const cancelDelete = () => {
		setIsConfirmDialogOpen(false); // Close the confirmation dialog
	};

	return (
		<Card className="rounded-xl ">
			<CardHeader className="flex flex-row justify-between items-center">
				<CardTitle>Security Protocols</CardTitle>
				<Button
					className="flex items-center space-x-2"
					onClick={() => setIsDialogOpen(true)}
				>
					Create Protocol
				</Button>
			</CardHeader>
			<CardContent>
				<ScrollArea className="max-h-[715px] overflow-y-auto m-4 custom-scrollbar rounded-t-xl">
					<div className="">
						<table className="w-full text-left border-collapse">
							<thead className="text-gray-800">
								<tr className="bg-blue-50 font-semibold font-poppins">
									<th className="p-3">Title</th>
									<th className="p-3">Description</th>
									<th className="p-3 text-center">Date</th>
									<th className="p-3 text-center">Time</th>
									<th className="p-3 text-center">Actions</th>
								</tr>
							</thead>
							<tbody className="items-center">
								{isLoading ? (
									<tr>
										<td colSpan="6" className="p-4">
											<Skeleton />
										</td>
									</tr>
								) : filteredLogs.length > 0 ? (
									filteredLogs.map((log) => (
										<tr key={log.id} className="border-b">
											<td className="p-3 font-semibold text-gray-700 mt-3 mb-3">
												{log.Title}
											</td>
											<td className="p-3 text-gray-700 mt-3 mb-3">
												{log.description}
											</td>
											<td className="p-3 text-gray-500 mt-3 mb-3 text-center">
												{log.date}
											</td>
											<td className="p-3 text-gray-500 mt-3 mb-3 text-center">
												{log.Time}
											</td>
											<td className="flex justify-center space-x-4 mt-3 mb-3 text-center">
												<button
													className="rounded-md bg-gray-100 p-2 font-semibold"
													onClick={() =>
														handleEditSecurity(log)
													}
												>
													<img
														src="./src/assets/edit.svg"
														alt="Edit"
													/>
												</button>
												<button
													className="rounded-md bg-gray-100 p-2 font-semibold"
													onClick={() =>
														handleViewProtocol(log)
													} // Open View dialog
												>
													<img
														src="./src/assets/view.svg"
														alt="View"
													/>
												</button>
												<button
													className="rounded-md bg-gray-100 p-2 font-semibold"
													onClick={() =>
														handleDeleteProtocol(
															log
														)
													}
												>
													<img
														src="./src/assets/delete.svg"
														alt="Delete"
													/>
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan="6"
											className="p-4 text-gray-500 text-center font-semibold"
										>
											No Security Management found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</CardContent>

			<SecurityProtocolDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>

			{isEditDialogOpen && (
				<EditSecurityProtocols
					isOpen={isEditDialogOpen}
					onClose={() => setIsEditDialogOpen(false)}
					protocol={selectedProtocol} // Pass the selected protocol data
				/>
			)}

			<ConfirmationDialog
				isOpen={isConfirmDialogOpen}
				title="Delete Protocol?"
				description="Are you sure you want to delete this Protocol?"
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>

			{/* View Dialog for displaying protocol details */}
			<ViewSecurityProtocol
				isOpen={isViewDialogOpen}
				onClose={() => setIsViewDialogOpen(false)}
				log={selectedProtocol} // Pass the selected protocol data
			/>
		</Card>
	);
}
