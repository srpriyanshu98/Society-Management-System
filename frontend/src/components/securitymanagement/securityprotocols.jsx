import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { SecurityprotocolsData } from "@/data/securityprotocolsData";
import { Button } from "../ui/button";
import SecurityProtocolDialog from "./SecurityProtocolDialog";
import EditSecurityProtocols from "./EditSecurityProtocols";
import ViewSecurityProtocol from "./ViewSecurityProtocol";
import ConfirmationDialog from "../ConfirmationDialog ";
import moment from "moment";

export default function SecurityProtocols() {
	const [logs, setLogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filter] = useState("All");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [selectedProtocol, setSelectedProtocol] = useState(null);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [protocolToDelete, setProtocolToDelete] = useState(null);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

	const fetchLogs = async () => {
		try {
			setIsLoading(true);

			const response = await new Promise((resolve) => {
				setTimeout(() => {
					resolve(SecurityprotocolsData);
				}, 1000);
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

	const handleSaveProtocol = (newProtocol) => {
		if (newProtocol.id) {
			// Edit existing protocol
			setLogs((prevLogs) =>
				prevLogs.map((log) =>
					log.id === newProtocol.id ? { ...log, ...newProtocol } : log
				)
			);
		} else {
			// Add new protocol
			setLogs((prevLogs) => [
				...prevLogs,
				{ id: Date.now(), ...newProtocol },
			]);
		}
		setIsDialogOpen(false);
		setIsEditDialogOpen(false);
	};

	const handleDeleteProtocol = (protocol) => {
		setProtocolToDelete(protocol);
		setIsConfirmDialogOpen(true);
	};

	const handleViewProtocol = (protocol) => {
		setSelectedProtocol(protocol);
		setIsViewDialogOpen(true);
	};

	const confirmDelete = () => {
		setLogs(logs.filter((log) => log.id !== protocolToDelete.id));
		setIsConfirmDialogOpen(false);
	};

	const cancelDelete = () => {
		setIsConfirmDialogOpen(false);
	};

	return (
		<Card className="rounded-xl">
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
										<td colSpan="5" className="p-4">
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
												<span className="float-right">
													{moment(
														log.Time,
														"HH:mm"
													).format("h:mm A")}
												</span>
											</td>
											<td className="flex justify-center space-x-4 mt-3 mb-3 text-center">
												<button
													className="rounded-md bg-gray-100 p-2 font-semibold"
													onClick={() => {
														setSelectedProtocol(
															log
														);
														setIsEditDialogOpen(
															true
														);
													}}
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
													}
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
											colSpan="5"
											className="p-4 text-gray-500 text-center font-semibold"
										>
											No Security Protocols found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</CardContent>

			{/* Dialog components */}
			<SecurityProtocolDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onSave={handleSaveProtocol}
			/>
			<EditSecurityProtocols
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				protocol={selectedProtocol}
				onSave={handleSaveProtocol}
			/>
			<ConfirmationDialog
				isOpen={isConfirmDialogOpen}
				title="Delete Protocol?"
				description="Are you sure you want to delete this Protocol?"
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>
			<ViewSecurityProtocol
				isOpen={isViewDialogOpen}
				onClose={() => setIsViewDialogOpen(false)}
				log={selectedProtocol}
			/>
		</Card>
	);
}
