import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Invoices from "@/components/Resident-Components/PaymentPortal/Invoices";
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

export default function MaintenanceInvoices({ userRole }) {
    const [showInvoicePage, setShowInvoicePage] = useState(false);
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);
    const [totalMaintenanceAmount, setTotalMaintenanceAmount] = useState(0);
    const [totalPenaltyAmount, setTotalPenaltyAmount] = useState(0);

    useEffect(() => {
        fetchMaintenanceRecords().then((data) => {
            setMaintenanceRecords(data);
            setTotalMaintenanceAmount(calculateTotalMaintenanceAmount(data));
            setTotalPenaltyAmount(calculateTotalPenaltyAmount(data));
        });
    }, []);

    const handleViewInvoice = () => {
        setShowInvoicePage(true);
    };

    return (
        <Layout userRole={userRole}>
            {showInvoicePage ? (
                <Invoices />
            ) : (
                <>
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
                        <CardHeader className="grid grid-cols-[auto_auto] items-center justify-between">
                            <CardTitle className="text-lg font-semibold font-poppins">
                                Pending Maintenance
                            </CardTitle>
                            <Button onClick={handleViewInvoice}>
                                View Invoice
                            </Button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {maintenanceRecords.map((items, index) => (
                                <Card key={index} className="">
                                    <CardHeader className="bg-blue-500 rounded-t-lg text-white">
                                        <CardTitle className="text-base font-poppins">
                                            Maintenance
                                            <span className="float-end font-poppins">
                                                Pending
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 mt-3 font-poppins">
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
                                            <span className="inline-block text-slate-600 font-semibold font-poppins">
                                                Grand Total
                                            </span>
                                            <span className="float-right text-green-500">
                                                {items.maintenanceAmount +
                                                    items.penaltyAmount}
                                            </span>
                                        </p>
                                        <Button className="w-full">
                                            Pay Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Due Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold font-poppins">
                                Due Maintanance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {maintenanceRecords.map((items, index) => (
                                <Card key={index} className="">
                                    <CardHeader className="bg-blue-500 rounded-t-lg text-white">
                                        <CardTitle className="text-base">
                                            Maintenance
                                            <span className="float-end">
                                                Pending
                                            </span>
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
                                        <Button className="w-full">
                                            Pay Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </>
            )}
        </Layout>
    );
}
