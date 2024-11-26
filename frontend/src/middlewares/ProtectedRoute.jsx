import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.jsx";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { isAuthenticated, login } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !isAuthenticated) {
            login();
        }
    }, [isAuthenticated, login]);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
