import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { maintenanceInvoices } from "@/data/maintenanceInvoices";
import { Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InvoiceModal } from "./InvoiceModal";

export default function Invoices() {
	const [selectedInvoice, setSelectedInvoice] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const sortedInvoices = maintenanceInvoices.sort((a, b) => {
		const dateA = new Date(a.billDate);
		const dateB = new Date(b.billDate);
		return dateB - dateA;
	});

	const handleViewInvoice = (invoice) => {
		setSelectedInvoice(invoice);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					Maintenance Invoices
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="max-h-[715px] overflow-y-auto custom-scrollbar">
					<div className="overflow-auto">
						<table className="w-full text-left border-collapse">
							<thead className="text-center text-gray-600">
								<tr className="bg-blue-50 font-semibold">
									<th className="p-3 rounded-tl-xl text-start">
										Invoice ID
									</th>
									<th className="p-3">Bill Date</th>
									<th className="p-3">Payment Date</th>
									<th className="p-3">Maintenance Amount</th>
									<th className="p-3">Pending Amount</th>
									<th className="p-3 rounded-tr-xl">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{sortedInvoices.map((invoice) => (
									<tr
										key={invoice.invoiceId}
										className="border-b text-slate-600 font-medium"
									>
										<td className="p-3 text-start">
											{invoice.invoiceId}
										</td>
										<td className="p-3">
											{invoice.billDate}
										</td>
										<td className="p-3">
											{invoice.paymentDate}
										</td>
										<td className="p-3 text-green-600">
											{invoice.maintenanceAmount}
										</td>
										<td className="p-3 text-red-600">
											{invoice.pendingAmount}
										</td>
										<td>
											<button
												onClick={() =>
													handleViewInvoice(invoice)
												}
											>
												<Eye className="h-5 w-5" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</CardContent>
			{selectedInvoice && (
				<InvoiceModal
					open={modalOpen}
					onClose={handleCloseModal}
					invoice={selectedInvoice}
				/>
			)}
		</Card>
	);
}
