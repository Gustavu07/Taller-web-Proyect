import { useState, useEffect, useRef } from "react";
import {  LogOut,  User,  MessageSquare,  Package,  Building2,  ChevronDown,  Users,  Clock,
  UserCheck,  Tag,  Box,  Archive,} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

type View =
  | "landing"
  | "chat"
  | "admin-branches"
  | "admin-personal"
  | "admin-horarios"
  | "admin-asignaciones"
  | "admin-inventory"
  | "admin-lotes"
  | "admin-marcas"
  | "admin-productos";

type NavbarProps = {
  currentView: View;
  onNavigate: (view: View) => void;
};

function DropdownMenu({
  label,
  icon: Icon,
  isActive,
  items,
  currentView,
  onNavigate,
}: {
  label: string;
  icon: React.ElementType
  isActive: boolean;
  items: { label: string; icon: React.ElementType; view: View }[]
  currentView: View;
  onNavigate: (v: View) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
          isActive
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <Icon className="w-4 h-4" />
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-xl border border-gray-200 rounded-lg py-2 z-[100]">
          {items.map(({ label, icon: ItemIcon, view }) => (
            <button
              key={view}
              onClick={() => {
                onNavigate(view);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                currentView === view
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ItemIcon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ======================= NAVBAR PRINCIPAL =======================
export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const { signOut } = useAuth();
  const user = "admin_prueba";

  const sucursalesViews: View[] = [
    "admin-branches",
    "admin-personal",
    "admin-horarios",
    "admin-asignaciones",
  ];

  const inventarioViews: View[] = [
    "admin-inventory",
    "admin-productos",
    "admin-lotes",
    "admin-marcas",
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* IZQUIERDA */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate("landing")}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              TechStore
            </button>

            <div className="hidden md:flex space-x-4 items-center">
              <button
                onClick={() => onNavigate("landing")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === "landing"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                Inicio
              </button>

              <button
                onClick={() => onNavigate("chat")}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                  currentView === "chat"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Chat Bot
              </button>

              {/* SUCURSALES */}
              <DropdownMenu
                label="Sucursales"
                icon={Building2}
                isActive={sucursalesViews.includes(currentView)}
                currentView={currentView}
                onNavigate={onNavigate}
                items={[
                  {
                    label: "Gestión de Sucursales",
                    icon: Building2,
                    view: "admin-branches",
                  },
                  { label: "Personal", icon: Users, view: "admin-personal" },
                  { label: "Horarios", icon: Clock, view: "admin-horarios" },
                  {
                    label: "Asignación de Personal",
                    icon: UserCheck,
                    view: "admin-asignaciones",
                  },
                ]}
              />

              {/* INVENTARIO */}
              <DropdownMenu
                label="Inventario"
                icon={Package}
                isActive={inventarioViews.includes(currentView)}
                currentView={currentView}
                onNavigate={onNavigate}
                items={[
                  {
                    label: "Gestión de Inventario",
                    icon: Package,
                    view: "admin-inventory",
                  },
                  { label: "Productos", icon: Box, view: "admin-productos" },
                  { label: "Lotes", icon: Archive, view: "admin-lotes" },
                  { label: "Marcas", icon: Tag, view: "admin-marcas" },
                ]}
              />
            </div>
          </div>

          {/* DERECHA */}
          <div className="flex items-center space-x-4">
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
    </nav>
  );
}
