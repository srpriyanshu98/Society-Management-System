import axiosInstance from "../../test/axiosInstance";

export const getResidents = async () => {
  try {
    const ownersResponse = await axiosInstance.get("/owners");
    const tenantsResponse = await axiosInstance.get("/tenants");
    const residents = [
      ...ownersResponse.data.map(owner => ({ ...owner, residentStatus: "Owner" })),
      ...tenantsResponse.data.map(tenant => ({ ...tenant, residentStatus: "Tenant" })),
    ];
    return residents;
  } catch (error) {
    throw error.response.data;
  }
};