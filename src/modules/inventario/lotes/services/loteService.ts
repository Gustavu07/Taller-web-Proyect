import axiosInventario from "../../../../lib/axiosInventario";
import type { Lote, LoteCreateDTO } from "../models/lote";

export const loteService = {
  getAll: async (): Promise<Lote[]> => {
    const response = await axiosInventario.get("/lotes");
    return response.data;
  },

  getById: async (id: number): Promise<Lote> => {
    const response = await axiosInventario.get(`/lotes/${id}`);
    return response.data;
  },

  create: async (data: LoteCreateDTO): Promise<Lote> => {
    const response = await axiosInventario.post("/lotes", data);
    return response.data;
  },

  toggleNotificacion: async (id: number, enabled: boolean): Promise<Lote> => {
    const response = await axiosInventario.patch(
      `/lotes/${id}/toggle-notificacion`,
      null,
      { params: { enabled } }
    );
    return response.data;
  },

  darDeBaja: async (id: number): Promise<Lote> => {
    const response = await axiosInventario.post(`/lotes/dar-de-baja/${id}`);
    return response.data;
  },
};
