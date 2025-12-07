export interface Marca {
  id: number;
  nombre: string;
  foto: string;
}

export interface MarcaCreateDTO {
  nombre: string;
  foto: string;
}

export interface MarcaUpdateDTO extends Partial<MarcaCreateDTO> {
  id: number;
}

export const esNombreValido = (nombre: string): boolean => {
  return nombre !== null && nombre.trim().length >= 2;
};

export const formatearNombre = (nombre: string): string => {
  return nombre
    .trim()
    .split(" ")
    .map(
      (palabra) =>
        palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    )
    .join(" ");
};

export const compararPorNombre = (a: Marca, b: Marca): number => {
  return a.nombre.localeCompare(b.nombre);
};
