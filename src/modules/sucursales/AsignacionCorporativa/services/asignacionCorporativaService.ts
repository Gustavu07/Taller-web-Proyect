import axiosInstance from "../../../../lib/axios";
import type {
  AsignacionCorporativa,
  AsignacionCorporativaCreateDTO,
  AsignacionCorporativaUpdateDTO,
} from "../models/AsignacionCorporativa";

export const asignacionCorporativaService = {
  getAll: async (): Promise<AsignacionCorporativa[]> => {
    const response = await axiosInstance.get("/asignaciones-corporativas");
    return response.data;
  },

  getById: async (id: number): Promise<AsignacionCorporativa> => {
    const response = await axiosInstance.get(
      `/asignaciones-corporativas/${id}`
    );
    return response.data;
  },

  getByPersonalIdAndActivo: async (
    personalId: number
  ): Promise<AsignacionCorporativa> => {
    const response = await axiosInstance.get(
      `/asignaciones-corporativas/personal/${personalId}/activa`
    );
    return response.data;
  },

  getBySucursalId: async (
    sucursalId: number
  ): Promise<AsignacionCorporativa[]> => {
    const response = await axiosInstance.get(
      `/asignaciones-corporativas/sucursal/${sucursalId}`
    );
    return response.data;
  },

  create: async (
    data: AsignacionCorporativaCreateDTO
  ): Promise<AsignacionCorporativa> => {
    const response = await axiosInstance.post(
      "/asignaciones-corporativas",
      data
    );
    return response.data;
  },

  update: async (
    id: number,
    data: AsignacionCorporativaUpdateDTO
  ): Promise<AsignacionCorporativa> => {
    const response = await axiosInstance.put(
      `/asignaciones-corporativas/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/asignaciones-corporativas/${id}`);
  },

  desactivar: async (id: number): Promise<void> => {
    await axiosInstance.patch(`/asignaciones-corporativas/${id}/desactivar`);
  },
};
