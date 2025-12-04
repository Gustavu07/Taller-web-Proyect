import { useState } from "react";
import { Phone, Plus, Edit2, Trash2, Building2, User } from "lucide-react";
import {
  useAsignacionesCorporativas,
  useAsignacionCorporativaMutations,
} from "../hooks/useAsignacionCorporativas";
import { AsignacionCorporativaForm } from "./AsignacionCorporativaForm";
import type { AsignacionCorporativa } from "../models/AsignacionCorporativa";

export function AsignacionCorporativaTable() {
  const { asignaciones, isLoading } = useAsignacionesCorporativas();
  const { remove, desactivar } = useAsignacionCorporativaMutations();

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<AsignacionCorporativa | null>(
    null
  );

  // Abrir modal en modo edición
  const handleEdit = (item: AsignacionCorporativa) => {
    setEditingItem(item);
    setShowModal(true);
  };

  // Abrir modal en modo creación
  const handleCreate = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar esta asignación?")) {
      remove(id);
    }
  };

  const handleDeactivate = (id: number) => {
    if (window.confirm("¿Desactivar número corporativo?")) {
      desactivar(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
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
            <Phone className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Asignación de Números Corporativos
            </h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Asignación
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asignaciones.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-white text-center">
                  Nº {item.numeroCorporativo}
                </h3>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-3">
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">Personal ID:</span>{" "}
                  {item.personalId}
                </p>

                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">Sucursal ID:</span>{" "}
                  {item.sucursalId}
                </p>

                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <span className="font-semibold">Estado:</span>
                  {item.activo ? (
                    <span className="text-green-600 font-semibold">Activo</span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Desactivado
                    </span>
                  )}
                </p>

                {/* Botones */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>

                  <button
                    onClick={() => handleDeactivate(item.id)}
                    className="px-3 py-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-md"
                  >
                    🚫
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Si no hay registros */}
        {asignaciones.length === 0 && (
          <div className="text-center py-12">
            <Phone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No hay asignaciones registradas
            </p>
            <button
              onClick={handleCreate}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Crear primera asignación
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <AsignacionCorporativaForm
          asignacion={editingItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
