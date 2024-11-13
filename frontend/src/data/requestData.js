export const requestData = [
	{
		id: 1,
		RequesterName: "Evelyn Harper",
		RequestName: "Unethical Behavior",
		description:
			"Offering, giving, receiving, or soliciting of value to influence the actions of another.",
		date: "01/02/2024",
		wing: "A",
		unit: "101",
		priority: "Medium",
		status: "Open",
	},
	{
		id: 2,
		RequesterName: "John Doe",
		RequestName: "Noise Complaint",
		description:
			"Excessive noise from the neighbor's apartment during late hours.",
		date: "02/03/2024",
		wing: "B",
		unit: "202",
		priority: "Low",
		status: "Pending",
	},
	{
		id: 3,
		RequesterName: "Jane Smith",
		RequestName: "Maintenance Issue",
		description:
			"Leaking faucet in the bathroom that needs immediate repair.",
		date: "03/04/2024",
		wing: "C",
		unit: "303",
		priority: "High",
		status: "Open",
	},
	{
		id: 4,
		RequesterName: "Alice Johnson",
		RequestName: "Parking Violation",
		description:
			"Unauthorized vehicle parked in the reserved spot for more than 24 hours.",
		date: "04/05/2024",
		wing: "D",
		unit: "404",
		priority: "Medium",
		status: "Solve",
	},
	{
		id: 5,
		RequesterName: "Bob Brown",
		RequestName: "Security Concern",
		description:
			"Suspicious activity near the entrance gate late at night.",
		date: "05/06/2024",
		wing: "E",
		unit: "505",
		priority: "High",
		status: "Open",
	},
	{
		id: 6,
		RequesterName: "Charlie Davis",
		RequestName: "Water Leakage",
		description: "Water leakage from the ceiling in the living room.",
		date: "06/07/2024",
		wing: "F",
		unit: "606",
		priority: "High",
		status: "Pending",
	},
	{
		id: 7,
		RequesterName: "Diana Evans",
		RequestName: "Garbage Disposal",
		description: "Garbage not collected for the past three days.",
		date: "07/08/2024",
		wing: "G",
		unit: "707",
		priority: "Medium",
		status: "Open",
	},
	{
		id: 8,
		RequesterName: "Edward Frank",
		RequestName: "Electricity Issue",
		description: "Power outage in the entire wing.",
		date: "08/09/2024",
		wing: "H",
		unit: "808",
		priority: "High",
		status: "Open",
	},
	{
		id: 9,
		RequesterName: "Grace Green",
		RequestName: "Pest Infestation",
		description: "Rodents and insects in the kitchen.",
		date: "09/10/2024",
		wing: "I",
		unit: "909",
		priority: "High",
		status: "Pending",
	},
	{
		id: 10,
		RequesterName: "Henry Hughes",
		RequestName: "Internet Connectivity",
		description: "Slow internet speed and frequent disconnections.",
		date: "10/11/2024",
		wing: "J",
		unit: "1010",
		priority: "Medium",
		status: "Open",
	},
	{
		id: 11,
		RequesterName: "Henry Hughes",
		RequestName: "Internet Connectivity",
		description: "Slow internet speed and frequent disconnections.",
		date: "10/11/2024",
		wing: "J",
		unit: "1010",
		priority: "Medium",
		status: "Open",
	},
	{
		id: 12,
		RequesterName: "Henry Hughes",
		RequestName: "Internet Connectivity",
		description: "Slow internet speed and frequent disconnections.",
		date: "10/11/2024",
		wing: "J",
		unit: "1010",
		priority: "Medium",
		status: "Open",
	},
];

export const getPriorityColor = (priority) => {
	switch (priority) {
		case "High":
			return "bg-red-700";
		case "Medium":
			return "bg-blue-700";
		case "Low":
			return "bg-green-700";
		default:
			return "bg-gray-700";
	}
};

export const getStatusColor = (status) => {
	switch (status) {
		case "Open":
			return "bg-blue-100 text-blue-600";
		case "Pending":
			return "bg-yellow-100 text-yellow-600";
		case "Solve":
			return "bg-green-100 text-green-600";
		default:
			return "bg-gray-100";
	}
};
