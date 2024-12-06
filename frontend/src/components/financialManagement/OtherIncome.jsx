import { useState, useEffect } from "react";
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
import axiosInstance from "@/test/axiosInstance"; // Adjust the path as necessary
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function OtherIncome() {
    const [incomeData, setIncomeData] = useState([]);
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const [editingIncome, setEditingIncome] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const navigate = useNavigate();

    const fetchIncomeData = async () => {
        try {
            const response = await axiosInstance.get("/otherIncome");
            setIncomeData(response.data);
        } catch (error) {
            console.error("Error fetching income data:", error);
        }
    };
    useEffect(() => {
        fetchIncomeData();
    }, []);

    const toggleDropdown = (id) => {
        setDropdownOpenId((prevId) => (prevId === id ? null : id));
    };

    const handleSaveIncome = async (newIncome) => {
        try {
            const response = await axiosInstance.post(
                "/otherIncome",
                newIncome
            );
            setIncomeData((prevData) => [
                ...prevData,
                response.data.otherIncome,
            ]);
        } catch (error) {
            console.error("Error adding new income:", error);
        }
    };

    const handleEditSave = async (updatedIncome) => {
        try {
            const response = await axiosInstance.put(
                `/otherIncome/${updatedIncome._id}`,
                updatedIncome
            );
            setIncomeData((prevData) =>
                prevData.map((item) =>
                    item._id === updatedIncome._id
                        ? response.data.otherIncome
                        : item
                )
            );
            setEditingIncome(null);
        } catch (error) {
            console.error("Error updating income:", error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await axiosInstance.delete(`/otherIncome/${deleteItem._id}`);
            setIncomeData((prevData) =>
                prevData.filter((item) => item._id !== deleteItem.id)
            );
            setDeleteItem(null);
            fetchIncomeData();
        } catch (error) {
            console.error("Error deleting income:", error);
        }
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
                                        open={dropdownOpenId === item._id}
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
                                                onClick={() =>
                                                    setEditingIncome(item)
                                                }
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/View-other-income')}>
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    setDeleteItem(item)
                                                }
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
                                        {moment(item.date).format("YYYY-MM-DD")}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Due Date:
                                    </span>
                                    <span className="float-right">
                                        {moment(item.dueDate).format(
                                            "YYYY-MM-DD"
                                        )}
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
                    title={deleteItem.title}
                    description={`Are you sure you want to delete "${deleteItem.title}"?`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteItem(null)}
                />
            )}
        </Card>
    );
}
