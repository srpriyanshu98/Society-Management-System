import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import menuItems from "@/data/menuItems";
import { Separator } from "./ui/separator";
import axiosInstance from "@/test/axiosInstance";
import { useAuth } from "@/hooks/useAuth.jsx";

export default function Sidebar({ userRole = "resident" }) {
    const [expandedMenu, setExpandedMenu] = useState(null);
    const userMenuItems = menuItems[userRole] || [];
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const toggleSubMenu = (itemName) => {
        setExpandedMenu(expandedMenu === itemName ? null : itemName);
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("Token");
            logout();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="fixed h-screen w-64 bg-white shadow-lg">
            <div className="p-4 font-bold text-xl">
                <img src="./src/assets/Logo.png" alt="Logo" />
            </div>
            <Separator className="my-6 w-52 mx-auto" />
            <div className="mt-8 space-y-2">
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
                                            `ml-8 block p-2 mt-2 text-sm rounded-lg  ${
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
            <div className="inline-block space-x-7 absolute top-[870px]">
                <Separator className="mb-3 w-52 ms-5" />
                <div>
                    <img
                        src="/src/assets/logout.svg"
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
