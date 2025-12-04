import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  useAsignacionCorporativaMutations,
} from "../hooks/useAsignacionCorporativas";

import { usePersonal } from "../../personal/hooks/usePersonal";
import { useSucursales } from "../../sucursal/hooks/useSucursales";

import type {
  AsignacionCorporativa,
  AsignacionCorporativaCreateDTO,
  AsignacionCorporativaUpdateDTO,
} from "../models/AsignacionCorporativa";

interface Props {
  asignacion: AsignacionCorporativa | null;
  onClose: () => void;
}

export function AsignacionCorporativaForm({ asignacion, onClose }: Props) {
  const { create, update, isPending } = useAsignacionCorporativaMutations();

  // Cargar datos externos
  const { personal } = usePersonal();
  const { sucursales } = useSucursales();

  const [formData, setFormData] = useState<AsignacionCorporativaCreateDTO>({
    personalId: 0,
    sucursalId: 0,
    numeroCorporativo: "",
    activo: true,
  });

  useEffect(() => {
    if (asignacion) {
      setFormData({
        personalId: asignacion.personalId,
        sucursalId: asignacion.sucursalId,
        numeroCorporativo: asignacion.numeroCorporativo,
        activo: asignacion.activo,
      });
    }
  }, [asignacion]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseInt(value) : value;

    setFormData({
      ...formData,
      [name]: name === "activo" ? (e.target as HTMLInputElement).checked : parsedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (asignacion) {
        const updateData: AsignacionCorporativaUpdateDTO = {
          id: asignacion.id,
          ...formData,
        };

        await update({ id: asignacion.id, data: updateData });
      } else {
        await create(formData);
      }

      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {asignacion ? "Editar Asignación" : "Nueva Asignación"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personal *
            </label>
            <select
              name="personalId"
              value={formData.personalId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value={0}>Seleccione un personal</option>
              {personal.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombreCompleto} (ID {p.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sucursal *
            </label>
            <select
  name="sucursalId"
  value={formData.sucursalId}
  onChange={handleChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-md"
>
  <option value={0}>Seleccione una sucursal</option>

  {sucursales.map((s) => (
    <option key={s.id} value={s.id}>
      {s.direccion} (ID {s.id})
    </option>
  ))}
</select>

          </div>

          {/* NUMERO CORPORATIVO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número Corporativo *
            </label>
            <input
              type="text"
              name="numeroCorporativo"
              value={formData.numeroCorporativo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label className="text-sm font-medium text-gray-700">
              Activo
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              disabled={isPending}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={
                isPending ||
                formData.personalId === 0 ||
                formData.sucursalId === 0 ||
                !formData.numeroCorporativo.trim()
              }
            >
              {isPending
                ? "Guardando..."
                : asignacion
                ? "Actualizar"
                : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
