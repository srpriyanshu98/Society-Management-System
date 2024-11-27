import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import moment from "moment";
import SecurityProtocolDialog from "./securityprotocolDialog";
import EditSecurityProtocols from "./editsecurityprotocols";
import ConfirmationDialog from "../ConfirmationDialog ";
import ViewSecurityProtocol from "./viewsecurityprotocol";
import axiosInstance from "@/test/axiosInstance"; // Adjust the path accordingly

export default function SecurityProtocols() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [protocolToDelete, setProtocolToDelete] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const fetchLogs = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/security-protocols");
            setLogs(response.data);
        } catch (error) {
            console.error("Error fetching security protocols:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleSaveProtocol = async (newProtocol) => {
        try {
            if (newProtocol.id) {
                await axiosInstance.put(
                    `/security-protocols/${newProtocol.id}`,
                    newProtocol
                );
            } else {
                await axiosInstance.post("/security-protocols", newProtocol);
            }
            fetchLogs();
            setIsDialogOpen(false);
            setIsEditDialogOpen(false);
        } catch (error) {
            console.error("Error saving security protocol:", error);
        }
    };

    const handleDeleteProtocol = async (protocol) => {
        setProtocolToDelete(protocol);
        setIsConfirmDialogOpen(true);
    };

    const handleViewProtocol = (protocol) => {
        setSelectedProtocol(protocol);
        setIsViewDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axiosInstance.delete(
                `/security-protocols/${protocolToDelete._id}`
            );
            fetchLogs();
        } catch (error) {
            console.error("Error deleting security protocol:", error);
        } finally {
            setIsConfirmDialogOpen(false);
        }
    };

    const cancelDelete = () => setIsConfirmDialogOpen(false);

    return (
        <Card className="rounded-xl">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Security Protocols</CardTitle>
                <Button onClick={() => setIsDialogOpen(true)}>
                    Create Protocol
                </Button>
            </CardHeader>
            <CardContent>
                <ScrollArea className="max-h-[715px] overflow-y-auto m-4 rounded-t-xl">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-gray-800 bg-blue-50">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Description</th>
                                <th className="p-3 text-center">Date</th>
                                <th className="p-3 text-center">Time</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="p-4">
                                        <Skeleton />
                                    </td>
                                </tr>
                            ) : logs.length > 0 ? (
                                logs.map((log) => (
                                    <tr key={log.id} className="border-b">
                                        <td className="p-3 text-gray-700">
                                            {log.title}
                                        </td>
                                        <td className="p-3 text-gray-700">
                                            {log.description}
                                        </td>
                                        <td className="p-3 text-gray-500 text-center">
                                            {moment(log.date).format(
                                                "YYYY-MM-DD"
                                            )}
                                        </td>
                                        <td className="p-3 text-gray-500 text-center">
                                            {moment(log.time, "HH:mm").format(
                                                "h:mm A"
                                            )}
                                        </td>
                                        <td className="flex justify-center space-x-4">
                                            <button
                                                className="bg-gray-100 p-2 rounded-md"
                                                onClick={() => {
                                                    setSelectedProtocol(log);
                                                    setIsEditDialogOpen(true);
                                                }}
                                            >
                                                <img
                                                    src="./src/assets/edit.svg"
                                                    alt="Edit"
                                                />
                                            </button>
                                            <button
                                                className="bg-gray-100 p-2 rounded-md"
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
                                                className="bg-gray-100 p-2 rounded-md"
                                                onClick={() =>
                                                    handleDeleteProtocol(log)
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
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No Security Protocols found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
