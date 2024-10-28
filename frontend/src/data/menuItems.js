const menuItems = {
	admin: [
		{ name: "Dashboard", path: "/", icon: "LayoutDashboard" },
		{ name: "Resident Management", path: "/residents", icon: "House" },
		{
			name: "Financial Management",
			path: "/financial",
			icon: "ReceiptIndianRupee",
		},
		{ name: "Facility Management", path: "/facilities", icon: "Building" },
		{ name: "Complaint Tracking", path: "/complaints", icon: "📋" },
		{ name: "Security Management", path: "/security", icon: "Shield" },
		{ name: "Security Guard", path: "/security-guard", icon: "Cctv" },
		{ name: "Announcement", path: "/announcements", icon: "📢" },
	],
	resident: [
		{ name: "Dashboard", path: "/dashboard", icon: "📊" },
		{ name: "Personal Detail", path: "/personal-detail", icon: "📋" },
		{
			name: "Service And Complaint",
			path: "/service-complaint",
			icon: "📢",
		},
		{
			name: "Events Participation",
			path: "/events-participation",
			icon: "📢",
		},
		{ name: "Community", path: "/community", icon: "📢" },
		{ name: "Payment Portal", path: "/payment-portal", icon: "📢" },
		{ name: "Security Protocols", path: "/security-protocals", icon: "📢" },
	],
	security: [{ name: "Security", path: "/security", icon: "Cctv" }],
};

export default menuItems;
