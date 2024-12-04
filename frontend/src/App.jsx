import { Route, Routes } from "react-router-dom";

// AUTH IMPORTS
import Signup from "./pages/auth/SignUpPage";
import Login from "./pages/auth/LoginPage";
import ForgotPassPage from "./pages/auth/ForgotPassPage";
import EditProfile from "./pages/EditProfile";

// TEST IMPORTS
import Slider from "./test/Slider";
import Sellect from "./test/Sellect";

// ADMIN IMPORTS
import Dashboard from "./pages/admin/Dashboard";
import ResidentManagement from "./pages/admin/ResidentManagement";
import FinancialManagement from "./pages/admin/FinancialManagement";
import FacilityManagement from "./pages/admin/FacilityManagement";
import ComplaintTracking from "./pages/admin/ComplaintTracking";
import SecurityManagement from "./pages/admin/SecurityManagement";
import SecurityGuard from "./pages/admin/SecurityGuard";
import Announcement from "./pages/admin/Announcement";
import ResidentForm from "./components/residentManagement/ResidentForm";
import AddExpenses from "./pages/admin/AddExpenses";
import Note from "./pages/admin/Note";
import RequestTracking from "./pages/admin/RequestTracking";
import SecurityRuls from "./pages/admin/SecurityRuls";

// RESIDENT IMPORTS
import PersonalDetail from "./pages/resident/PersonalDetail";
import ServiceAndComplaint from "./pages/resident/ServiceAndComplaint";
import EventsParticipation from "./pages/resident/EventsParticipation";
import Community from "./pages/resident/Community";
import Polls from "./pages/resident/Polls";
import CommunitiesDiscussion from "./pages/resident/CommunitiesDiscussion";
import MaintenanceInvoices from "./pages/resident/MaintenanceInvoices";
import OtherInvoice from "./pages/resident/OtherInvoice";
import SecurityProtocols from "./pages/resident/SecurityProtocols";

// SECURITY IMPORTS
import VisitortrackingScreen from "./pages/security/visitortrackingscreen";
import EmergencyManagement from "./pages/security/emergencymanagement";

// COMPONENTS IMPORTS
import ChatCard from "./components/Resident-Components/Community/AccessForums/ChatCard";
import ChatHeader from "./components/Resident-Components/Community/AccessForums/ChatHeader";
import ChatTextArray from "./components/Resident-Components/Community/AccessForums/ChatTextArray";
import ChatFooter from "./components/Resident-Components/Community/AccessForums/ChatFooter";

// MIDDLEWARES IMPORTS
import ProtectedRoute from "./middlewares/ProtectedRoute";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
	return (
		<Routes>
			{/* AUTH ROUTES */}
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/forgot-pass" element={<ForgotPassPage />} />
			<Route path="/edit-profile" element={<EditProfile />} />

			{/* PROTECTED ROUTES */}
			<Route element={<ProtectedRoute />}>
				{/* ADMIN ROUTES */}
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
				<Route path="/chatcard" element={<ChatCard />} />
				<Route path="/chatheader" element={<ChatHeader />} />
				<Route path="/chattextarray" element={<ChatTextArray />} />
				<Route path="/chatfooter" element={<ChatFooter />} />
				<Route path="/polls" element={<Polls />} />
				<Route
					path="/communities-discussion"
					element={<CommunitiesDiscussion />}
				/>
				<Route
					path="/maintenance-invoices"
					element={<MaintenanceInvoices />}
				/>
				<Route path="/other-invoice" element={<OtherInvoice />} />
				<Route
					path="/security-protocals"
					element={<SecurityProtocols />}
				/>

				{/* PAYMENT ROUTES */}
				<Route path="/payment" element={<PaymentPage />} />
				<Route path="/success" element={<SuccessPage />} />

				{/* SECURITY ROUTES */}
				<Route
					path="/visitortracking-screen"
					element={<VisitortrackingScreen />}
				/>
				<Route
					path="/emergencymanagement"
					element={<EmergencyManagement />}
				/>
			</Route>

			{/* TEST ROUTES*/}
			<Route path="/slider" element={<Slider />} />
			<Route path="/select" element={<Sellect />} />
		</Routes>
	);
}

export default App;
