import { useState } from 'react';
import { AlertCircle, Package } from 'lucide-react';
import { useProductos } from '../modules/inventario/productos/hooks/useProductos';
import { LoteTable } from '../modules/inventario/lotes/components/LoteTable';

export default function AdminLotes() {
  const { productos, isLoading, isError, error } = useProductos();
  const [selectedProductoId, setSelectedProductoId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Error al cargar productos</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Lotes</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona un producto:
          </label>
          <select
            value={selectedProductoId || ''}
            onChange={(e) => setSelectedProductoId(Number(e.target.value) || null)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">-- Selecciona un producto --</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
          {productos.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">No hay productos disponibles</p>
          )}
        </div>

        {selectedProductoId ? (
          <LoteTable productoId={selectedProductoId} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Selecciona un producto para gestionar sus lotes</p>
          </div>
        )}
      </div>
    </div>
  );
}