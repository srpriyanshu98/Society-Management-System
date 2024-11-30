const menuItems = {
	admin: [
		{ name: "Dashboard", path: "/", icon: "LayoutDashboard" },
		{ name: "Resident Management", path: "/residents", icon: "House" },
		{
			name: "Financial Management",
			icon: "ReceiptIndianRupee",
			subItems: [
				{ name: "Income", path: "/financial" },
				{ name: "Expense", path: "/add-expenses" },
				{ name: "Note", path: "/note" },
			],
		},
		{ name: "Facility Management", path: "/facilities", icon: "Building" },
		{
			name: "Complaint Tracking",
			icon: "📋",
			subItems: [
				{ name: "Create Complaint", path: "/complaints" },
				{ name: "Request Tracking", path: "/request-tracking" },
			],
		},
		{
			name: "Security Management",
			icon: "Shield",
			subItems: [
				{ name: "Visitor Logs", path: "/security" },
				{ name: "Security Protocols", path: "/security-protocols" },
			],
		},
		{ name: "Security Guard", path: "/security-guard", icon: "Cctv" },
		{ name: "Announcement", path: "/announcements", icon: "📢" },
	],
	resident: [
		{ name: "Dashboard", path: "/", icon: "LayoutDashboard" },
		{
			name: "Personal Detail",
			path: "/personal-detail",
			icon: "SquareUserRound",
		},
		{
			name: "Service And Complaint",
			path: "/service-complaint",
			icon: "ServerCrash",
		},
		{
			name: "Events Participation",
			path: "/events-participation",
			icon: "CalendarFold",
		},
		{
			name: "Community",
			icon: "Component",
			subItems: [
				{ name: "Access Forums", path: "/community" },
				{ name: "Polls", path: "/polls" },
				{
					name: "Communities Discussion",
					path: "/communities-discussion",
				},
			],
		},
		{
			name: "Payment Portal",
			icon: "HandCoins",
			subItems: [
				{ name: "Maintenance Invoices", path: "/maintenance-invoices" },
				{ name: "Other Income Invoice", path: "/other-invoice" },
			],
		},
		{
			name: "Security Protocols",
			path: "/security-protocals",
			icon: "ShieldCheck",
		},
	],
	security: [
		{
			name: "Security",
			path: "/",
			icon: "Cctv",
			subItems: [
				{ name: "Visitor Tracking", path: "/visitortracking-screen" },
				{ name: "Emergency Management", path: "/emergencymanagement" },
			],
		},
	],
};

export default menuItems;
