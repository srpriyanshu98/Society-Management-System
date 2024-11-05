import { Card } from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

export default function BalanceGraph() {
	return (
		<Card className="p-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Total Balance</h3>
				<Select>
					<SelectTrigger className="w-32">
						<SelectItem>Last month</SelectItem>
					</SelectTrigger>
					<SelectContent>
						<SelectItem>Last week</SelectItem>
						<SelectItem>Last month</SelectItem>
						<SelectItem>Last year</SelectItem>
					</SelectContent>
				</Select>
			</div>
			{/* Placeholder for chart - integrate a chart library here */}
			<div className="mt-4 h-32 bg-gray-100 rounded-md">[Chart]</div>
		</Card>
	);
}
