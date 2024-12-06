import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IncomeInvoicesData } from "@/data/IncomeInvoices";
import { Eye } from "lucide-react";
import { useState } from "react";
import IncomeInvoicesModel from "./IncomeInvoicesModel";

export default function IncomeInvoices() {
	const [selectedIncome, setSelectedIncome] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const sortedIncomes = IncomeInvoicesData.sort((a, b) => {
		const dateA = new Date(a.billDate);
		const dateB = new Date(b.billDate);
		return dateB - dateA;
	});

	const handleViewIncome = (income) => {
		setSelectedIncome(income);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setSelectedIncome(null);
		setModalOpen(false);
	};

	const calculateGrandTotal = (members, eventAmount) => {
		return members * parseFloat(eventAmount);
	};

	return (
		<Card className="shadow-md rounded-lg">
			<CardHeader>
				<CardTitle className="text-base md:text-[24px] font-semibold text-gray-800">
					Income Invoices
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="max-h-[570px] md:max-h-[715px] overflow-y-auto custom-scrollbar">
					<div className="overflow-auto">
						<table className="w-full text-left border-collapse">
							<thead className="text-center text-gray-600">
								<tr className="bg-blue-50 font-semibold text-sm md:text-[16px]">
									<th className="p-3 rounded-tl-xl text-start">
										Invoice ID
									</th>
									<th className="p-3">Event Name</th>
									<th className="p-3">Bill Date</th>
									<th className="p-3">Payment Date</th>
									<th className="p-3">Members</th>
									<th className="p-3">Grand Total</th>
									<th className="p-3 rounded-tr-xl">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="text-center text-xs font-poppins md:text-base">
								{sortedIncomes.map((income) => (
									<tr
										key={income.invoiceId}
										className="border-b text-slate-600 font-medium hover:bg-blue-50 transition"
									>
										<td className="p-3 text-start">
											{income.invoiceId}
										</td>
										<td className="p-3">
											{income.eventName}
										</td>
										<td className="p-3">
											{income.billDate}
										</td>
										<td className="p-3">
											{income.paymentDate}
										</td>
										<td className="p-3 text-blue-600">
											{income.members}
										</td>

										<td className="p-3 text-red-600">
											₹{" "}
											{calculateGrandTotal(
												income.members,
												income.eventAmount
											).toFixed(2)}
										</td>
										<td className="p-3">
											<button
												onClick={() =>
													handleViewIncome(income)
												}
												className="flex items-center  justify-center p-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
											>
												<Eye className="h-3 w-3 md:h-5 md:w-5" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</CardContent>

			{selectedIncome && (
				<IncomeInvoicesModel
					open={modalOpen}
					onClose={handleCloseModal}
					income={selectedIncome}
				/>
			)}
		</Card>
	);
}
