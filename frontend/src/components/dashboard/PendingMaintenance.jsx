import { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Link } from "react-router-dom";
import { pendingData } from "@/data/pendingMaintenance";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

export default function PendingMaintenance() {
	const [pendingMaintenances, setPendingMaintenances] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchPendingMaintenances = async () => {
		try {
			// Simulating an API call with a delay
			const response = await new Promise((resolve) => {
				setTimeout(() => {
					resolve(pendingData); // Resolve with dummy data
				});
			});
			setPendingMaintenances(response); // Set the fetched data
			// eslint-disable-next-line no-unused-vars
		} catch (e) {
			setError("Failed to fetch pending maintenances");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPendingMaintenances();
	}, []);

	if (error) {
		return (
			<div className="bg-white p-4 shadow-md rounded-xl">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<Card className="bg-white p-6 shadow-md rounded-xl w-[310px] md:w-full sm:w-full lg:w-[380px]">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-[15px] font-semibold font-poppins md:text[15px] lg:text-[20px] leading-[30px] text-left decoration-slice">
					Pending Maintenances
				</h2>
				<Link to="/view-all" className="text-blue-500 text-sm">
					View all
				</Link>
			</div>
			<ScrollArea className="h-80">
				<div className="space-y-4">
					{isLoading ? (
						<Skeleton />
					) : Array.isArray(pendingMaintenances) &&
					  pendingMaintenances.length > 0 ? (
						pendingMaintenances.map((member) => (
							<div
								key={member.id}
								className="flex justify-between items-center border-b pb-2"
							>
								<div className="flex items-center space-x-4">
									<img
										src={member.img}
										alt={member.name}
										className="w-8 h-8 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full object-cover"
									/>
									<div>
										<div className="font-semibold text-sm md:text-md lg:text-md">
											{member.name}
										</div>
										<div className="text-gray-500 text-[12px] md:text-sm lg:text-sm">
											{member.monthsPending} Month
											{member.monthsPending > 1
												? "s"
												: ""}
											Pending
										</div>
									</div>
								</div>
								<div className="text-red-500 font-bold text-sm md:text-md lg:text-md">
									₹ {member.amount.toLocaleString()}
								</div>
							</div>
						))
					) : (
						<p className="text-gray-500 text-sm">
							No pending maintenances found.
						</p>
					)}
				</div>
			</ScrollArea>
		</Card>
	);
}
