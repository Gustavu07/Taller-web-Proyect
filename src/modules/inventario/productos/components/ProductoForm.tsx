import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useProductoMutations } from '../hooks/useProductos';
import type { Producto, ProductoCreateDTO } from '../models/Producto';

interface ProductoFormProps {
  producto: Producto | null;
  onClose: () => void;
}

export function ProductoForm({ producto, onClose }: ProductoFormProps) {
  const { create, update, isPending } = useProductoMutations();

  const [formData, setFormData] = useState<ProductoCreateDTO>({
    nombre: '',
    marcaId: 0,
    descripcion: '',
    activo: true,
    foto: null,
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        marcaId: producto.marcaId,
        descripcion: producto.descripcion,
        activo: producto.activo,
        foto: producto.foto,
      });
    }
  }, [producto]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      activo: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    if (formData.marcaId <= 0) {
      alert('Debe seleccionar una marca válida');
      return;
    }

    try {
      if (producto) {
        await update({ 
          id: producto.id, 
          data: { ...formData, id: producto.id } 
        });
      } else {
        await create(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {producto ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Laptop Dell Inspiron"
              required
            />
          </div>

          {/* Marca ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID de Marca *
            </label>
            <input
              type="number"
              name="marcaId"
              value={formData.marcaId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: 1"
              min="1"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              placeholder="Describe las características del producto..."
            />
          </div>

          {/* URL de Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de Foto
            </label>
            <input
              type="url"
              name="foto"
              value={formData.foto || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.foto && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-2">Vista previa:</p>
                <img
                  src={formData.foto}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/128?text=Error';
                  }}
                />
              </div>
            )}
          </div>

          {/* Checkbox Activo */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activo"
              name="activo"
              checked={formData.activo}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="activo" className="text-sm font-medium text-gray-700">
              Producto activo
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