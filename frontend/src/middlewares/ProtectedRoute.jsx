import { Navigate, Outlet } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuth.jsx";

const ProtectedRoute = () => {
	useAuthCheck();

	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
