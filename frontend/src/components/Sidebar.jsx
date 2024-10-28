import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import menuItems from "@/data/menuItems";

function Sidebar({ userRole = "admin" }) {
	const userMenuItems = menuItems[userRole] || [];

	return (
		<div className="fixed h-screen w-64 bg-white shadow-lg">
			<div className="p-4 font-bold text-xl text-orange-600">
				DashStack
			</div>
			<div className="mt-8 space-y-2">
				{userMenuItems.map((item) => {
					const IconComponent = Icons[item.icon] || Icons.Menu;
					return (
						<NavLink
							to={item.path}
							className={({ isActive }) =>
								`flex items-center space-x-4 px-4 py-2 rounded-lg ${
									isActive
										? "bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-md"
										: "text-gray-700 hover:bg-gray-100"
								}`
							}
							key={item.name}
						>
							<IconComponent className="w-5 h-5" />
							<span>{item.name}</span>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
}

export default Sidebar;
