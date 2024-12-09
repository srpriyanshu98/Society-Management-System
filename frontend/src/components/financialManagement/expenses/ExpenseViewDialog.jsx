import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import moment from "moment";

export default function ExpenseViewDialog({ isOpen, onClose, expense }) {
	if (!expense) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>View Expense Details</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="mt-4 space-y-4">
					<div>
						<p className="text-gray-700 font-semibold">Title</p>
						<p className="text-gray-600">{expense.title}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">
							Description
						</p>
						<p className="text-gray-600">{expense.description}</p>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-gray-700 font-semibold">Date</p>
							<p className="text-gray-600">
								{moment(expense.date).format("YYYY-MM-DD")}
							</p>
						</div>
						<div>
							<p className="text-gray-700 font-semibold">
								Amount
							</p>
							<p className="text-green-500">₹{expense.amount}</p>
						</div>
					</div>
					<div className="mt-4 flex items-center space-x-2">
						<img
							src={
								expense.billPermit === "PDF"
									? "/assets/Document.svg"
									: "/assets/jpg.svg"
							}
							alt={`${expense.billPermit} Icon`}
							className="w-6 h-6"
						/>
						<p className="text-gray-600">{expense.billPermit}</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
