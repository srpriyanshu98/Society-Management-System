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

export const description =
	"A line chart with blue color, shadow, and padding before and after the line.";

export default function BalanceGraph() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Balance</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col h-full justify-center">
				<div className="w-full h-[300px]">
					<ResponsiveContainer>
						<LineChart
							data={chartData}
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
							/>
							<YAxis
								tickLine={false}
								tickMargin={20}
								tickFormatter={(value) => `${value / 10}k`}
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
								// stroke="url(#colorGradient)"
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
