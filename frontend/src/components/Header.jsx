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
import { Button } from "./ui/button";

// Notification Component
function Notification({ id, message, date, name, scheduleDate, onView, onIgnore }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center mb-2">
        <div className="bg-orange-200 rounded-full h-10 w-10 text-center pt-1">
          <div className="text-2xl font-semibold text-blue-500">F</div>
        </div>
        <div className="ml-4">
          <p className="text-lg font-semibold">{message}</p>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Name: <span className="font-semibold">{name}</span></p>
        <p className="text-gray-700">Schedule Date: <span className="font-semibold">{scheduleDate}</span></p>
      </div>

      <div className="flex justify-between mb-2">
        <div>
          <button className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2" onClick={onView}>View</button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-11"
            onClick={() => onIgnore(id)}
          >
            Ignore
          </button>
        </div>

        <div className="text-gray-500 text-sm text-right mt-2">32 Minutes ago</div>
      </div>
      <Separator />
    </div>
  );
}

function NotificationOne({ message, date, name, onView, onIgnore }) {
  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="flex-shrink-0 mr-4 top-0">
          <img
            src="/src/assets/profileimg.jpeg"
            alt="Notifications img"
            className="mx-auto w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-500 text-sm">{date}</p>
          <p className="text-gray-700">{message}</p>
        </div>
      </div>

      <div className="flex ml-14 mb-2">
        <Button
          className="font-bold py-2 px-4 rounded mr-2"
          onClick={onView}
          variant="outline"

        >
          Accept
        </Button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onIgnore}
        >
          Decline
        </button>
      </div>
      <Separator />
    </div>
  );
}

function NotificationTwo({ message, date, name, onView, onIgnore, type }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center mb-2">
        <div className="flex-shrink-0 mr-4">
          <div className="bg-blue-200 rounded-full h-8 w-8 flex items-center justify-center">
            {type.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-500 text-sm">{date}</p>
          <p className="text-gray-700">{message}</p>
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={onView}
        >
          Accept
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          onClick={onIgnore}
        >
          Decline
        </button>
      </div>
      <Separator />
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
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "typeOne",
      message: "Invitation to join the project.",
      date: "Monday 11:41 AM",
      name: "Project Alpha",
    },
    {
      id: 2,
      type: "default",
      message: "Server Maintenance Scheduled.",
      date: "Monday 12:15 PM",
      name: "Main Server",
      scheduleDate: "01/03/2024",
    },
    {
      id: 3,
      type: "typeTwo",
      message: "Approval needed for access request.",
      date: "Tuesday 10:05 AM",
      name: "Jane Smith",
    },
  ]);


  const handleCardToggle = () => {
    setIsCardVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsCardVisible(false);
    }
  };

  const handleClearNotifications = () => {
    setNotifications([]); // Clear all notifications by setting an empty array
  };

  const handleIgnoreNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="border border-gray-300 p-1 rounded-lg">
            <a href="##" onClick={handleCardToggle}>
              <img src="/src/assets/icons8.gif" alt="Active" className="h-6 w-6" />
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
                      {/* Clear all notifications */}
                      <a
                        href="##"
                        className="font-poppins font-semibold text-xs leading-[18px] text-[#5678E9]"
                        onClick={handleClearNotifications}
                      >
                        Clear all
                      </a>
                    </div>
                  </div>
                  <div className="w-[500px] h-0 gap-0 border-t border-gray-200"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <div className="text-center">
                    <img
                      src="/src/assets/notification.png"
                      alt="No Notifications"
                      className="mx-auto w-32 h-32"
                    />
                    <p className="text-gray-500 mt-4">No new notifications yet!</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    if (notification.type === "typeOne") {
                      return (
                        <NotificationOne
                          key={notification.id}
                          message={notification.message}
                          date={notification.date}
                          name={notification.name}
                          onView={() => console.log(`Accept clicked for ${notification.name}`)}
                          onIgnore={() => handleIgnoreNotification(notification.id)}
                        />
                      );
                    } else if (notification.type === "typeTwo") {
                      return (
                        <NotificationTwo
                          key={notification.id}
                          message={notification.message}
                          date={notification.date}
                          name={notification.name}
                          type={notification.type}
                          onView={() => console.log(`View clicked for ${notification.name}`)}
                          onIgnore={() => handleIgnoreNotification(notification.id)}
                        />
                      );
                    } else {
                      return (
                        <Notification
                          key={notification.id}
                          {...notification}
                          onView={() => console.log("View clicked")}
                          onIgnore={() => handleIgnoreNotification(notification.id)}
                        />
                      );
                    }
                  })
                )}
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
              <div className="font-poppins font-bold">Moni Roy</div>
              <div className="text-xs text-gray-600">Admin</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
