import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
	element: Component,
	isAuthenticated,
	...rest
}) {
	return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}
