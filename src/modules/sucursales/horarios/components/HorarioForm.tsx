// src/modules/horarios/components/HorarioForm.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useHorarioMutations } from '../hooks/useHorarios';
import { DiaSemana, DiaSemanaNombres } from '../models/Horario';
import type { Horario, HorarioCreateDTO } from '../models/Horario';

interface HorarioFormProps {
  horario: Horario | null;
  sucursalId: number;
  onClose: () => void;
}

export function HorarioForm({ horario, sucursalId, onClose }: HorarioFormProps) {
  const { create, update, isPending } = useHorarioMutations();

  const [formData, setFormData] = useState<HorarioCreateDTO>({
    diaSemana: DiaSemana.MONDAY,
    horaApertura: '08:00:00',
    horaCierre: '18:00:00',
    sucursalId: sucursalId,
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (horario) {
      setFormData({
        diaSemana: horario.diaSemana,
        horaApertura: horario.horaApertura,
        horaCierre: horario.horaCierre,
        sucursalId: horario.sucursalId,
      });
    }
  }, [horario]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que hora apertura sea antes que hora cierre
    if (formData.horaApertura >= formData.horaCierre) {
      alert('La hora de apertura debe ser antes que la hora de cierre');
      return;
    }

    try {
      if (horario) {
        await update({ id: horario.id,  data: { ...formData, id: horario.id } 
    });
      } else {
        await create(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar horario:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {horario ? 'Editar Horario' : 'Nuevo Horario'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Día de la semana *
            </label>
            <select
              name="diaSemana"
              value={formData.diaSemana}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              {Object.entries(DiaSemana).map(([value]) => (
                <option key={value} value={value}>
                  {DiaSemanaNombres[value as DiaSemana]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora de apertura *
            </label>
            <input
              type="time"
              name="horaApertura"
              value={formData.horaApertura.substring(0, 5)} // "HH:mm"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  horaApertura: `${e.target.value}:00`,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Hora de cierre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora de cierre *
            </label>
            <input
              type="time"
              name="horaCierre"
              value={formData.horaCierre.substring(0, 5)} // "HH:mm"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  horaCierre: `${e.target.value}:00`,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-md transition-colors"
            >
              {isPending ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 font-semibold py-2 rounded-md transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}