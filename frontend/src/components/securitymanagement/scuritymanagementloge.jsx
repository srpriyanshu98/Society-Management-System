
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { scuritymanagementData } from "@/data/scuritymanagementData";



export default function ScurityManagementlogs() {
    const [logs, setlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("All");



    const fetchlogs = async () => {
        try {
            setIsLoading(true);
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(scuritymanagementData);
                });
            });
            setlogs(response);
        } catch (error) {
            console.error("Error fetching logs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchlogs();
    }, []);

    const filteredlogs = logs.filter((log) => {
        if (filter === "All") return true;
        return log.status === filter;
    });
    return (
        <Card className="bg-white h-[780px] p-4 shadow-md rounded-xl w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[20px] font-semibold font-poppins leading-[30px] text-left decoration-slice">Visitor Logs</h2>
            </div>
            <ScrollArea className="h-[680px] rounded-t-lg">
                <div className="overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-center text-gray-600">
                            <tr className="bg-blue-50 font-semibold font-poppins">
                                <th className="p-3">Visitor Name</th>
                                <th className="p-3">Phone Number</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Unit Number</th>
                                <th className="p-3">Time</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="p-4">
                                        <Skeleton />
                                    </td>
                                </tr>
                            ) : filteredlogs.length > 0 ? (
                                filteredlogs.map((log) => (
                                    <tr key={log.id} className="border-b">
                                        <td className="p-3 flex items-center space-x-3">
                                            <img
                                                src={log.VisitorImg}
                                                alt={log.VisitorName}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <span className="font-semibold font-poppins">
                                                {log.VisitorName}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-700 font-semibold font-poppins">
                                            {log.PhoneNumber}
                                        </td>
                                        <td className="p-3 text-gray-500">
                                            {log.date}
                                        </td>
                                        <td className="p-3 text-gray-500">
                                            <span className=" mr-3 bg-blue-50 p-2 rounded-full"> 
                                                <span className="font-semibold font-poppins text-blue-500">{log.wing}</span>
                                             </span>
                                            {log.unit}
                                        </td>
                                        <td className="p-3 text-gray-500">
                                            {log.Time}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-4 text-gray-500 text-center font-semibold font-poppins"
                                    >
                                        No ScurityManagement found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </ScrollArea>
        </Card>
    );
}
