import axiosInventario from "../../../../lib/axiosInventario";
import type { Lote, LoteCreateDTO, LoteUpdateDTO } from "../models/lote";

export const loteService = {
  getAll: async (): Promise<Lote[]> => {
    const response = await axiosInventario.get("/lotes");
    return response.data;
  },

  getByProductoId: async (productoId: number): Promise<Lote[]> => {
    const response = await axiosInventario.get(`/lotes/producto/${productoId}`);
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

  update: async (id: number, data: LoteUpdateDTO): Promise<Lote> => {
    const response = await axiosInventario.put(`/lotes/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInventario.delete(`/lotes/${id}`);
  },

  activarNotificacion: async (id: number): Promise<Lote> => {
    const response = await axiosInventario.patch(
      `/lotes/${id}/activar-notificacion`
    );
    return response.data;
  },

  desactivarNotificacion: async (id: number): Promise<Lote> => {
    const response = await axiosInventario.patch(
      `/lotes/${id}/desactivar-notificacion`
    );
    return response.data;
  },
};
