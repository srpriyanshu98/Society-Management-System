import { incomeData } from "@/data/otherIncomeData";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function OtherIncome() {
	return (
		<Card>
			<CardHeader className="inline-block">
				<CardTitle>Other Income</CardTitle>
				<Button>Create Other Income </Button>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{incomeData.map((item) => (
						<Card
							key={item.id}
							className="border shadow-lg rounded-lg"
						>
							<CardHeader className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
								<h3 className="text-lg font-semibold">
									{item.title}
								</h3>
							</CardHeader>
							<CardContent className="p-4 space-y-2">
								<p>
									<strong>Amount Per Member:</strong>{" "}
									<span className="text-blue-600">
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
