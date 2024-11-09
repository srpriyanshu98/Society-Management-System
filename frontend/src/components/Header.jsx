import React, { useState } from "react";
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

export default function Header() {
	const location = useLocation();

	const getBreadcrumbItems = () => {
		return breadcrumbData[location.pathname] || [];
	};
	const [isCardVisible, setIsCardVisible] = useState(false);

	const handleCardToggle = () => {
		setIsCardVisible((prev) => !prev);
	};
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
				<div className="relative ">
					{/* Trigger to open card */}
					<div className="border border-gray-300 p-1 rounded">
						<a href="##" onClick={handleCardToggle}>
							<img
								src="/src/assets/icons8.gif"
								alt="Active"
								className="h-6 w-6"
							/>
						</a>
					</div>

					{/* Conditionally rendered card */}
					{isCardVisible && (
						<Card
							className="absolute top-[40px] -left-[505px] w-[540px] h-[741px] space-y-2.5 
						rounded-tl-[15px] shadow-md bg-white z-50"
						>
							<CardHeader>
								<CardTitle className="text-xl  font-bold text-gray-800">

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
								<p className="text-gray-600">
									This is the content of the card. It opens when you click the icon
									and can be closed by clicking again.
								</p>
							</CardContent>
						</Card>

					)}
				</div>

				<span className="text-gray-700">Main Roy</span>
				<Link
					to="/edit-profile"
					className="text-blue-500 hover:underline"
				>
					Edit Profile
				</Link>
			</div>
		</header>
	);
}
