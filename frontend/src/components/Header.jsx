import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useLocation } from "react-router-dom";
import breadcrumbData from "@/data/breadcrumbData";

export default function Header() {
	const location = useLocation();

	const getBreadcrumbItems = () => {
		return breadcrumbData[location.pathname] || [];
	};

	const breadcrumbItems = getBreadcrumbItems();
	return (
		<header className="flex justify-between items-center p-4 ml-64 bg-white shadow-md h-[100px]">
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
				<span className="text-gray-700">Main Roy</span>
				<button className="text-blue-500 hover:underline">
					Edit Profile
				</button>
			</div>
		</header>
	);
}
