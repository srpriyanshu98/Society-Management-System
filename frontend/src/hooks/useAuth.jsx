import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useAuthCheck = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login", { replace: true });
		} else {
			const userRole = extractUserRoleFromToken(token);
			if (!userRole) {
				navigate("/login", { replace: true });
			}
		}
	}, [navigate]);
};

export const extractUserRoleFromToken = (token) => {
	try {
		const decodedToken = jwtDecode(token);
		return decodedToken.role;
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};
