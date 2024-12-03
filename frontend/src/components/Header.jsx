import React, { useState, useRef, useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";
import breadcrumbData from "@/data/breadcrumbData";
import { Separator } from "./ui/separator";
import axiosInstance from "@/test/axiosInstance";
import Notification from "./Notificationcomponent/Notification";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./Sidebar";

export default function Header() {
    const location = useLocation();
    const cardRef = useRef(null);

    const [isCardVisible, setIsCardVisible] = useState(false);
    const [userProfile, setUserProfile] = useState({
        firstName: "",
        lastName: "",
        role: "",
    });

    const handleCardToggle = () => {
        setIsCardVisible((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setIsCardVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found in local storage");

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                const response = await axiosInstance.get(`/auth/${userId}`);
                const { firstName, lastName, role } = response.data;
                setUserProfile({ firstName, lastName, role });
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserProfile();
    }, []);

    const breadcrumbItems = breadcrumbData[location.pathname] || [];

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarVisible((prev) => !prev);
	};

    return (
        <header className="flex justify-between font-poppins items-center md:ml-64 p-4 bg-white shadow-md h-[100px]">
            <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbItems.map((item, index) => (
                                <React.Fragment key={item.href}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={item.href}>
                                            {item.label}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {index < breadcrumbItems.length - 1 && (
                                        <BreadcrumbSeparator />
                                    )}
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {/* Button only visible on medium screens and larger */}
                <button className="bg-gray-100 h-10 w-10 md:hidden block rounded-full">
                    <img
                        src="/src/assets/toggle.svg"
                        alt="Active"
                        className="ml-3"
                        onClick={toggleSidebar}
                    />
                </button>

            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div className="border border-gray-300 p-1 rounded-lg">
                        <Link href="##" onClick={handleCardToggle}>
                            <img
                                src="/src/assets/icons8.gif"
                                alt="Active"
                                className="h-6 w-6"
                            />
                        </Link>
                    </div>
                    {/* Render Notification Component */}
                    <Notification
                        isCardVisible={isCardVisible}
                        onClose={handleCardToggle}
                        cardRef={cardRef}
                    />
                </div>
                <div className="flex h-7 items-center space-x-4 text-sm">
                    <Separator orientation="vertical" />
                    

                    <Link
                        to="/edit-profile"
                        className="grid grid-cols-[auto_1fr] items-center gap-4"
                    >
                        <img
                            src="/src/assets/profileimg.jpeg"
                            alt="Active"
                            className="h-9 w-9 rounded-full"
                        />
                        <div className="hidden md:block  gap-1">
                            <div className="font-poppins font-bold">{`${userProfile.firstName} ${userProfile.lastName}`}</div>
                            <div className="text-xs text-gray-600">
                                {userProfile.role}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />
        </header>
    );
}
