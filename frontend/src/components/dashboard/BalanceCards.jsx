import { data } from "@/data/incomeAndExpense";
import { Card } from "../ui/card";

export default function BalanceCards() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{data.map((item, index) => (
				<Card
					key={index}
					className="flex items-center justify-between p-4 space-x-4 rounded-lg shadow-lg relative overflow-hidden"
				>
					{/* Left Accent Bar */}
					<div
						className={`absolute left-0 top-0 bottom-0 w-2 h-14 rounded-e-lg m-auto bg-gradient-to-b ${item.colors.accent} opacity-40`}
					/>
					{/* Content */}
					<div className="flex flex-col">
						<p className="text-sm font-semibold">{item.label}</p>
						<h2 className="text-2xl font-bold text-gray-900">
							{item.value}
						</h2>
					</div>
					{/* Icon */}
					<img src={item.imgSrc} alt={`${item.label} icon`} />
				</Card>
			))}
		</div>
	);
}
