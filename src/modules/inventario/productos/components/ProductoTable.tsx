import { useState } from 'react';
import { Package, Plus, Edit2, Trash2, Tag, CheckCircle, XCircle } from 'lucide-react';
import { useProductos, useProductoMutations } from '../hooks/useProductos';
import { ProductoForm } from './ProductoForm';
import type { Producto } from '../models/Producto';

export function ProductoTable() {
  const { productos, isLoading } = useProductos();
  const { remove, activar, desactivar } = useProductoMutations();
  
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);

  const handleEdit = (producto: Producto) => {
    setEditingProducto(producto);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingProducto(null);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      remove(id);
    }
  };

  const handleToggleActivo = (producto: Producto) => {
    if (producto.activo) {
      desactivar(producto.id);
    } else {
      activar(producto.id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProducto(null);
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
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Producto
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Imagen del producto */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
                {producto.foto ? (
                  <img
                    src={producto.foto}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-20 h-20 text-white opacity-50" />
                  </div>
                )}
                
                {/* Badge de estado */}
                <div className="absolute top-3 right-3">
                  {producto.activo ? (
                    <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Activo
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      <XCircle className="w-3 h-3" />
                      Inactivo
                    </span>
                  )}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {producto.nombre}
                </h3>

                <div className="space-y-3 mb-4">
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">Marca ID:</span> {producto.marcaId}
                  </p>
                  
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Descripción:</span>
                    <span className="block mt-1 text-gray-500 line-clamp-2">
                      {producto.descripcion || 'Sin descripción'}
                    </span>
                  </p>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleActivo(producto)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      producto.activo
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {producto.activo ? (
                      <>
                        <XCircle className="w-4 h-4" />
                        Desactivar
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Activar
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleEdit(producto)}
                    className="px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(producto.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productos.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No hay productos registrados</p>
            <button
              onClick={handleCreate}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Crear primer producto
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <ProductoForm
          producto={editingProducto}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}