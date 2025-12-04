import axiosInventario from "../../../../lib/axiosInventario";
import type {
  Producto,
  ProductoCreateDTO,
  ProductoUpdateDTO,
} from "../models/Producto";

export const productoService = {
  getAll: async (): Promise<Producto[]> => {
    const response = await axiosInventario.get("/productos");
    return response.data;
  },

  getById: async (id: number): Promise<Producto> => {
    const response = await axiosInventario.get(`/productos/${id}`);
    return response.data;
  },

  getByMarcaId: async (marcaId: number): Promise<Producto[]> => {
    const response = await axiosInventario.get(`/productos/marca/${marcaId}`);
    return response.data;
  },

  create: async (data: ProductoCreateDTO): Promise<Producto> => {
    const response = await axiosInventario.post("/productos", data);
    return response.data;
  },

  update: async (id: number, data: ProductoUpdateDTO): Promise<Producto> => {
    const response = await axiosInventario.put(`/productos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInventario.delete(`/productos/${id}`);
  },

  activar: async (id: number): Promise<Producto> => {
    const response = await axiosInventario.patch(`/productos/${id}/activar`);
    return response.data;
  },

  desactivar: async (id: number): Promise<Producto> => {
    const response = await axiosInventario.patch(`/productos/${id}/desactivar`);
    return response.data;
  },
};
