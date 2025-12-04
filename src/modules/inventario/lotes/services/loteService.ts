import axiosInventario from "../../../../lib/axiosInventario";
import type { Lote, LoteCreateDTO, LoteUpdateDTO } from "../models/lote";

export const loteService = {
  // Obtener todos los lotes
  getAll: async (): Promise<Lote[]> => {
    const response = await axiosInventario.get("/lotes");
    return response.data;
  },

  // Obtener lotes de un producto específico
  getByProductoId: async (productoId: number): Promise<Lote[]> => {
    const response = await axiosInventario.get(`/lotes/producto/${productoId}`);
    return response.data;
  },

  // Obtener un lote por su ID
  getById: async (id: number): Promise<Lote> => {
    const response = await axiosInventario.get(`/lotes/${id}`);
    return response.data;
  },

  // Crear un nuevo lote
  create: async (data: LoteCreateDTO): Promise<Lote> => {
    const response = await axiosInventario.post("/lotes", data);
    return response.data;
  },

  // Actualizar un lote
  update: async (id: number, data: LoteUpdateDTO): Promise<Lote> => {
    const response = await axiosInventario.put(`/lotes/${id}`, data);
    return response.data;
  },

  // Eliminar un lote
  delete: async (id: number): Promise<void> => {
    await axiosInventario.delete(`/lotes/${id}`);
  },

  // Activar notificación del lote
  activarNotificacion: async (id: number): Promise<Lote> => {
    const response = await axiosInventario.patch(
      `/lotes/${id}/activar-notificacion`
    );
    return response.data;
  },

  // Desactivar notificación del lote
  desactivarNotificacion: async (id: number): Promise<Lote> => {
    const response = await axiosInventario.patch(
      `/lotes/${id}/desactivar-notificacion`
    );
    return response.data;
  },
};
