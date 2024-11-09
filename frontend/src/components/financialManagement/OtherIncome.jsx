import { incomeData } from "@/data/otherIncomeData";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MoreVertical } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../ui/dropdown-menu";
import React from "react";

export default function OtherIncome() {
	const [dropdownOpenId, setDropdownOpenId] = React.useState(null);

	const toggleDropdown = (id) => {
		setDropdownOpenId((prevId) => (prevId === id ? null : id));
	};

	return (
		<Card>
			<CardHeader className="">
				<CardTitle className="text-lg font-semibold">
					Other Income
				</CardTitle>
				<Button className="bg-orange-500 text-white hover:bg-orange-600 rounded-xl">
					Create Other Income
				</Button>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{incomeData.map((item) => (
						<Card
							key={item.id}
							className="border shadow-lg rounded-lg"
						>
							<CardHeader className="relative bg-blue-500 text-white p-4 rounded-t-lg">
								<h3 className="text-lg font-semibold">
									{item.title}
								</h3>
								<div className="absolute top-3 right-3">
									<DropdownMenu
										open={dropdownOpenId === item.id}
										onOpenChange={() =>
											toggleDropdown(item.id)
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
													alert("Edit item")
												}
											>
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													alert("View item")
												}
											>
												View
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													alert("Delete item")
												}
											>
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CardHeader>
							<CardContent className="p-4 space-y-1">
								<p>
									<strong>Amount Per Member:</strong>{" "}
									<span className="text-blue-600 font-semibold">
										{item.amount}
									</span>
								</p>
								<p>
									<strong>Total Member:</strong>{" "}
									{item.members}
								</p>
								<p>
									<strong>Date:</strong> {item.date}
								</p>
								<p>
									<strong>Due Date:</strong> {item.dueDate}
								</p>
								<p>
									<strong>Description:</strong>{" "}
									{item.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
