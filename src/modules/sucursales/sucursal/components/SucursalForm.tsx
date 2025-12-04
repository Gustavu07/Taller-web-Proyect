import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSucursalMutations } from '../hooks/useSucursales';
import type { Sucursal, SucursalCreateDTO, SucursalUpdateDTO } from '../models/Sucursal';

interface SucursalFormProps {
  sucursal: Sucursal | null;
  onClose: () => void;
}

export function SucursalForm({ sucursal, onClose }: SucursalFormProps) {
  const { create, update, isPending } = useSucursalMutations();

  const [formData, setFormData] = useState<SucursalCreateDTO>({
    direccion: '',
    telefono: '',
    latitud: 0,
    longitud: 0,
    activa: true,
    imagenUrl: '',
    numerosContacto: [],
    numerosCorporativos: [],
  });

  const [contactoInput, setContactoInput] = useState('');
  const [corporativoInput, setCorporativoInput] = useState('');

  useEffect(() => {
    if (sucursal) {
      setFormData({
        direccion: sucursal.direccion,
        telefono: sucursal.telefono,
        latitud: sucursal.latitud,
        longitud: sucursal.longitud,
        activa: sucursal.activa,
        imagenUrl: sucursal.imagenUrl,
        numerosContacto: sucursal.numerosContacto,
        numerosCorporativos: sucursal.numerosCorporativos,
      });
    }
  }, [sucursal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleAddContacto = () => {
    if (contactoInput.trim()) {
      setFormData({
        ...formData,
        numerosContacto: [...formData.numerosContacto || [], contactoInput.trim()],
      });
      setContactoInput('');
    }
  };

  const handleRemoveContacto = (index: number) => {
    setFormData({
      ...formData,
      numerosContacto: formData.numerosContacto?.filter((_, i) => i !== index) || [],
    });
  };

  const handleAddCorporativo = () => {
    if (corporativoInput.trim()) {
      setFormData({
        ...formData,
        numerosCorporativos: [...formData.numerosCorporativos || [], corporativoInput.trim()],
      });
      setCorporativoInput('');
    }
  };

  const handleRemoveCorporativo = (index: number) => {
    setFormData({
      ...formData,
      numerosCorporativos: formData.numerosCorporativos?.filter((_, i) => i !== index) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (sucursal) {
        await update({ id: sucursal.id, data: formData as unknown as SucursalUpdateDTO });
      } else {
        await create(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar sucursal:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {sucursal ? 'Editar Sucursal' : 'Nueva Sucursal'}
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
              Dirección *
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitud *
              </label>
              <input
                type="number"
                name="latitud"
                step="0.000001"
                value={formData.latitud}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitud *
              </label>
              <input
                type="number"
                name="longitud"
                step="0.000001"
                value={formData.longitud}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de imagen
            </label>
            <input
              type="url"
              name="imagenUrl"
              value={formData.imagenUrl || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Números de Contacto
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="tel"
                value={contactoInput}
                onChange={(e) => setContactoInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddContacto())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Agregar número"
              />
              <button
                type="button"
                onClick={handleAddContacto}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.numerosContacto?.map((numero, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {numero}
                  <button
                    type="button"
                    onClick={() => handleRemoveContacto(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Números Corporativos
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="tel"
                value={corporativoInput}
                onChange={(e) => setCorporativoInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCorporativo())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Agregar número corporativo"
              />
              <button
                type="button"
                onClick={handleAddCorporativo}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.numerosCorporativos?.map((numero, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {numero}
                  <button
                    type="button"
                    onClick={() => handleRemoveCorporativo(index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
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