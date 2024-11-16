import axios from "axios";

// Create axios instance with custom base URL
const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to include the authentication headers
axiosInstance.interceptors.request.use(
	(config) => {
		// Retrieve the token from local storage or state
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			console.error("No token found in localStorage"); // Add this line for debugging
		}
		console.log("Request Config:", config); // Add this line for debugging
		return config;
	},
	(error) => {
		console.error("Request Error:", error); // Add this line for debugging
		return Promise.reject(error);
	}
);

// Add a response interceptor to log responses and errors
axiosInstance.interceptors.response.use(
	(response) => {
		console.log("Response:", response); // Add this line for debugging
		return response;
	},
	(error) => {
		console.error("Response Error:", error); // Add this line for debugging
		return Promise.reject(error);
	}
);

export default axiosInstance;
