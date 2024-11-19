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
import EditProfile from "./pages/EditProfile";
import ResidentForm from "./components/residentManagement/ResidentForm";
import AddExpenses from "./pages/admin/AddExpenses";
import Note from "./pages/admin/Note";
import RequestTracking from "./pages/admin/RequestTracking";
import SecurityRuls from "./pages/admin/SecurityRuls";
import VisitortrackingScreen from "./pages/security/visitortrackingscreen";
import EmergencyManagement from "./pages/security/emergencymanagement";
import Community from "./pages/resident/Community";
import EventsParticipation from "./pages/resident/EventsParticipation";
import PersonalDetail from "./pages/resident/PersonalDetail";
import ServiceAndComplaint from "./pages/resident/ServiceAndComplaint";
import PaymentPortal from "./pages/resident/PaymentPortal";
import SecurityProtocols from "./pages/resident/SecurityProtocols";

function App() {
	return (
		<Routes>
			{/* AUTH ROUTES */}
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/forgot-pass" element={<ForgotPassPage />} />
			<Route path="/edit-profile" element={<EditProfile />} />

			{/* ADMIN ROUTES*/}
			<Route path="/" element={<Dashboard />} />

			<Route path="/residents" element={<ResidentManagement />} />
			<Route path="/resident-form" element={<ResidentForm />} />

			<Route path="/financial" element={<FinancialManagement />} />
			<Route path="/add-expenses" element={<AddExpenses />} />
			<Route path="/note" element={<Note />} />

			<Route path="/facilities" element={<FacilityManagement />} />

			<Route path="/complaints" element={<ComplaintTracking />} />
			<Route path="/request-tracking" element={<RequestTracking />} />

			<Route path="/security" element={<SecurityManagement />} />
			<Route path="/security-protocols" element={<SecurityRuls />} />

			<Route path="/security-guard" element={<SecurityGuard />} />
			<Route path="/announcements" element={<Announcement />} />

			{/* RESIDENTS ROUTES */}
			<Route path="/personal-detail" element={<PersonalDetail />} />
			<Route
				path="/service-complaint"
				element={<ServiceAndComplaint />}
			/>
			<Route
				path="/events-participation"
				element={<EventsParticipation />}
			/>
			<Route path="/community" element={<Community />} />
			<Route path="/payment-portal" element={<PaymentPortal />} />
			<Route path="/security-protocals" element={<SecurityProtocols />} />

			{/* SECURITY ROUTES */}
			<Route
				path="/visitortracking-screen"
				element={<VisitortrackingScreen />}
			/>
			<Route
				path="/emergencymanagement"
				element={<EmergencyManagement />}
			/>

			{/* TEST ROUTES*/}
			<Route path="/slider" element={<Slider />} />
			<Route path="/select" element={<Sellect />} />
		</Routes>
	);
}

export default App;
