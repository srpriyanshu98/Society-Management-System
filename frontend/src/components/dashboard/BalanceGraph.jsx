import {
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { chartData } from "@/data/chartData";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import React from "react";

export const description =
	"A line chart with blue color, shadow, and padding before and after the line.";

export default function BalanceGraph() {
	const [timeRange, setTimeRange] = React.useState("all");

	const filteredData = React.useMemo(() => {
		const now = new Date();
		if (timeRange === "all") {
			return chartData; // Return all data
		}

		let daysToSubtract = 90; // Default to 90 days
		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}

		now.setDate(now.getDate() - daysToSubtract);
		return chartData.filter((item) => new Date(item.date) >= now);
	}, [timeRange]);

	return (
		<Card className="rounded-xl w-[305px] md:w-full sm:w-full lg:w-full">
			<CardHeader>
				<div className="flex justify-between font-poppins">
					<CardTitle className="text-[15px] md:text[15px] lg:text-[20px] font-semibold font-poppins leading-[30px] text-left decoration-slice">
						Total Balance
					</CardTitle>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger className="w-[125px] md:w-[160px] lg:w-[160px]">
							<SelectValue placeholder="Select time range" />
						</SelectTrigger>
						<SelectContent className="rounded-xl w-[140px] md:w-[190px] lg:w-[180px]">
							<SelectItem value="all" className="rounded-lg text-xs md:text-[0.9rem]">
								All Data
							</SelectItem>
							<SelectItem value="90d" className="rounded-lg text-xs md:text-[0.9rem]">
								Last 3 months
							</SelectItem>
							<SelectItem value="30d" className="rounded-lg text-xs md:text-[0.9rem]">
								Last 30 days
							</SelectItem>
							<SelectItem value="7d" className="rounded-lg text-xs md:text-[0.9rem]">
								Last 7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col h-full p-0 md:p-6 justify-center font-poppins">
				<div className="w-full h-[285px]">
					<ResponsiveContainer>
						<LineChart
							data={filteredData} // Use filtered data for the chart
							margin={{
								top: 10,
								right: 10,
								left: 10,
								bottom: 20,
							}}
						>
							<defs>
								<filter
									id="shadow"
									x="-50%"
									y="-50%"
									width="200%"
									height="200%"
								>
									<feDropShadow floodColor="#a79cf9" />
								</filter>
								<linearGradient id="colorGradient" y2="1">
									<stop
										offset="100%"
										stopColor="#a79cf9"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								tickMargin={20}
								tickFormatter={(value) => value.slice(0, 3)}
								className="text-[15px] md:text-[15px]"
							/>
							<YAxis
								tickLine={false}
								tickMargin={20}
								tickFormatter={(value) => `${value / 10}k`}
								className="text-[15px] md:text-[15px]"
							/>
							<Tooltip
								contentStyle={{
									borderRadius: "8px",
									borderColor: "#a79cf9",
								}}
							/>
							<Line
								type="monotone"
								dataKey="desktop"
								strokeWidth={2}
								dot={{ r: 4, fill: "#a79cf9" }}
								activeDot={{ r: 6, fill: "#a79cf9" }}
								style={{ filter: "url(#shadow)" }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
