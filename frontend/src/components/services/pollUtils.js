import axiosInstance from "@/test/axiosInstance";
import { jwtDecode } from "jwt-decode";

export const fetchPolls = async () => {
    try {
        const response = await axiosInstance.get("/polls");
        return response.data;
    } catch (error) {
        console.error("Error fetching polls:", error);
        return [];
    }
};

export const categorizePollsByDate = (polls) => {
    const now = new Date();
    const newPolls = [];
    const previousPolls = [];

    polls.forEach((poll) => {
        const pollDate = new Date(poll.createdAt);
        const diffInHours = Math.abs(now - pollDate) / 36e5; // Difference in hours

        if (diffInHours <= 24) {
            newPolls.push(poll);
        } else {
            previousPolls.push(poll);
        }
    });

    return { newPolls, previousPolls };
};

export const getLoggedInUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }
    return null;
};

export const handlePollCreationAndCategorization = async (newPoll, setNewPolls, setPreviousPolls) => {
    try {
        // Create the new poll
        const response = await axiosInstance.post("/polls", newPoll);
        const createdPoll = response.data.poll;

        // Fetch all polls
        const allPolls = await fetchPolls();

        // Categorize polls by date
        const { newPolls, previousPolls } = categorizePollsByDate(allPolls);

        // Update the state with the new polls and previous polls
        setNewPolls(newPolls);
        setPreviousPolls(previousPolls);
    } catch (error) {
        console.error("Error creating and categorizing poll:", error);
    }
};