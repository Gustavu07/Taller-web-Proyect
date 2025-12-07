// src/modules/inventario/marcas/components/MarcaTable.tsx
import { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useMarcas, useMarcaMutations, useMarcasByNombre } from '../hooks/UseMarca';
import { MarcaForm } from './MarcaForm';
import type { Marca } from '../models/marca';

export function MarcaTable() {
  const { marcas, isLoading } = useMarcas();
  const { remove } = useMarcaMutations();
  
  const [showModal, setShowModal] = useState(false);
  const [editingMarca, setEditingMarca] = useState<Marca | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Búsqueda por nombre (solo si hay más de 2 caracteres)
  const { marcas: marcasFiltradas } = useMarcasByNombre(searchTerm);
  
  // Mostrar marcas filtradas o todas
  const marcasAMostrar = searchTerm.length >= 2 ? marcasFiltradas : marcas;

  const handleEdit = (marca: Marca) => {
    setEditingMarca(marca);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingMarca(null);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta marca?')) {
      remove(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMarca(null);
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Tag className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Marcas</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Marca
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar marca por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {searchTerm.length >= 2 && (
            <p className="text-sm text-gray-600 mt-2">
              Mostrando {marcasAMostrar.length} resultado(s) para "{searchTerm}"
            </p>
          )}
        </div>

        {/* Grid de marcas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marcasAMostrar.map((marca) => (
            <div key={marca.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Logo de la marca */}
              <div className="relative h-40 bg-gradient-to-br from-purple-500 to-purple-600">
                {marca.foto ? (
                  <img
                    src={marca.foto}
                    alt={marca.nombre}
                    className="w-full h-full object-contain p-4 bg-white"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Tag className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                  {marca.nombre}
                </h3>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(marca)}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(marca.id)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {marcasAMostrar.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">
              {searchTerm.length >= 2 
                ? `No se encontraron marcas con "${searchTerm}"`
                : 'No hay marcas registradas'}
            </p>
            {searchTerm.length < 2 && (
              <button
                onClick={handleCreate}
                className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Crear primera marca
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal de formulario */}
      {showModal && (
        <MarcaForm
          marca={editingMarca}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}