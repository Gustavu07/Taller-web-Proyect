import { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Building2 } from 'lucide-react';
import { usePersonal, usePersonalMutations } from '../hooks/usePersonal';
import { PersonalForm } from './PersonalForm';
import type { Personal } from '../models/Personal';

export function PersonalTable() {
  const { personal, isLoading } = usePersonal();
  const { remove } = usePersonalMutations();
  
  const [showModal, setShowModal] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState<Personal | null>(null);

  const handleEdit = (personalItem: Personal) => {
    setEditingPersonal(personalItem);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingPersonal(null);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este personal?')) {
      remove(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPersonal(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Personal</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Personal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personal.map((personalItem) => (
            <div key={personalItem.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header con avatar */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-white text-center">
                  {personalItem.nombreCompleto}
                </h3>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="font-semibold">📧</span>
                    {personalItem.correoInstitucional}
                  </p>
                  
                  <div className="text-gray-600 text-sm">
                    <span className="font-semibold">📞 Teléfonos:</span>
                    <div className="mt-1 space-y-1">
                      {personalItem.numerosTelefono.map((tel, index) => (
                        <div key={index} className="pl-4">• {tel}</div>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">Sucursal ID:</span> {personalItem.sucursalId}
                  </p>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(personalItem)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(personalItem.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {personal.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No hay personal registrado</p>
            <button
              onClick={handleCreate}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Crear primer registro
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <PersonalForm
          personal={editingPersonal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}