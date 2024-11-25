import axiosInstance from "@/test/axiosInstance";
import moment from "moment";

export const fetchGuards = async () => {
    try {
        const response = await axiosInstance.get("/security");
        return response.data;
    } catch (error) {
        console.error("Error fetching security guards:", error);
        throw error;
    }
};

export const createGuard = async (guard) => {
    const formData = new FormData();
    formData.append("fullName", guard.fullName);
    formData.append("phoneNumber", guard.phoneNumber);
    formData.append("gender", guard.gender);
    formData.append("shift", guard.shift);
    formData.append("shiftDate", guard.shiftDate);
    formData.append("shiftTime", guard.shiftTime);
    formData.append("aadharCard", guard.aadharCard);
    formData.append("guardPhoto", guard.guardPhoto);

    try {
        console.log(formData);
        const response = await axiosInstance.post("/security", formData);
        return response.data;
    } catch (error) {
        console.error("Error creating security guard:", error);
        throw error;
    }
};

// edit  funcnality is not working here>>>>>>>>>>>>>

export const updateGuard = async (id, guard) => {
    const formData = new FormData();
    formData.append("fullName", guard.fullName);
    formData.append("phoneNumber", guard.phoneNumber);
    formData.append("gender", guard.gender);
    formData.append("shift", guard.shift);
    formData.append("shiftDate", moment(guard.shiftDate).format("DD-MM-YYYY"));
    formData.append("shiftTime", guard.shiftTime);
    formData.append("aadharCard", guard.aadharCard);
    formData.append("guardPhoto", guard.guardPhoto);

    try {
        console.log(formData);
        const response = await axiosInstance.put(`/security/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error updating security guard:", error);
        throw error;
    }
};

export const deleteGuard = async (id) => {
    try {
        const response = await axiosInstance.delete(`/security/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting security guard:", error);
        throw error;
    }
};
