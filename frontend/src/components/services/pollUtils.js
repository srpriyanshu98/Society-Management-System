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

export const categorizePolls = (polls) => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const newPolls = polls.filter((poll) => new Date(poll.createdAt) > oneDayAgo);
    const previousPolls = polls.filter((poll) => new Date(poll.createdAt) <= oneDayAgo);

    return { newPolls, previousPolls };
};