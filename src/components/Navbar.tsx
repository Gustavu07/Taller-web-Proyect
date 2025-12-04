import { useState, useEffect, useRef } from 'react';
import { LogOut, User, MessageSquare, Package, Building2, ChevronDown, Users, Clock, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type NavbarProps = {
  currentView: 'landing' | 'chat' | 'admin-branches' | 'admin-personal' | 'admin-horarios' | 'admin-asignaciones' | 'admin-inventory' | 'admin-lotes';
  onNavigate: (view: 'landing' | 'chat' | 'admin-branches' | 'admin-personal' | 'admin-horarios' | 'admin-asignaciones' | 'admin-inventory'| 'admin-lotes') => void;
};

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  // const { user, signOut } = useAuth();  ← ORIGINAL

  // ⬇️ Simular login sin autenticación
  const { signOut } = useAuth();
  const user = "admin_prueba";

  const [showSucursalesDropdown, setShowSucursalesDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSucursalesDropdown(false);
      }
    }

    if (showSucursalesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSucursalesDropdown]);

  const sucursalesViews = ['admin-branches', 'admin-personal', 'admin-horarios', 'admin-asignaciones'];
  const isSucursalesActive = sucursalesViews.includes(currentView);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Izquierda */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('landing')}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              TechStore
            </button>

            <div className="hidden md:flex space-x-4 items-center">
              <button
                onClick={() => onNavigate('landing')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'landing'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Inicio
              </button>

              <button
                onClick={() => onNavigate('chat')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'chat'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Chat Bot
              </button>

              {/* Mostrar opciones admin siempre porque simulamos login */}
              <>
                {/* Dropdown de Sucursales */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowSucursalesDropdown(!showSucursalesDropdown)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      isSucursalesActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    Sucursales
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSucursalesDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showSucursalesDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100]">
                      <button
                        onClick={() => {
                          onNavigate('admin-branches');
                          setShowSucursalesDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                          currentView === 'admin-branches'
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        Gestión de Sucursales
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('admin-personal');
                          setShowSucursalesDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                          currentView === 'admin-personal'
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        Personal
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('admin-horarios');
                          setShowSucursalesDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                          currentView === 'admin-horarios'
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        Horarios
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('admin-asignaciones');
                          setShowSucursalesDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                          currentView === 'admin-asignaciones'
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <UserCheck className="w-4 h-4" />
                        Asignación de Personal
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onNavigate('admin-inventory')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentView === 'admin-inventory'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Inventario
                </button>
              </>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{user}</span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}