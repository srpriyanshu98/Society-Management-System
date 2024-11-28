import Layout from "@/components/Layout";
import IncomeInvoices from "@/components/Resident-Components/PaymentPortal/IncomeInvoices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { incomeData } from "@/data/otherIncomeData";
import { useState } from "react";

export default function OtherInvoice({ userRole }) {
	const [showInvoicePage, setShowInvoicePage] = useState(false);

	const handleViewInvoice = () => {
		setShowInvoicePage(true);
	};

	return (
		<Layout userRole={userRole}>
			{showInvoicePage ? (
				<IncomeInvoices />
			) : (
				<>
					<Card className="mt-8">
						<CardHeader className="grid grid-cols-[auto_auto] items-center justify-between">
							<CardTitle className="text-lg font-semibold">
								Income Details
							</CardTitle>
							<Button onClick={handleViewInvoice}>
								View Invoice
							</Button>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{incomeData.map((income, index) => (
								<Card key={index} className="">
									<CardHeader className="bg-blue-500 rounded-t-lg text-white">
										<CardTitle className="text-base">
											Due Event Payment
											<span className="float-end">
												Pending
											</span>
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2 mt-3">
										<p>
											<span className="inline-block text-slate-600">
												Event Name
											</span>
											<span className="float-right">
												{income.title}
											</span>
										</p>
										<p>
											<span className="inline-block text-slate-600">
												Due Date
											</span>
											<span className="float-right">
												{income.dueDate}
											</span>
										</p>
										<Separator />
										<p>
											<span className="inline-block text-slate-600">
												Amount
											</span>
											<span className="float-right">
												₹{income.amount}
											</span>
										</p>
										<Button className="w-full">
											Pay Now
										</Button>
									</CardContent>
								</Card>
							))}
						</CardContent>
					</Card>
				</>
			)}
		</Layout>
	);
}
