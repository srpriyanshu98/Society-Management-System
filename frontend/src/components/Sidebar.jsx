import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import menuItems from "@/data/menuItems";
import { Separator } from "./ui/separator";
import axiosInstance from "@/test/axiosInstance";
import { useAuthCheck, extractUserRoleFromToken } from "@/hooks/useAuth.jsx";

export default function Sidebar({ isVisible, onClose }) {
	const [expandedMenu, setExpandedMenu] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	useAuthCheck();

	const token = localStorage.getItem("token");
	const userRole = token ? extractUserRoleFromToken(token) : null;
	const userMenuItems = menuItems[userRole] || [];

	const toggleSubMenu = (itemName) => {
		setExpandedMenu(expandedMenu === itemName ? null : itemName);
	};

	const handleLogout = async () => {
		try {
			await axiosInstance.post("/auth/logout");
			localStorage.removeItem("token");
			navigate("/login", { replace: true });
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	// Redirect to dashboard on root path
	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/", { replace: true });
		}
	}, [location.pathname, navigate]);

	return (
		<div
			className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-lg transform transition-transform ${
				isVisible ? "translate-x-0" : "-translate-x-full"
			} md:translate-x-0 md:block`}
		>
			<button
				onClick={onClose}
				className="md:hidden cursor-pointer ml-52 mt-3 p-1 rounded-full hover:bg-gray-200"
			>
				<Icons.X className="h-5 w-5 text-gray-500" />
			</button>
			<div className="p-4 lg:mt-4 lg:ml-7 ml-9 font-bold text-xl">
				<img src="/assets/Logo.png" alt="Logo" />
			</div>
			<Separator className="my-2 w-52 mx-auto mb-7" />
			<div className="space-y-2">
				{userMenuItems.map((item) => {
					const IconComponent = Icons[item.icon] || Icons.Menu;
					const isExpanded = expandedMenu === item.name;
					const isActive =
						location.pathname === item.path ||
						item.subItems?.some(
							(subItem) => subItem.path === location.pathname
						);

					return (
						<div key={item.name}>
							<div className="flex items-center">
								<NavLink
									to={item.path || ""}
									onClick={() =>
										item.subItems
											? toggleSubMenu(item.name)
											: null
									}
									className={() =>
										`flex items-center space-x-4 w-56 font-poppins p-3 text-sm rounded-lg ${
											isActive || isExpanded
												? "bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-md"
												: "text-gray-700 hover:bg-gray-100"
										}`
									}
								>
									<IconComponent className="w-5 h-5" />
									<span>{item.name}</span>
								</NavLink>
							</div>
							{/* Sub-items dropdown */}
							{isExpanded &&
								item.subItems &&
								item.subItems.map((subItem) => (
									<NavLink
										to={subItem.path}
										className={({ isActive }) =>
											`ml-8 block p-2 mt-2 text-sm rounded-lg ${
												isActive
													? "bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-md"
													: "text-gray-700 hover:bg-gray-100"
											}`
										}
										key={subItem.name}
									>
										{subItem.name}
									</NavLink>
								))}
						</div>
					);
				})}
			</div>
			{/* Logout Section */}
			<div className="inline-block space-x-7 absolute bottom-10">
				<Separator className="mb-3 w-52 ms-5" />
				<div>
					<img
						src="/assets/logout.svg"
						alt="Logout"
						className="inline-block"
					/>
					<button
						onClick={handleLogout}
						className="text-[#E74C3C] text-sm font-poppins inline-block"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}
