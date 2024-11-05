import { Card } from "@/components/ui/card";

export default function PendingMaintenance() {
	const items = [
		{ name: "Roger Lubin", status: "2 Month Pending", amount: "₹ 5,000" },
		// Add more maintenance items here
	];

	return (
		<Card className="p-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Pending Maintenances</h3>
				<a href="#" className="text-blue-500">
					View all
				</a>
			</div>
			<div className="mt-4 space-y-2">
				{items.map((item) => (
					<div key={item.name} className="flex justify-between">
						<div>
							<p>{item.name}</p>
							<p className="text-gray-500">{item.status}</p>
						</div>
						<p className="text-red-500 font-semibold">
							{item.amount}
						</p>
					</div>
				))}
			</div>
		</Card>
	);
}
