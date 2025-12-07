import { useState } from 'react';
import { Package, Plus, Edit2, Trash2, AlertCircle, Bell, BellOff } from 'lucide-react';
import {  useLoteMutations, useLotes } from '../hooks/useLote';
import { LoteForm } from './LoteForm';
import { estaVencido, estaProximoAVencer } from '../models/lote';
import type { Lote } from '../models/lote';

interface LoteTableProps {
  productoId: number;
}

export function LoteTable({ productoId }: LoteTableProps) {
  const { lotes, isLoading } = useLotes();
  const { toggleNotificacion, darDeBaja, isPending } = useLoteMutations();
  
  const [showModal, setShowModal] = useState(false);
  const [editingLote, setEditingLote] = useState<Lote | null>(null);

  const lotesDelProducto = lotes.filter((lote) => lote.productoId === productoId);

  const handleEdit = (lote: Lote) => {
    setEditingLote(lote);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingLote(null);
    setShowModal(true);
  };

  const handleToggleNotificacion = (lote: Lote) => {
    toggleNotificacion({ id: lote.id, enabled: !lote.notificacionActiva });
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este lote?')) {
      darDeBaja(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLote(null);
  };

  const getEstadoLote = (fechaVencimiento: string) => {
    if (estaVencido(fechaVencimiento)) {
      return {
        label: 'Vencido',
        color: 'bg-red-100 text-red-800 border-red-300',
        icon: <AlertCircle className="w-4 h-4" />,
      };
    }
    if (estaProximoAVencer(fechaVencimiento, 30)) {
      return {
        label: 'Próximo a vencer',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        icon: <AlertCircle className="w-4 h-4" />,
      };
    }
    return {
      label: 'Vigente',
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: null,
    };
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Lotes del Producto</h2>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Lote
        </button>
      </div>

      {lotesDelProducto.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lotesDelProducto.map((lote) => {
            const estado = getEstadoLote(lote.fechaVencimiento);
            return (
              <div key={lote.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{lote.codigoLote}</h3>
                    <p className="text-sm text-gray-500">ID: {lote.id}</p>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${estado.color}`}>
                    {estado.icon}
                    {estado.label}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cantidad:</span>
                    <span className="font-semibold text-gray-900">{lote.cantidad} unidades</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vencimiento:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(lote.fechaVencimiento).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">Notificación:</span>
                    <span className={`flex items-center gap-1 font-semibold ${
                      lote.notificacionActiva ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {lote.notificacionActiva ? (
                        <>
                          <Bell className="w-4 h-4" />
                          Activa
                        </>
                      ) : (
                        <>
                          <BellOff className="w-4 h-4" />
                          Inactiva
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleNotificacion(lote)}
                    disabled={isPending}
                    className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 text-sm rounded-md transition-colors disabled:opacity-50 ${
                      lote.notificacionActiva
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                    title={lote.notificacionActiva ? 'Desactivar notificación' : 'Activar notificación'}
                  >
                    {lote.notificacionActiva ? (
                      <BellOff className="w-4 h-4" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleEdit(lote)}
                    disabled={isPending}
                    className="px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors disabled:opacity-50"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(lote.id)}
                    disabled={isPending}
                    className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors disabled:opacity-50"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No hay lotes registrados</p>
          <p className="text-gray-500 text-sm mb-4">
            Registra lotes para llevar control del inventario
          </p>
          <button
            onClick={handleCreate}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Crear primer lote
          </button>
        </div>
      )}

      {showModal && (
        <LoteForm
          lote={editingLote}
          productoId={productoId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}