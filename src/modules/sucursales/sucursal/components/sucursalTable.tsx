import { useState } from 'react';
import { Building2, Power, Plus, Edit2, Trash2 } from 'lucide-react';
import { useSucursales, useSucursalMutations } from '../hooks/useSucursales';
import { SucursalForm } from './SucursalForm';
import type { Sucursal } from '../models/Sucursal';

export function SucursalTable() {
  const { sucursales, isLoading } = useSucursales();
  const { activar, desactivar, remove } = useSucursalMutations();
  
  const [showModal, setShowModal] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState<Sucursal | null>(null);

  const handleEdit = (sucursal: Sucursal) => {
    setEditingSucursal(sucursal);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingSucursal(null);
    setShowModal(true);
  };

  const handleToggleActive = (id: number, isActive: boolean) => {
    if (window.confirm(`¿Confirmar ${isActive ? 'desactivar' : 'activar'} sucursal?`)) {
      if (isActive) {
        desactivar(id);
      } else {
        activar(id);
      }
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta sucursal?')) {
      remove(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSucursal(null);
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
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Sucursales</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Sucursal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sucursales.map((sucursal) => (
            <div key={sucursal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img
                  src={sucursal.imagenUrl || 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg'}
                  alt={sucursal.direccion}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{sucursal.direccion}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      sucursal.activa
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {sucursal.activa ? 'Activa' : 'Inactiva'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2">📞 {sucursal.telefono}</p>
                <p className="text-gray-600 text-sm mb-2">
                  📍 Lat: {sucursal.latitud}, Long: {sucursal.longitud}
                </p>

                {sucursal.numerosContacto.length > 0 && (
                  <div className="text-gray-600 text-sm mb-4">
                    <strong>Contactos:</strong> {sucursal.numerosContacto.join(', ')}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleActive(sucursal.id, sucursal.activa)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      sucursal.activa
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    {sucursal.activa ? 'Desactivar' : 'Activar'}
                  </button>
                  <button
                    onClick={() => handleEdit(sucursal)}
                    className="px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(sucursal.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {sucursales.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No hay sucursales registradas</p>
            <button
              onClick={handleCreate}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Crear primera sucursal
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <SucursalForm
          sucursal={editingSucursal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}