import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

// NotificationOne Component
function NotificationOne({ id, message, date, name, onView, onIgnore, money, festival, wing, unit }) {
    return (
        <div className="bg-white rounded-lg">
            <div className="flex items-center mb-2">
                <div className="border-2 rounded-full">
                    <div className="flex-shrink-0">
                        <img
                            src="/src/assets/profileimg.jpeg"
                            alt="Notification img"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                </div>
                <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold">{name}
                        {wing && <span> ({wing} -</span>}
                        {unit && <span>{unit})</span>}
                    </h2>
                    <p className="text-gray-500 text-sm">{date}</p>
                    <p className="text-gray-700 text-sm">
                        {message}
                        {money && <span className="text-blue-500"> of {money} rupees</span>}
                        {festival && <span className="text-blue-500"> for {festival}.</span>}
                    </p>

                </div>
            </div>

            <div className="flex justify-between mb-2">
                <div className="ml-14">
                    <Button
                        className="text-gray-900 py-2 px-4 rounded-lg mr-2"
                        onClick={onView}
                        variant="outline"
                    >
                        Accept
                    </Button>
                    <Button
                        className="text-white py-2 px-4 rounded-lg"
                        onClick={() => onIgnore(id)}
                        variant="secondary"
                    >
                        Decline
                    </Button>
                </div>
                <div className="text-gray-500 text-sm text-right mt-2">32 Minutes ago</div>
            </div>
            <Separator />
        </div>
    );
}

// NotificationItem Component for general notifications
function NotificationItem({ id, message, date, name, scheduleDate, onView, onIgnore }) {
    return (
        <div className="bg-white rounded-lg">
            <div className="flex items-center">
                <div className="bg-orange-200 rounded-full h-10 w-10 text-center pt-1">
                    <div className="text-2xl font-semibold text-blue-500">F</div>
                </div>
                <div className="ml-4">
                    <p className="text-lg font-semibold">{message}</p>
                    <p className="text-gray-500 text-sm">{date}</p>
                </div>
            </div>

            <div className="mb-2 ml-14">
                <p className="text-gray-700">
                    Name: <span className="text-blue-500">{name}</span>
                </p>
                {scheduleDate && (
                    <p className="text-gray-700">
                        Schedule Date: <span>{scheduleDate}</span>
                    </p>
                )}
            </div>

            <div className="flex justify-between mb-2 ml-14">
                <div>
                    <Button
                        className="text-gray-900 py-2 px-4 rounded-lg mr-2 w-28"
                        onClick={onView}
                        variant="outline"
                    >
                        View
                    </Button>
                    <Button
                        className="text-white py-2 px-4 rounded-lg w-28"
                        onClick={() => onIgnore(id)}
                        variant="secondary"
                    >
                        Ignore
                    </Button>
                </div>
                <div className="text-gray-500 text-sm text-right mt-2">32 Minutes ago</div>
            </div>
            <Separator />
        </div>
    );
}
// {name.charAt(0).toUpperCase()}

function NotificationTwo({ id, message, date, name, onView, onIgnore, wing, unit, money }) {
    return (
        <div className="bg-white rounded-lg">
            <div className="flex items-center mb-2">
                <div className="flex-shrink-0 mr-4">
                    <div className="bg-green-100 rounded-full h-10 w-10 flex items-center justify-center">
                        <img
                            src="/src/assets/moneys.svg"
                            alt="Maintenance img"
                            className=""
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">{name}
                        {wing && <span> ({wing} -</span>}
                        {unit && <span>{unit})</span>}
                    </h2>
                    <p className="text-gray-500 text-sm">{date}</p>
                    <p className="text-gray-700 text-sm">{message}
                        {money && <span className="text-blue-500">  Maintenance of {money} rupees.</span>}
                    </p>
                </div>
            </div>

            <div className="flex justify-between mb-2">
                <div className="ml-14">
                    <Button
                        className="text-gray-900 py-2 px-4 rounded-lg mr-2"
                        onClick={onView}
                        variant="outline"
                    >
                        Accept
                    </Button>
                    <Button
                        className="text-white py-2 px-4 rounded-lg"
                        onClick={() => onIgnore(id)}
                        variant="secondary"
                    >
                        Decline
                    </Button>
                </div>
                <div className="text-gray-500 text-sm text-right mt-2">2 Minutes ago</div>
            </div>
            <Separator />
        </div>
    );
}
function Notificationthird({ id, message, date, name, onView, onIgnore, wing, unit }) {
    return (
        <div className="bg-white rounded-lg mb-4">
            <div className="flex items-center mb-2">
                <div className="flex-shrink-0 mr-4">
                    <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center text-xl font-bold text-blue-600 justify-center mb-8">
                        {name.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">{name}
                        {wing && <span> ({wing} -</span>}
                        {unit && <span>{unit})</span>}
                    </h2>
                    <p className="text-gray-500 text-sm">{date}</p>
                    <p className="text-gray-700 text-justify w-80">{message}</p>
                </div>
            </div>

            <div className="flex justify-between mb-2">
                <div className="ml-14">
                    <Button
                        className="text-gray-900 py-2 px-4 rounded-lg mr-2"
                        onClick={onView}
                        variant="outline"
                    >
                        Accept
                    </Button>
                    <Button
                        className="text-white py-2 px-4 rounded-lg"
                        onClick={() => onIgnore(id)}
                        variant="secondary"
                    >
                        Decline
                    </Button>
                </div>
                <div className="text-gray-500 text-sm text-right mt-2">2 days ago</div>
            </div>
            <Separator />
        </div>
    );
}

function Notificationfour({ message, date, amount, penalty }) {
    return (
        <div className="bg-white rounded-lg">
            <div className="flex items-center mb-2">
                <div className="bg-green-100 rounded-full h-10 w-10 flex items-center justify-center mb-20">
                    <img
                        src="/src/assets/moneys.svg"
                        alt="Maintenance img"
                        className=""
                    />
                </div>
                <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold">{message}</h2>
                    <p className="text-gray-500 text-sm">{date}</p>
                    <div className="flex flex-col bg-gray-200 p-2 rounded-xl">
                        <div className="flex justify-between">
                            <p className="text-gray-700">Maintenance Amount :</p>
                            <p className="text-green-500 font-semibold">₹{amount}</p>
                        </div>
                        <div className="w-full h-px bg-white my-2"></div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Maintenance Penalty :</p>
                            <p className="text-red-500 font-semibold">₹{penalty}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Separator />
        </div>
    );
}


// Main Notification Component
export default function Notification({ isCardVisible, onClose, cardRef }) {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "typeOne",
            message: "Evelyn Harper gave a fund",
            money: "1000",
            festival: "Navratri",
            date: "Monday 11:41 AM",
            name: "Project Alpha",
            wing: "A",
            unit: "101",
        },
        {
            id: 2,
            type: "default",
            message: "New Facility Created.",
            date: "Monday 12:15 PM",
            name: "Parking Facility",
            scheduleDate: "01/03/2024",
        },
        {
            id: 3,
            type: "typeTwo",
            message: "Evelyn Harper gave a",
            date: "Tuesday 10:05 AM",
            name: "Maintenance",
            wing: "A",
            unit: "101",
            money: "1000",
        },
        {
            id: 4,
            type: "typeThree",
            message: "Approval needed for access request Approval needed for access request.",
            date: "Wednesday 9:30 AM",
            name: "Ganesh Chaturthi",
            wing: "A",
            unit: "101",
        },
        {
            id: 5,
            type: "typeFour",
            message: "Update Maintenance",
            date: "Thursday 2:00 PM",
            amount: "2000",
            penalty: "200",
        },
    ]);
    const [imageVisible, setImageVisible] = useState(false); // State to control image visibility


    const handleIgnoreNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    const handleClearAll = async () => {
        for (const notification of [...notifications]) {
            await new Promise((resolve) => setTimeout(resolve, 200)); // Delay for each removal
            handleIgnoreNotification(notification.id);
        }
        setImageVisible(true); // Set image visible after clearing notifications
        onClose(); // Close the card after all notifications are cleared
    };

    if (!isCardVisible) return null;

    return (
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
                            <Link
                                className="font-poppins font-semibold text-xs leading-[18px] text-[#5678E9]"
                                onClick={handleClearAll}
                            >
                                Clear all
                            </Link>
                        </div>
                    </div>
                    <div className="w-[500px] h-0 gap-0 border-t border-gray-200"></div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {notifications.length > 0 ? (
                    notifications.map((notification) => {
                        if (notification.type === "typeOne") {
                            return (
                                <NotificationOne
                                    key={notification.id}
                                    id={notification.id}
                                    message={notification.message}
                                    date={notification.date}
                                    name={notification.name}
                                    money={notification.money}
                                    festival={notification.festival}
                                    wing={notification.wing}
                                    unit={notification.unit}
                                    onView={() => console.log(`View clicked for ${notification.name}`)}
                                    onIgnore={() => handleIgnoreNotification(notification.id)}
                                />
                            );
                        } else if (notification.type === "typeTwo") {
                            return (
                                <NotificationTwo
                                    key={notification.id}
                                    id={notification.id}
                                    message={notification.message}
                                    date={notification.date}
                                    name={notification.name}
                                    wing={notification.wing}
                                    unit={notification.unit}
                                    money={notification.money}
                                    onView={() => console.log("View clicked for", notification.name)}
                                    onIgnore={() => handleIgnoreNotification(notification.id)}
                                />
                            );
                        } else if (notification.type === "typeThree") {
                            return (
                                <Notificationthird
                                    key={notification.id}
                                    id={notification.id}
                                    message={notification.message}
                                    date={notification.date}
                                    name={notification.name}
                                    wing={notification.wing}
                                    unit={notification.unit}
                                    onView={() => console.log("View clicked for", notification.name)}
                                    onIgnore={() => handleIgnoreNotification(notification.id)}
                                />
                            );
                        } else if (notification.type === "typeFour") {
                            return (
                                <Notificationfour
                                    key={notification.id}
                                    message={notification.message}
                                    date={notification.date}
                                    amount={notification.amount}
                                    penalty={notification.penalty}
                                />
                            );
                        } else {
                            return (
                                <NotificationItem
                                    key={notification.id}
                                    {...notification}
                                    onView={() => console.log("View clicked for", notification.name)}
                                    onIgnore={() => handleIgnoreNotification(notification.id)}
                                />
                            );
                        }
                    })
                ) : (
                    <>
                        <div className="flex justify-center items-center py-8">
                            {/* Add the image here */}
                            {imageVisible && (
                                <img src="/src/assets/notification.png" alt="No notifications" className="w-72 h-72" />
                            )}
                        </div>
                        <p className="text-gray-500 text-lg flex justify-center items-center">No Notifications yet!</p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
