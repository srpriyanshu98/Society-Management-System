import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

export function InvoiceModal({ open, onClose, invoice }) {
	const handleDownload = () => {
		const doc = new jsPDF();
		doc.text(`Invoice ID: ${invoice.invoiceId}`, 10, 10);
		doc.text(`Owner Name: ${invoice.ownerName}`, 10, 20);
		doc.text(`Bill Date: ${invoice.billDate}`, 10, 30);
		doc.text(`Payment Date: ${invoice.paymentDate}`, 10, 40);
		doc.text(`Phone Number: ${invoice.phoneNumber}`, 10, 50);
		doc.text(`Email: ${invoice.email}`, 10, 60);
		doc.text(`Address: ${invoice.address}`, 10, 70);
		doc.text(`Maintenance Amount: ${invoice.maintenanceAmount}`, 10, 80);
		doc.text(`Pending Amount: ${invoice.pendingAmount}`, 10, 90);
		doc.text(
			`Grand Total: ${
				parseFloat(invoice.maintenanceAmount) +
				parseFloat(invoice.pendingAmount)
			}`,
			10,
			100
		);
		doc.text(`Note: ${invoice.note}`, 10, 110);
		doc.save(`invoice_${invoice.invoiceId}.pdf`);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invoice Details</DialogTitle>
					<DialogDescription>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p>
									<strong>Invoice ID:</strong>{" "}
									{invoice.invoiceId}
								</p>
								<p>
									<strong>Owner Name:</strong>{" "}
									{invoice.ownerName}
								</p>
								<p>
									<strong>Bill Date:</strong>{" "}
									{invoice.billDate}
								</p>
								<p>
									<strong>Payment Date:</strong>{" "}
									{invoice.paymentDate}
								</p>
								<p>
									<strong>Phone Number:</strong>{" "}
									{invoice.phoneNumber}
								</p>
								<p>
									<strong>Email:</strong> {invoice.email}
								</p>
								<p>
									<strong>Address:</strong> {invoice.address}
								</p>
							</div>
							<div>
								<p>
									<strong>Maintenance Amount:</strong>{" "}
									{invoice.maintenanceAmount}
								</p>
								<p>
									<strong>Pending Amount:</strong>{" "}
									{invoice.pendingAmount}
								</p>
								<p>
									<strong>Grand Total:</strong>{" "}
									{parseFloat(invoice.maintenanceAmount) +
										parseFloat(invoice.pendingAmount)}
								</p>
								<p>
									<strong>Note:</strong> {invoice.note}
								</p>
							</div>
						</div>
						<Button onClick={handleDownload} className="mt-4">
							Download Invoice
						</Button>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
