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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import axiosInstance from "@/test/axiosInstance";
import { jwtDecode } from "jwt-decode";

function Notification({ message, date, name, scheduleDate, onView, onIgnore }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
                <div className="bg-orange-200 rounded-full h-10 w-10 text-center pt-1">
                    <div className="text-2xl font-semibold text-blue-500">
                        F
                    </div>
                </div>
                <div className="ml-4">
                    <p className="text-lg font-semibold">{message}</p>
                    <p className="text-gray-500 text-sm">{date}</p>
                </div>
            </div>

            <div className="mb-2">
                <p className="text-gray-700">
                    Name: <span className="font-semibold">{name}</span>
                </p>
                <p className="text-gray-700">
                    Schedule Date:{" "}
                    <span className="font-semibold">{scheduleDate}</span>
                </p>
            </div>

            <div className="flex justify-between">
                <div>
                    <button
                        className=" bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
                        onClick={onView}
                    >
                        View
                    </button>
                    <button
                        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-11"
                        onClick={onIgnore}
                    >
                        Ignore
                    </button>
                </div>

                <div className="text-gray-500 text-sm text-right mt-2">
                    32 Minutes ago
                </div>
            </div>
        </div>
    );
}

export default function Header() {
    const location = useLocation();
    const cardRef = useRef(null);

    const getBreadcrumbItems = () => {
        return breadcrumbData[location.pathname] || [];
    };
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
                if (!token) {
                    throw new Error("No token found in local storage");
                }
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

    const breadcrumbItems = getBreadcrumbItems();

    return (
        <header className="flex justify-between font-poppins items-center p-4 ml-64 bg-white shadow-md h-[100px]">
            <div className="flex items-center space-x-4">
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
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div className="border border-gray-300 p-1 rounded-lg">
                        <a href="##" onClick={handleCardToggle}>
                            <img
                                src="/src/assets/icons8.gif"
                                alt="Active"
                                className="h-6 w-6"
                            />
                        </a>
                    </div>

                    {/* Conditionally rendered card with Notification content */}
                    {isCardVisible && (
                        <Card
                            ref={cardRef}
                            className="absolute top-[40px] -left-[505px] w-[540px] h-auto space-y-2.5 shadow-md bg-white z-50 animate-slide-down"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-800">
                                    <div className="flex justify-between">
                                        <div className="font-poppins font-semibold text-lg leading-[30px] text-left text-[#202224]">
                                            Notification
                                        </div>
                                        <div className="text-right">
                                            <a
                                                href="##"
                                                className="font-poppins font-semibold text-xs leading-[18px] text-[#5678E9]"
                                            >
                                                Clear all
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-[500px] h-0 gap-0 border-t border-gray-200"></div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Add Notification Component */}
                                <Notification
                                    message="New Facility Created."
                                    date="Monday 11:41 AM"
                                    name="Parking Facility"
                                    scheduleDate="01/02/2024"
                                    onView={() => console.log("View clicked")}
                                    onIgnore={() =>
                                        console.log("Ignore clicked")
                                    }
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div className="flex h-7 items-center space-x-4 text-sm">
                    <Separator orientation="vertical" />
                    <img
                        src="/src/assets/profileimg.jpeg"
                        alt="Active"
                        className="h-9 w-9 rounded-full"
                    />
                    <Link to="/edit-profile">
                        <div className="grid grid-rows-2 mt-2">
                            <div className="font-poppins font-bold">{`${userProfile.firstName} ${userProfile.lastName}`}</div>
                            <div className="text-xs text-gray-600">
                                {userProfile.role}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
