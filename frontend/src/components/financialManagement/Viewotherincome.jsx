import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { ViewOtherIncomeData } from "@/data/ViewOtherIncomeData";

export default function ViewOtherIncome({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<Card>
				<CardHeader>
					<CardTitle>
						Ganesh Chaturthi Participator Member List
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<ScrollArea className="max-h-[690px] overflow-y-auto m-4 custom-scrollbar">
						<table className="w-full border-collapse rounded-tl-3xl text-center">
							<thead className="bg-gray-200 sticky top-0 z-10">
								<tr>
									<th className="p-4">Unit Number</th>
									<th className="p-4">Payment Date</th>
									<th className="p-4">Tnant/Owner Status</th>
									<th className="p-4">Phone Number</th>
									<th className="p-4">Amount</th>
									<th className="p-4">Payment</th>
								</tr>
							</thead>
							<tbody>
								{ViewOtherIncomeData.map((item) => (
									<tr key={item.id} className="border-b">
										<td className="p-4">
											{item.unitNumber}
										</td>
										<td className="p-4">{item.date}</td>
										<td className="p-4">
											<span
												className={`p-2 ps-8 pe-8 rounded-full text-base font-semibold ${
													item.status === "Owner"
														? "bg-blue-100 text-blue-800"
														: "bg-pink-100 text-pink-800"
												}`}
											>
												<span className="inline-block align-middle me-2">
													<img
														src={
															item.status ===
															"Owner"
																? "./src/assets/owner.svg"
																: "./src/assets/tenant.svg"
														}
														className="w-5 h-5"
														alt={`${item.status} Icon`}
													/>
												</span>
												<span>{item.status}</span>
											</span>
										</td>

										<td className="p-4 ">
											{item.phoneNumber}
										</td>
										<td className="p-4 text-green-500">
											{item.amount}
										</td>
										<td className="">
											<span
												className={`p-2 ps-8 pe-8 rounded-full text-base font-semibold ${
													item.paymentMode ===
													"Online"
														? "bg-blue-100 text-blue-800"
														: "bg-gray-100 text-gray-800"
												}`}
											>
												<span className="inline-block align-middle me-2">
													<img
														src={
															item.paymentMode ===
															"Online"
																? "./src/assets/wallet-2.svg"
																: "./src/assets/wallet-1.svg"
														}
														className="w-5 h-5"
														alt="Payment Icon"
													/>
												</span>
												<span>{item.paymentMode}</span>
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</ScrollArea>
				</CardContent>
			</Card>
		</Layout>
	);
}
