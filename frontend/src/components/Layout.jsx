import Sidebar from "@/components/Sidebar";
import Header from "./Header";

export default function Layout({ userRole, children }) {
	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-col">
				<Sidebar userRole={userRole} />
				<Header />
			</div>
			<div className="flex-1 p-6 ml-64 bg-gray-50 overflow-auto">
				{children}
			</div>
		</div>
	);
}
