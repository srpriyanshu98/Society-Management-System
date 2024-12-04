import axiosInstance from "@/test/axiosInstance";

export const fetchPolls = async () => {
    try {
        const response = await axiosInstance.get("/polls");
        return response.data;
    } catch (error) {
        console.error("Error fetching polls:", error);
        return [];
    }
};