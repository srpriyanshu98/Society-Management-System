import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { residentDataFront } from "@/data/PersonalDetail/residentDataFront";
import axiosInstance from "@/test/axiosInstance";

const fetchMaintenanceRecords = async () => {
    try {
        const response = await axiosInstance.get("/maintenance");
        return response.data;
    } catch (error) {
        console.error("Error fetching maintenance records:", error);
        return [];
    }
};

const fetchAnnouncements = async () => {
    try {
        const response = await axiosInstance.get("/announcements");
        return response.data;
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return [];
    }
};

const calculateTotalMaintenanceAmount = (maintenanceRecords) => {
    return maintenanceRecords.reduce((total, record) => {
        return total + record.maintenanceAmount;
    }, 0);
};

const calculateTotalPenaltyAmount = (maintenanceRecords) => {
    return maintenanceRecords.reduce((total, record) => {
        return total + record.penaltyAmount;
    }, 0);
};

export default function Tenant() {
    const { profile, members, vehicles } = residentDataFront;
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [totalMaintenanceAmount, setTotalMaintenanceAmount] = useState(0);
    const [totalPenaltyAmount, setTotalPenaltyAmount] = useState(0);

    useEffect(() => {
        fetchMaintenanceRecords().then((data) => {
            setMaintenanceRecords(data);
            setTotalMaintenanceAmount(calculateTotalMaintenanceAmount(data));
            setTotalPenaltyAmount(calculateTotalPenaltyAmount(data));
        });
        fetchAnnouncements().then((data) => setAnnouncements(data));
    }, []);

    return (
        <>
            {/* Owner Details */}
            <Card>
                <CardContent className="grid grid-cols-3 p-5 font-medium">
                    <div>
                        <p>Full Name</p>
                        <span className="text-slate-600">
                            {profile.fullName}
                        </span>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <span className="text-slate-600">
                            {profile.phoneNumber}
                        </span>
                    </div>
                    <div>
                        <p>Email Address</p>
                        <span className="text-slate-600">
                            {profile.emailAddress}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Profile Section */}
            <Card className="flex gap-4 items-center p-6 shadow-md rounded-lg mt-8">
                {/* Profile Avatar and Details */}
                <Avatar className="w-24 h-24 rounded-full me-10">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt={profile.fullName}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {/* Profile Information */}
                <div className="grid grid-cols-4 gap-x-5 gap-y-6 font-medium">
                    <div>
                        <p>Full Name</p>
                        <span className="text-slate-600">
                            {profile.fullName}
                        </span>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <span className="text-slate-600">
                            {profile.phoneNumber}
                        </span>
                    </div>
                    <div>
                        <p>Email Address</p>
                        <span className="text-slate-600">
                            {profile.emailAddress}
                        </span>
                    </div>
                    <div>
                        <p>Gender</p>
                        <span className="text-slate-600">{profile.gender}</span>
                    </div>

                    <div>
                        <p>Wing</p>
                        <span className="text-slate-600">{profile.wing}</span>
                    </div>
                    <div>
                        <p>Unit</p>
                        <span className="text-slate-600">{profile.unit}</span>
                    </div>
                    <div>
                        <p>Age</p>
                        <span className="text-slate-600">{profile.age}</span>
                    </div>
                    <div>
                        <p>Relation</p>
                        <span className="text-slate-600">
                            {profile.relation}
                        </span>
                    </div>
                </div>

                {/* Uploaded Documents */}
                <div className="space-y-2">
                    {profile.documents.map((doc, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border rounded-lg p-3 bg-gray-50"
                        >
                            <div className="flex items-center">
                                <img
                                    src="/path/to/icon.png"
                                    alt="Document Icon"
                                    className="w-6 h-6"
                                />
                                <p className="text-sm ">{doc.name}</p>
                            </div>
                            <p className="text-xs text-slate-600">{doc.size}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Members Section */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold mb-4">
                        Members ({members.length}):
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {members.map((items, index) => (
                        <Card key={index} className="">
                            <CardHeader className="bg-blue-500 rounded-t-lg text-white">
                                <CardTitle className="text-base">
                                    {items.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 mt-3">
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Email:
                                    </span>
                                    <span className="float-right">
                                        {items.email}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Phone:
                                    </span>
                                    <span className="float-right">
                                        {items.phoneNumber}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Age:
                                    </span>
                                    <span className="float-right">
                                        {items.age}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Gender:
                                    </span>
                                    <span className="float-right">
                                        {items.gender}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Relation:
                                    </span>
                                    <span className="float-right">
                                        {items.relation}
                                    </span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            {/* Vehicles Section */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold mb-4">
                        Vehicles ({vehicles.length}):
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {vehicles.map((items, index) => (
                        <Card key={index} className="">
                            <CardHeader className="bg-blue-500 rounded-t-lg text-white">
                                <CardTitle className="text-base">
                                    {items.type}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 mt-3">
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Vehicle Name:
                                    </span>
                                    <span className="float-right">
                                        {items.name}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Vehicle Number:
                                    </span>
                                    <span className="float-right">
                                        {items.number}
                                    </span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            {/* Maintenance Section */}
            <Card className="mt-8 flex justify-between items-center">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold font-poppins">
                        Show Maintenance Details:
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="inline-flex gap-4 overflow-x-auto font-poppins">
                        <Card className="p-4 space-x-4 rounded-lg shadow-lg relative w-60 mt-5">
                            {/* Left Accent Bar */}
                            <div
                                className={`absolute left-0 top-0 bottom-0 w-2 h-14 rounded-e-lg m-auto bg-gradient-to-b from-green-400 to-green-600 opacity-40`}
                            />
                            {/* Content */}
                            <div>
                                <p className="text-sm font-semibold">
                                    Maintenance Amount
                                </p>
                                <h2 className="text-2xl font-semibold text-green-600">
                                    {totalMaintenanceAmount}
                                </h2>
                            </div>
                        </Card>
                        <Card className="p-4 space-x-4 rounded-lg shadow-lg relative w-60 mt-5">
                            {/* Left Accent Bar */}
                            <div
                                className={`absolute left-0 top-0 bottom-0 w-2 h-14 rounded-e-lg m-auto bg-gradient-to-b from-red-400 to-red-600 opacity-40`}
                            />
                            {/* Content */}
                            <div>
                                <p className="text-sm font-semibold">
                                    Penalty Amount
                                </p>
                                <h2 className="text-2xl font-semibold text-red-600">
                                    {totalPenaltyAmount}
                                </h2>
                            </div>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Pending Section */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Pending Maintanance
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {maintenanceRecords.map((items, index) => (
                        <Card key={index} className="">
                            <CardHeader className="bg-blue-500 rounded-t-lg text-white">
                                <CardTitle className="text-base">
                                    Maintenance
                                    <span className="float-end">Pending</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 mt-3">
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Bill Date
                                    </span>
                                    <span className="float-right">
                                        {new Date(
                                            items.maintenanceDueDate
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Pending Date
                                    </span>
                                    <span className="float-right">
                                        {new Date(
                                            items.maintenanceDueDate
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <Separator />
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Maintanance Amount
                                    </span>
                                    <span className="float-right text-red-500">
                                        {items.maintenanceAmount}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Maintenance Penalty Amount
                                    </span>
                                    <span className="float-right text-red-500">
                                        {items.penaltyAmount}
                                    </span>
                                </p>
                                <Separator />
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Grand Total
                                    </span>
                                    <span className="float-right text-green-500">
                                        {items.maintenanceAmount +
                                            items.penaltyAmount}
                                    </span>
                                </p>
                                <Button className="w-full">Pay Now</Button>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            {/* Due Section */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Due Maintanance
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {maintenanceRecords.map((items, index) => (
                        <Card key={index} className="">
                            <CardHeader className="bg-blue-500 rounded-t-lg text-white">
                                <CardTitle className="text-base">
                                    Maintenance
                                    <span className="float-end">Pending</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 mt-3">
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Date
                                    </span>
                                    <span className="float-right">
                                        {new Date(
                                            items.maintenanceDueDate
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <Separator />
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Amount
                                    </span>
                                    <span className="float-right text-red-500">
                                        {items.maintenanceAmount}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Due Maintanance Amount
                                    </span>
                                    <span className="float-right text-red-500">
                                        {items.penaltyAmount}
                                    </span>
                                </p>
                                <Separator />
                                <Button className="w-full">Pay Now</Button>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            {/* Announcement Section */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Announcement Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {announcements.map((items, index) => (
                        <Card key={index} className="">
                            <CardHeader className="bg-blue-500 rounded-t-lg text-white">
                                <CardTitle className="text-base">
                                    {items.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 mt-3">
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Announcement Date
                                    </span>
                                    <span className="float-right">
                                        {new Date(
                                            items.date
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Announcement Time
                                    </span>
                                    <span className="float-right">
                                        {items.time}
                                    </span>
                                </p>
                                <p>
                                    <span className="inline-block text-slate-600">
                                        Description
                                    </span>
                                    <span className="float-right mt-1">
                                        {items.description}
                                    </span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </>
    );
}
