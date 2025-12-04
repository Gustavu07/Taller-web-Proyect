import axiosInstance from "../../../../lib/axios";
import type {
  Sucursal,
  SucursalCreateDTO,
  SucursalUpdateDTO,
} from "../models/Sucursal";

export const sucursalService = {
  getAll: async (): Promise<Sucursal[]> => {
    const response = await axiosInstance.get("/sucursales");
    return response.data;
  },

  getById: async (id: number): Promise<Sucursal> => {
    const response = await axiosInstance.get(`/sucursales/${id}`);
    return response.data;
  },

  create: async (data: SucursalCreateDTO): Promise<Sucursal> => {
    const response = await axiosInstance.post("/sucursales", data);
    return response.data;
  },

  // Actualizar sucursal
  update: async (id: number, data: SucursalUpdateDTO): Promise<Sucursal> => {
    const response = await axiosInstance.put(`/sucursales/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/sucursales/${id}`);
  },

  activar: async (id: number): Promise<Sucursal> => {
    const response = await axiosInstance.patch(`/sucursales/${id}/activar`);
    return response.data;
  },

  // Desactivar sucursal (PATCH)
  desactivar: async (id: number): Promise<Sucursal> => {
    const response = await axiosInstance.patch(`/sucursales/${id}/desactivar`);
    return response.data;
  },
};
