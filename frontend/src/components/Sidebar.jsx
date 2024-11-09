import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import menuItems from "@/data/menuItems";
import { Separator } from "./ui/separator";

export default function Sidebar({ userRole = "admin" }) {
	const userMenuItems = menuItems[userRole] || [];

	return (
		<div className="fixed h-screen w-64 bg-white shadow-lg">
			<div className="p-4 font-bold text-xl">
				<img src="./src/assets/Logo.png" alt="Logo" />
			</div>
			<Separator className="my-6 w-52 mx-auto" />
			<div className="mt-8 space-y-2">
				{userMenuItems.map((item) => {
					const IconComponent = Icons[item.icon] || Icons.Menu;
					return (
						<>
							<div className="flex flex-row space-x-4">
								<div>
									{/* //TODO: make this img active  */}
									{({ isActive }) => (
										<>
											{isActive && (
												<img
													src="/src/assets/Active.svg"
													alt="Active"
													className=" mr-2"
												/>
											)}
											<span>{item.name}</span>
										</>
									)}
								</div>
								<div>
									<NavLink
										to={item.path}
										className={({ isActive }) =>
											`flex items-center space-x-4 w-56 font-poppins p-3 text-sm rounded-lg ${isActive
												? "bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-md"
												: "text-gray-700 hover:bg-gray-100"
											}`
										}
										key={item.name}
									>
										<IconComponent className="w-5 h-5" />
										<span>{item.name}</span>
									</NavLink>

								</div>
							</div>
						</>
					);
				})}
			</div>
			<div className="relative top-[300px]">
				<div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] mb-4 w-[212px] mx-auto"></div>
				<div>
					<img
						src="/src/assets/logout.svg"
						alt="Logout"
						className="mr-2 absolute left-5"
					/>
					<div className="relative">
						<a
							href="##"
							className="text-[#E74C3C] w-[55px] h-[24px] gap-0 text-[16px] font-poppins leading-[24px] absolute left-12"
						>
							Logout
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
