import { useState, useEffect } from "react";
import type { Sucursal, SucursalCreateDTO } from "../models/Sucursal";

export function useSucursalForm(initial: Sucursal | null) {
  const [formData, setFormData] = useState<SucursalCreateDTO>({
    direccion: "",
    telefono: "",
    latitud: 0,
    longitud: 0,
    activa: true,
    imagenUrl: "",
    numerosContacto: [],
    numerosCorporativos: [],
  });

  const [contactoInput, setContactoInput] = useState("");
  const [corporativoInput, setCorporativoInput] = useState("");

  useEffect(() => {
    if (initial) setFormData(initial);
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number"
          ? parseFloat(e.target.value)
          : e.target.value,
    }));
  };

  const addToList = (
    key: "numerosContacto" | "numerosCorporativos",
    value: string
  ) => {
    if (!value.trim()) return;

    setFormData((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), value.trim()],
    }));
  };

  const removeFromList = (
    key: "numerosContacto" | "numerosCorporativos",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((_, i) => i !== index),
    }));
  };

  return {
    formData,
    handleChange,

    contactoInput,
    setContactoInput,
    corporativoInput,
    setCorporativoInput,

    addToList,
    removeFromList,
  };
}
