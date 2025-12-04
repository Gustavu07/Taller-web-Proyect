import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { usePersonalMutations } from '../hooks/usePersonal';
import type { Personal, PersonalCreateDTO, PersonalUpdateDTO } from '../models/Personal';

interface PersonalFormProps {
  personal: Personal | null;
  onClose: () => void;
}

export function PersonalForm({ personal, onClose }: PersonalFormProps) {
  const { create, update, isPending } = usePersonalMutations();

  const [formData, setFormData] = useState<PersonalCreateDTO>({
    nombreCompleto: '',
    correoInstitucional: '',
    numerosTelefono: [],
    sucursalId: 0,
  });

  const [telefonoInput, setTelefonoInput] = useState('');

  useEffect(() => {
    if (personal) {
      setFormData({
        nombreCompleto: personal.nombreCompleto,
        correoInstitucional: personal.correoInstitucional,
        numerosTelefono: personal.numerosTelefono,
        sucursalId: personal.sucursalId,
      });
    }
  }, [personal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  const handleAddTelefono = () => {
    if (telefonoInput.trim()) {
      setFormData({
        ...formData,
        numerosTelefono: [...formData.numerosTelefono, telefonoInput.trim()],
      });
      setTelefonoInput('');
    }
  };

  const handleRemoveTelefono = (index: number) => {
    setFormData({
      ...formData,
      numerosTelefono: formData.numerosTelefono.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (personal) {
        const updateData: PersonalUpdateDTO = {
          id: personal.id,
          ...formData,
        };
        await update({ id: personal.id, data: updateData });
      } else {
        await create(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {personal ? 'Editar Personal' : 'Nuevo Personal'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Institucional *
            </label>
            <input
              type="email"
              name="correoInstitucional"
              value={formData.correoInstitucional}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Sucursal *
            </label>
            <input
              type="number"
              name="sucursalId"
              value={formData.sucursalId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Números de Teléfono *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="tel"
                value={telefonoInput}
                onChange={(e) => setTelefonoInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTelefono())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Agregar número de teléfono"
              />
              <button
                type="button"
                onClick={handleAddTelefono}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.numerosTelefono.map((numero, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {numero}
                  <button
                    type="button"
                    onClick={() => handleRemoveTelefono(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {formData.numerosTelefono.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Debe agregar al menos un número de teléfono
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              disabled={isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isPending || formData.numerosTelefono.length === 0}
            >
              {isPending ? 'Guardando...' : personal ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}