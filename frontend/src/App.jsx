import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/SignUpPage";
import Login from "./pages/auth/LoginPage";
import ForgotPassPage from "./pages/auth/ForgotPassPage";

function App() {
	return (
		<Routes>
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/forgot-pass" element={<ForgotPassPage />} />
		</Routes>
	);
}

export default App;
