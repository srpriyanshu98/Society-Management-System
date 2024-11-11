// src/services/ownerService.js
import axiosInstance from "../../test/axiosInstance";

export const createOwner = async (ownerData) => {
  try {
    const response = await axiosInstance.post("/owners", ownerData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOwners = async () => {
  try {
    const response = await axiosInstance.get("/owners");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOwnerById = async (id) => {
  try {
    const response = await axiosInstance.get(`/owners/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateOwner = async (id, ownerData) => {
  try {
    const response = await axiosInstance.put(`/owners/${id}`, ownerData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteOwner = async (id) => {
  try {
    const response = await axiosInstance.delete(`/owners/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};