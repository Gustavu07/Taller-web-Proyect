// src/pages/AdminLotes.tsx
import { useState } from 'react';
import { useProductos } from '../modules/inventario/productos/hooks/useProductos';
import { LoteTable } from '../modules/inventario/lotes/components/LoteTable';

export default function AdminLotes() {
  const { productos, isLoading } = useProductos();
  const [selectedProductoId, setSelectedProductoId] = useState<number | null>(null);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestión de Lotes</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona un producto:
          </label>
          <select
            value={selectedProductoId || ''}
            onChange={(e) => setSelectedProductoId(Number(e.target.value))}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Selecciona un producto --</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>

        {selectedProductoId ? (
          <LoteTable productoId={selectedProductoId} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">Selecciona un producto para gestionar sus lotes</p>
          </div>
        )}
      </div>
    </div>
  );
}