import Sidebar from "@/components/Sidebar";

function Layout({ userRole, children }) {
	return (
		<div className="flex">
			<Sidebar userRole={userRole} />
			<div className="flex-1 p-6 ml-64 bg-gray-50 h-screen overflow-auto">
				{children}
			</div>
		</div>
	);
}

export default Layout;
