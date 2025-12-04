import axiosInstance from "../../../../lib/axios";
import type {
  Horario,
  HorarioCreateDTO,
  HorarioUpdateDTO,
} from "../models/Horario";

export const horarioService = {
  // Obtener todos los horarios
  getAll: async (): Promise<Horario[]> => {
    const response = await axiosInstance.get("/horarios");
    return response.data;
  },

  // Obtener horario por ID
  getById: async (id: number): Promise<Horario> => {
    const response = await axiosInstance.get(`/horarios/${id}`);
    return response.data;
  },

  // Obtener horarios por sucursal
  getBySucursalId: async (sucursalId: number): Promise<Horario[]> => {
    const response = await axiosInstance.get(
      `/horarios/sucursal/${sucursalId}`
    );
    return response.data;
  },

  // Crear horario
  create: async (data: HorarioCreateDTO): Promise<Horario> => {
    const response = await axiosInstance.post("/horarios", data);
    return response.data;
  },

  // Actualizar horario
  update: async (id: number, data: HorarioUpdateDTO): Promise<Horario> => {
    const response = await axiosInstance.put(`/horarios/${id}`, data);
    return response.data;
  },

  // Eliminar horario
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/horarios/${id}`);
  },
};
