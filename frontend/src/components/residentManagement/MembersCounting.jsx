import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function MembersCounting() {
	const [memberCount, setMemberCount] = useState(0);

	return (
		<Card className="shadow-md  rounded-lg">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="text-lg">
						Member Counting:{" "}
						<span className="text-gray-300">(Other Members)</span>
					</CardTitle>
					<div>
						<span className="me-3">Select Member</span>
						<select
							className="border rounded-lg w-14 p-2 "
							value={memberCount}
							onChange={(e) => setMemberCount(e.target.value)}
						>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5</option>
						</select>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{/* Card Content can go here if needed */}
			</CardContent>
		</Card>
	);
}
