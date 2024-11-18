import axiosInstance from "../../test/axiosInstance";

export const createVehicle = async (vehicleData) => {
  try {
    const response = await axiosInstance.post("/vehicles", vehicleData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getVehicles = async () => {
  try {
    const response = await axiosInstance.get("/vehicles");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getVehicleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await axiosInstance.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await axiosInstance.delete(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};