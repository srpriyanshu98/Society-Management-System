import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import moment from "moment";
import axiosInstance from "@/test/axiosInstance"; // Adjust the path accordingly
import { Skeleton } from "../ui/skeleton";

export default function UpcomingActivity() {
	const [activities, setActivities] = useState([]);
	const [filteredActivities, setFilteredActivities] = useState([]);
	const [filter, setFilter] = useState("All");
	const [isLoading, setIsLoading] = useState(false);

	const fetchActivities = async () => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.get("/announcements"); // Adjust the endpoint accordingly
			setActivities(response.data);
		} catch (error) {
			console.error("Error fetching activities:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const filterActivities = () => {
		const now = moment();
		let filtered;
		if (filter === "All") {
			filtered = activities;
		} else if (filter === "Month") {
			filtered = activities.filter((activity) =>
				moment(activity.date).isSame(now, "month")
			);
		} else if (filter === "Week") {
			filtered = activities.filter((activity) =>
				moment(activity.date).isSame(now, "week")
			);
		} else if (filter === "Current Year") {
			filtered = activities.filter((activity) =>
				moment(activity.date).isSame(now, "year")
			);
		}
		setFilteredActivities(filtered);
	};

	useEffect(() => {
		fetchActivities();
	}, []);

	useEffect(() => {
		filterActivities();
	}, [filter, activities]);

	const getRandomColor = () => {
		const colors = [
			"#FF6B6B",
			"#6BCB77",
			"#4D96FF",
			"#FFC107",
			"#FF914D",
			"#8E44AD",
		];
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<Card className="bg-white p-4 shadow-md rounded-xl w-[310px] md:w-full">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-md lg:text-xl md:text-xl font-semibold font-poppins leading-[30px] text-left decoration-slice">
					Upcoming Activity
				</h2>
				<Select value={filter} onValueChange={setFilter}>
					<SelectTrigger className="border p-2 rounded-md text-sm w-[110px]">
						{filter}
					</SelectTrigger>
					<SelectContent className="font-semibold font-poppins">
						<SelectItem value="All">All</SelectItem>
						<SelectItem value="Month">Month</SelectItem>
						<SelectItem value="Week">Week</SelectItem>
						<SelectItem value="Current Year">Year</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<ScrollArea className="h-80">
				<div className="space-y-4">
					{isLoading ? (
						<p>
							<Skeleton />
						</p>
					) : Array.isArray(filteredActivities) &&
					  filteredActivities.length > 0 ? (
						filteredActivities.map((activity) => {
							const color = getRandomColor();
							return (
								<div
									key={activity._id}
									className="flex justify-between items-center p-2 border-b"
								>
									<div className="flex items-center space-x-4">
										<div
											className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
											style={{
												backgroundColor: `${color}1A`,
												color: color,
											}}
										>
											{activity.title
												.charAt(0)
												.toUpperCase()}
										</div>
										<div>
											<div className="font-semibold font-poppins">
												{activity.title}
											</div>
											<div className="text-gray-500 text-sm">
												{activity.time}
											</div>
										</div>
									</div>
									<div className="text-gray-400 text-sm">
										{moment(activity.date).format(
											"DD-MM-YYYY"
										)}
									</div>
								</div>
							);
						})
					) : (
						<p className="text-gray-500 text-sm font-semibold font-poppins">
							No activities found.
						</p>
					)}
				</div>
			</ScrollArea>
		</Card>
	);
}
