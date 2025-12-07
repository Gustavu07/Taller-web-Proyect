// src/modules/inventario/marcas/components/MarcaForm.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useMarcaMutations } from '../hooks/UseMarca';
import { esNombreValido, formatearNombre } from '../models/marca';
import type { Marca, MarcaCreateDTO } from '../models/marca';

interface MarcaFormProps {
  marca: Marca | null;
  onClose: () => void;
}

export function MarcaForm({ marca, onClose }: MarcaFormProps) {
  const { create, update, isPending } = useMarcaMutations();

  const [formData, setFormData] = useState<MarcaCreateDTO>({
    nombre: '',
    foto: '',
  });

  const [errors, setErrors] = useState<{ nombre?: string }>({});

  useEffect(() => {
    if (marca) {
      setFormData({
        nombre: marca.nombre,
        foto: marca.foto,
      });
    }
  }, [marca]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Limpiar error del campo
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { nombre?: string } = {};

    if (!esNombreValido(formData.nombre)) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Formatear nombre antes de enviar
    const dataToSend: MarcaCreateDTO = {
      ...formData,
      nombre: formatearNombre(formData.nombre),
    };

    try {
      if (marca) {
        // Actualizar
        await update({
          id: marca.id,
          data: {
            ...dataToSend,
            id: marca.id,
          },
        });
      } else {
        // Crear
        await create(dataToSend);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar marca:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {marca ? 'Editar Marca' : 'Nueva Marca'}
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
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Marca *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.nombre
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Ej: Nike, Adidas, Samsung..."
              required
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              El nombre se formateará automáticamente (primera letra mayúscula)
            </p>
          </div>

          {/* URL de foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL del Logo
            </label>
            <input
              type="url"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://example.com/logo.png"
            />
            {formData.foto && (
              <div className="mt-3 p-2 border border-gray-200 rounded-md">
                <p className="text-xs text-gray-600 mb-2">Vista previa:</p>
                <img
                  src={formData.foto}
                  alt="Vista previa"
                  className="w-full h-32 object-contain bg-gray-50 rounded"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.alt = 'Error al cargar imagen';
                  }}
                />
              </div>
            )}
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