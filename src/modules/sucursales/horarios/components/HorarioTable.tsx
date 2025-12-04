// src/modules/horarios/components/HorarioTable.tsx
import { useState } from 'react';
import { Clock, Plus, Edit2, Trash2 } from 'lucide-react';
import { useHorariosBySucursal, useHorarioMutations } from '../hooks/useHorarios';
import { HorarioForm } from './HorarioForm';
import { DiaSemanaNombres } from '../models/Horario';
import type { Horario } from '../models/Horario';

interface HorarioTableProps {
  sucursalId: number;
}

export function HorarioTable({ sucursalId }: HorarioTableProps) {
  const { horarios, isLoading } = useHorariosBySucursal(sucursalId);
  const { remove } = useHorarioMutations();
  
  const [showModal, setShowModal] = useState(false);
  const [editingHorario, setEditingHorario] = useState<Horario | null>(null);

  const handleEdit = (horario: Horario) => {
    setEditingHorario(horario);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingHorario(null);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este horario?')) {
      remove(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingHorario(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Horarios</h2>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Horario
        </button>
      </div>

      {/* Tabla */}
      {horarios.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Día</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Apertura</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Cierre</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario) => (
                <tr key={horario.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      {DiaSemanaNombres[horario.diaSemana]}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {horario.horaApertura}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {horario.horaCierre}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(horario)}
                        className="p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(horario.id)}
                        className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No hay horarios registrados</p>
          <p className="text-gray-500 text-sm mb-4">
            Agrega los horarios de atención de esta sucursal
          </p>
          <button
            onClick={handleCreate}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Agregar primer horario
          </button>
        </div>
      )}

      {/* Modal de formulario */}
      {showModal && (
        <HorarioForm
          horario={editingHorario}
          sucursalId={sucursalId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}