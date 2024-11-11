// src/services/tenantService.js
import axiosInstance from "../../test/axiosInstance";

export const createTenant = async (tenantData) => {
  try {
    const response = await axiosInstance.post("/tenants", tenantData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTenants = async () => {
  try {
    const response = await axiosInstance.get("/tenants");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTenantById = async (id) => {
  try {
    const response = await axiosInstance.get(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTenant = async (id, tenantData) => {
  try {
    const response = await axiosInstance.put(`/tenants/${id}`, tenantData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTenant = async (id) => {
  try {
    const response = await axiosInstance.delete(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};