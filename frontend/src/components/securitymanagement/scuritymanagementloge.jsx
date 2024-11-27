import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axiosInstance from "@/test/axiosInstance"; // Adjust the path accordingly
import moment from "moment"; // Import moment

export default function ScurityManagementlogs() {
    const [logs, setlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter] = useState("All");

    const fetchlogs = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/visitors"); // Use axiosInstance to make the GET request
            setlogs(response.data);
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
        <Card className=" p-4  rounded-xl">
            <CardHeader>
                <CardTitle>Visitor Logs</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="max-h-[715px] rounded-t-xl overflow-y-auto custom-scrollbar">
                    <div className="">
                        <table className="w-full text-left">
                            <thead className="text-center text-gray-600">
                                <tr className="bg-blue-50">
                                    <th className="p-3 text-start">
                                        Visitor Name
                                    </th>
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
                                    filteredlogs.map((log) => {
                                        console.log("Date from API:", log.date); // Log the date to check its format
                                        const formattedDate = moment(
                                            log.date
                                        ).format("YYYY/DD/MM"); // Format date using moment
                                        return (
                                            <tr
                                                key={log.id}
                                                className="border-b"
                                            >
                                                <td className="p-3 flex items-center space-x-3">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarImage
                                                            src="https://github.com/shadcn.png"
                                                            alt={
                                                                log.visitorName
                                                            }
                                                        />
                                                        <AvatarFallback>
                                                            CN
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-semibold font-poppins">
                                                        {log.visitorName}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-gray-700 font-semibold font-poppins">
                                                    {log.Number}
                                                </td>
                                                <td className="p-3 text-gray-500">
                                                    {formattedDate}{" "}
                                                    {/* Display formatted date */}
                                                </td>
                                                <td className="p-3 text-gray-500">
                                                    <span className=" mr-3 bg-blue-50 p-2 rounded-full">
                                                        <span className="font-semibold font-poppins text-blue-500">
                                                            {log.wing}
                                                        </span>
                                                    </span>
                                                    {log.unit}
                                                </td>
                                                <td className="p-3 text-gray-500">
                                                    {moment(
                                                        log.time,
                                                        "HH:mm"
                                                    ).format("hh:mm A")}
                                                </td>
                                            </tr>
                                        );
                                    })
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
            </CardContent>
        </Card>
    );
}
