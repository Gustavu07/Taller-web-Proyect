// src/modules/inventario/lotes/components/LoteForm.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLoteMutations } from '../hooks/useLote';
import type { Lote, LoteCreateDTO } from '../models/lote';

interface LoteFormProps {
  lote: Lote | null;
  productoId: number;
  onClose: () => void;
}

export function LoteForm({ lote, productoId, onClose }: LoteFormProps) {
  const { create, update, isPending } = useLoteMutations();

  const [formData, setFormData] = useState<LoteCreateDTO>({
    productoId: productoId,
    codigoLote: '',
    fechaVencimiento: '',
    cantidad: 0,
    notificacionActiva: true,
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (lote) {
      setFormData({
        productoId: lote.productoId,
        codigoLote: lote.codigoLote,
        fechaVencimiento: lote.fechaVencimiento,
        cantidad: lote.cantidad,
        notificacionActiva: lote.notificacionActiva,
      });
    }
  }, [lote]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (formData.cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    const fechaVenc = new Date(formData.fechaVencimiento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaVenc < hoy) {
      if (!window.confirm('La fecha de vencimiento ya pasó. ¿Deseas continuar?')) {
        return;
      }
    }

    try {
      if (lote) {
        // Actualizar
        await update({
          id: lote.id,
          data: {
            ...formData,
            id: lote.id,
          },
        });
      } else {
        // Crear
        await create(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar lote:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {lote ? 'Editar Lote' : 'Nuevo Lote'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Código de lote */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código de Lote *
            </label>
            <input
              type="text"
              name="codigoLote"
              value={formData.codigoLote}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: LOTE-2025-001"
              required
            />
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad *
            </label>
            <input
              type="number"
              name="cantidad"
              min="1"
              value={formData.cantidad}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Fecha de vencimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Vencimiento *
            </label>
            <input
              type="date"
              name="fechaVencimiento"
              value={formData.fechaVencimiento}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Notificación activa */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notificacionActiva"
              checked={formData.notificacionActiva}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Activar notificaciones de vencimiento
            </label>
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