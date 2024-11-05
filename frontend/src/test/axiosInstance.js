import axios from "axios";

// Create axios instance with custom base URL

const axiosInstance = axios.create({
  baseURL: "https://localhost:5000/api",
});

export default axiosInstance;
