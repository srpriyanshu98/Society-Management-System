import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";
import axiosInstance from "@/test/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";

export default function SecurityProtocols({ userRole }) {
	const [protocols, setProtocols] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchSecurityProtocols = async () => {
		try {
			const response = await axiosInstance.get("/security-protocols");
			setProtocols(response.data);
		} catch (error) {
			console.error("Error fetching security protocols:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSecurityProtocols();
	}, []);

	return (
		<Layout userRole={userRole}>
			<Card>
				<CardHeader className="flex flex-row justify-between items-center">
					<CardTitle>Security Protocols</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea className="max-h-[715px] overflow-y-auto custom-scrollbar">
						<div>
							{loading ? (
								<div className="flex justify-center items-center h-64">
									<Skeleton />
								</div>
							) : (
								<table className="w-full text-left border-collapse">
									<thead className="text-center text-gray-700">
										<tr className="bg-blue-50 font-semibold font-poppins">
											<th className="p-3 rounded-tl-xl text-start">
												Title
											</th>
											<th className="p-3 text-start">
												Description
											</th>
											<th className="p-3">Date</th>
											<th className="p-3 rounded-tr-xl">
												Time
											</th>
										</tr>
									</thead>
									<tbody className="text-gray-600 font-poppins">
										{protocols.map((protocol) => (
											<tr
												key={protocol._id}
												className="border-b border-gray-200"
											>
												<td className="p-3 text-start">
													{protocol.title}
												</td>
												<td className="p-3 text-start">
													{protocol.description}
												</td>
												<td className="p-3 text-center">
													{moment(
														protocol.date
													).format("YYYY-MM-DD")}
												</td>
												<td className="p-3 text-center">
													{moment(
														protocol.date
													).format("hh:mm A")}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</Layout>
	);
}
