const breadcrumbData = {
	"/": [{ label: "Home", href: "/" }],

	// ADMIN BREADCRUM
	"/residents": [
		{ label: "Home", href: "/" },
		{ label: "Resident Management", href: "/residents" },
	],
	"/financial": [
		{ label: "Home", href: "/" },
		{ label: "Financial Management", href: "/financial" },
		{ label: "Income", href: "/financial" },
	],
	"/add-expenses": [
		{ label: "Home", href: "/" },
		{ label: "Financial Management", href: "/financial" },
		{ label: "Expense", href: "/add-expenses" },
	],
	"/note": [
		{ label: "Home", href: "/" },
		{ label: "Financial Management", href: "/financial" },
		{ label: "Note", href: "/note" },
	],
	"/facilities": [
		{ label: "Home", href: "/" },
		{ label: "Facility Management", href: "/facilities" },
	],
	"/complaints": [
		{ label: "Home", href: "/" },
		{ label: "Complaint Tracking", href: "/complaints" },
		{ label: "Create Complaint", href: "/complaints" },
	],
	"/request-tracking": [
		{ label: "Home", href: "/" },
		{ label: "Request Tracking", href: "/request-tracking" },
		{ label: "Create Request", href: "/request-tracking" },
	],
	"/security": [
		{ label: "Home", href: "/" },
		{ label: "Security Management", href: "/security" },
		{ label: "Visitor Logs", href: "/security" },
	],
	"/security-protocols": [
		{ label: "Home", href: "/" },
		{ label: "Security Management", href: "/security" },
		{ label: "Security Protocols", href: "/security-protocols" },
	],

	"/security-guard": [
		{ label: "Home", href: "/" },
		{ label: "Security Guard", href: "/security-guard" },
	],
	"/announcements": [
		{ label: "Home", href: "/" },
		{ label: "Announcement", href: "/announcements" },
	],
	"/edit-profile": [
		{ label: "Home", href: "/" },
		{ label: "Edit Profile", href: "/edit-profile" },
	],
	"/resident-form": [
		{ label: "Home", href: "/" },
		{ label: "Resident Management", href: "/residents" },
		{ label: "Residents Form", href: "/resident-form" },
	],

	// RESIDENT BREADCRUM
	"/personal-detail": [
		{ label: "Home", href: "/" },
		{ label: "Personal Detail", href: "/personal-detail" },
	],
	"/service-complaint": [
		{ label: "Home", href: "/" },
		{ label: "Service Complaint", href: "/service-complaint" },
	],
	"/events-participation": [
		{ label: "Home", href: "/" },
		{ label: "Events Participation", href: "/events-participation" },
	],
	"/community": [
		{ label: "Home", href: "/" },
		{ label: "Community", href: "/community" },
	],
	"/polls": [
		{ label: "Home", href: "/" },
		{ label: "Community", href: "/community" },
		{ label: "Polls", href: "/polls" },
	],
	"/communities-discussion": [
		{ label: "Home", href: "/" },
		{ label: "Communities", href: "/community" },
		{ label: "Communities Discussion", href: "/communities-discussion" },
	],
	"/maintenance-invoices": [
		{ label: "Home", href: "/" },
		{ name: "Maintenance Invoices", path: "/maintenance-invoices" },
	],
	"/other-invoice": [
		{ label: "Home", href: "/" },
		{ name: "Other Income Invoice", path: "/other-invoice" },
	],
	"/security-protocals": [
		{ label: "Home", href: "/" },
		{ label: "Security Protocals", href: "/security-protocals" },
	],

	// SECURITY  BREADCRUM
	"/visitortracking-screen": [
		{ label: "Home", href: "/" },
		{ label: "Visitortracking Screen", href: "/visitortracking-screen" },
	],
	"/emergencymanagement": [
		{ label: "Home", href: "/" },
		{ label: "Emergencymanagement", href: "/emergencymanagement" },
	],
};

export default breadcrumbData;
