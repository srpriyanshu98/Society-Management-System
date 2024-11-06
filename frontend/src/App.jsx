import { Route, Routes } from "react-router-dom";

//AUTH IMPORTS
import Signup from "./pages/auth/SignUpPage";
import Login from "./pages/auth/LoginPage";
import ForgotPassPage from "./pages/auth/ForgotPassPage";
//TEST IMPORTS
import Slider from "./test/Slider";
import Sellect from "./test/Sellect";

//ADMIN IMPORTS
import Dashboard from "./pages/admin/Dashboard";
import ResidentManagement from "./pages/admin/ResidentManagement";
import FinancialManagement from "./pages/admin/FinancialManagement";
import FacilityManagement from "./pages/admin/FacilityManagement";
import ComplaintTracking from "./pages/admin/ComplaintTracking";
import SecurityManagement from "./pages/admin/SecurityManagement";
import SecurityGuard from "./pages/admin/SecurityGuard";
import Announcement from "./pages/admin/Announcement";

function App() {
	return (
		<Routes>
			{/* AUTH ROUTES */}
			<Route path="/signup" element={<Signup />} />
			<Route path="/" element={<Login />} />
			<Route path="/forgot-pass" element={<ForgotPassPage />} />

			{/* ADMIN ROUTES*/}
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/residents" element={<ResidentManagement />} />
			<Route path="/financial" element={<FinancialManagement />} />
			<Route path="/facilities" element={<FacilityManagement />} />
			<Route path="/complaints" element={<ComplaintTracking />} />
			<Route path="/security" element={<SecurityManagement />} />
			<Route path="/security-guard" element={<SecurityGuard />} />
			<Route path="/announcements" element={<Announcement />} />

			{/* RESIDENTS ROUTES */}
			{/* SECURITY ROUTES */}

			{/* TEST ROUTES*/}
			<Route path="/slider" element={<Slider />} />
			<Route path="/select" element={<Sellect />} />
		</Routes>
	);
}

export default App;
