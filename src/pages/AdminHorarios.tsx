import { useState } from 'react';
import { useSucursales } from '../modules/sucursales/sucursal/hooks/useSucursales';
import { HorarioTable } from '../modules/sucursales/horarios/components/HorarioTable';

export default function AdminHorarios() {
  const { sucursales, isLoading } = useSucursales();
  const [selectedSucursalId, setSelectedSucursalId] = useState<number | null>(null);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestión de Horarios</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona una sucursal:
          </label>
          <select
            value={selectedSucursalId || ''}
            onChange={(e) => setSelectedSucursalId(Number(e.target.value))}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Selecciona una sucursal --</option>
            {sucursales.map((sucursal) => (
              <option key={sucursal.id} value={sucursal.id}>
                {sucursal.direccion}
              </option>
            ))}
          </select>
        </div>

        {/* Tabla de horarios */}
        {selectedSucursalId ? (
          <HorarioTable sucursalId={selectedSucursalId} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">Selecciona una sucursal para gestionar sus horarios</p>
          </div>
        )}
      </div>
    </div>
  );
}