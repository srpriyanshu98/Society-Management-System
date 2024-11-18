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
  security: [
    {
      name: "Security",
      path: "/visitortracking-screen",
      icon: "Cctv",
      subItems: [
        { name: "Visitor Tracking", path: "/visitortracking-screen" },
        { name: "Emergency Management", path: "/emergencymanagement" },
      ],
    },
  ],
};

export default menuItems;
