import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummyEvents } from "@/data/dummyEvents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Events() {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate an API call with a delay
		const fetchEvents = async () => {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setEvents(dummyEvents);
			setIsLoading(false);
		};

		fetchEvents();
	}, []);

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between items-center">
				<CardTitle>Events Participation</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="max-h-[675px] overflow-y-auto custom-scrollbar">
					<div>
						<table className="w-full text-left border-collapse">
							<thead className="text-center text-gray-700">
								<tr className="bg-blue-50 font-semibold font-poppins">
									<th className="p-3 rounded-tl-xl text-start">
										Participator Name
									</th>
									<th className="p-3">Description</th>
									<th className="p-3">Event Time</th>
									<th className="p-3">Event Date</th>
									<th className="p-3 rounded-tr-xl">
										Event Name
									</th>
								</tr>
							</thead>
							<tbody className="text-center text-gray-600 font-poppins">
								{isLoading ? (
									<tr>
										<td
											colSpan="5"
											className="p-4 text-center"
										>
											Loading...
										</td>
									</tr>
								) : (
									events.map((event) => (
										<tr key={event.id} className="border-b">
											<td className="p-3 text-start flex items-center">
												<Avatar className="w-10 h-10 me-3">
													<AvatarImage
														src="https://github.com/shadcn.png"
														alt={
															event.participatorName
														}
													/>
													<AvatarFallback>
														CN
													</AvatarFallback>
												</Avatar>
												{event.participatorName}
											</td>
											<td className="p-3 text-start w-96">
												{event.description}
											</td>
											<td className="p-3">
												<span className="bg-slate-100 rounded-full px-4 py-2">
													{event.eventTime}
												</span>
											</td>
											<td className="p-3">
												{event.eventDate}
											</td>
											<td className="p-3">
												{event.eventName}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
