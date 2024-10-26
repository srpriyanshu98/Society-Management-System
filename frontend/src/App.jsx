import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/SignUpPage";
import Login from "./pages/auth/LoginPage";
import ForgotPassPage from "./pages/auth/ForgotPassPage";
import Slider from "./test/Slider";
// import Slider from "./test/Slider";

function App() {
	return (
		<Routes>
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/forgot-pass" element={<ForgotPassPage />} />
			<Route path="/slider" element={<Slider />} />
		</Routes>
	);
}

export default App;
