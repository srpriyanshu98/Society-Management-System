export const complaintsData = [
	{
		id: 1,
		complainerName: "Evelyn Harper",
		complainerImg: "/path/to/image1.jpg",
		complaintName: "Unethical Behavior",
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
		complainerName: "Evelyn Harper",
		complainerImg: "/path/to/image2.jpg",
		complaintName: "Unethical Behavior",
		description: "Concerns about unethical conduct in the workplace.",
		date: "01/02/2024",
		wing: "B",
		unit: "202",
		priority: "Low",
		status: "Pending",
	},
	{
		id: 3,
		complainerName: "Evelyn Harper",
		complainerImg: "/path/to/image3.jpg",
		complaintName: "Unethical Behavior",
		description: "Report on ethical violations among staff.",
		date: "01/02/2024",
		wing: "C",
		unit: "303",
		priority: "High",
		status: "Solve",
	},
	{
		id: 4,
		complainerName: "John Doe",
		complainerImg: "/path/to/image4.jpg",
		complaintName: "Noise Complaint",
		description:
			"Loud noises coming from neighboring units disturbing the peace.",
		date: "02/02/2024",
		wing: "A",
		unit: "102",
		priority: "Medium",
		status: "Open",
	},
	{
		id: 5,
		complainerName: "Jane Smith",
		complainerImg: "/path/to/image5.jpg",
		complaintName: "Parking Issue",
		description: "Unauthorized vehicles occupying assigned parking spots.",
		date: "03/02/2024",
		wing: "B",
		unit: "203",
		priority: "Low",
		status: "Pending",
	},
	{
		id: 6,
		complainerName: "Alice Johnson",
		complainerImg: "/path/to/image6.jpg",
		complaintName: "Maintenance Request",
		description: "Request for regular maintenance and repairs.",
		date: "04/02/2024",
		wing: "C",
		unit: "304",
		priority: "High",
		status: "Solve",
	},
	{
		id: 7,
		complainerName: "Bob Brown",
		complainerImg: "/path/to/image7.jpg",
		complaintName: "Security Concern",
		description: "Concerns about security breaches in the building.",
		date: "05/02/2024",
		wing: "A",
		unit: "103",
		priority: "Medium",
		status: "Open",
	},
	{
		id: 8,
		complainerName: "Charlie Davis",
		complainerImg: "/path/to/image8.jpg",
		complaintName: "Water Leak",
		description: "Water leaking from the ceiling in several areas.",
		date: "06/02/2024",
		wing: "B",
		unit: "204",
		priority: "Low",
		status: "Pending",
	},
	{
		id: 9,
		complainerName: "Diana Evans",
		complainerImg: "/path/to/image9.jpg",
		complaintName: "Elevator Malfunction",
		description:
			"Elevator not functioning properly, causing inconvenience.",
		date: "07/02/2024",
		wing: "C",
		unit: "305",
		priority: "High",
		status: "Solve",
	},
	{
		id: 10,
		complainerName: "Ethan Frank",
		complainerImg: "/path/to/image10.jpg",
		complaintName: "Garbage Disposal",
		description: "Issues with garbage disposal system in the building.",
		date: "08/02/2024",
		wing: "A",
		unit: "104",
		priority: "Medium",
		status: "Open",
	},
	{
		id: 11,
		complainerName: "Grace Green",
		complainerImg: "/path/to/image11.jpg",
		complaintName: "Lighting Issue",
		description: "Lights in the hallway are flickering and need repair.",
		date: "09/02/2024",
		wing: "B",
		unit: "205",
		priority: "Low",
		status: "Pending",
	},
	{
		id: 12,
		complainerName: "Henry Hill",
		complainerImg: "/path/to/image12.jpg",
		complaintName: "Pest Control",
		description: "Request for pest control services in the building.",
		date: "10/02/2024",
		wing: "C",
		unit: "306",
		priority: "High",
		status: "Solve",
	},
	{
		id: 13,
		complainerName: "Ivy Irving",
		complainerImg: "/path/to/image13.jpg",
		complaintName: "Heating Problem",
		description: "Heating system not working in the apartment.",
		date: "11/02/2024",
		wing: "A",
		unit: "105",
		priority: "Medium",
		status: "Open",
	},
	{
		id: 14,
		complainerName: "Jack Johnson",
		complainerImg: "/path/to/image14.jpg",
		complaintName: "Air Conditioning",
		description: "Air conditioning unit is malfunctioning.",
		date: "12/02/2024",
		wing: "B",
		unit: "206",
		priority: "Low",
		status: "Pending",
	},
	{
		id: 15,
		complainerName: "Kate King",
		complainerImg: "/path/to/image15.jpg",
		complaintName: "Roof Leak",
		description: "Leaking roof causing water damage.",
		date: "13/02/2024",
		wing: "C",
		unit: "307",
		priority: "High",
		status: "Solve",
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
