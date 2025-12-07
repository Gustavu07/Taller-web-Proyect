import axiosInventario from "../../../../lib/axiosInventario";
import type {
  Marca,
  MarcaCreateDTO,
  MarcaUpdateDTO,
} from "../models/marca";

export const marcaService = {
  getAll: async (): Promise<Marca[]> => {
    const response = await axiosInventario.get("/marcas");
    return response.data;
  },

  getById: async (id: number): Promise<Marca> => {
    const response = await axiosInventario.get(`/marcas/${id}`);
    return response.data;
  },

  create: async (data: MarcaCreateDTO): Promise<Marca> => {
    const response = await axiosInventario.post("/marcas", data);
    return response.data;
  },

  update: async (id: number, data: MarcaUpdateDTO): Promise<Marca> => {
    const response = await axiosInventario.put(`/marcas/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInventario.delete(`/marcas/${id}`);
  },

  buscarPorNombre: async (nombre: string): Promise<Marca[]> => {
    const response = await axiosInventario.get(`/marcas/buscar`, {
      params: { nombre }
    });
    return response.data;
  },
};