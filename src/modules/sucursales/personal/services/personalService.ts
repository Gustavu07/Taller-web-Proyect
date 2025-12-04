import axiosInstance from "../../../../lib/axios";
import type {
  Personal,
  PersonalCreateDTO,
  PersonalUpdateDTO,
} from "../models/Personal";

export const personalService = {
  getAll: async (): Promise<Personal[]> => {
    const response = await axiosInstance.get("/personal");
    return response.data;
  },

  getById: async (id: number): Promise<Personal> => {
    const response = await axiosInstance.get(`/personal/${id}`);
    return response.data;
  },

  getBySucursalId: async (sucursalId: number): Promise<Personal[]> => {
    const response = await axiosInstance.get(
      `/personal/sucursal/${sucursalId}`
    );
    return response.data;
  },

  create: async (data: PersonalCreateDTO): Promise<Personal> => {
    const response = await axiosInstance.post("/personal", data);
    return response.data;
  },

  update: async (id: number, data: PersonalUpdateDTO): Promise<Personal> => {
    const response = await axiosInstance.put(`/personal/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/personal/${id}`);
  },

  reasignarSucursal: async (
    personalId: number,
    nuevaSucursalId: number
  ): Promise<Personal> => {
    const response = await axiosInstance.patch(
      `/personal/${personalId}/reasignar/${nuevaSucursalId}`
    );
    return response.data;
  },
};
