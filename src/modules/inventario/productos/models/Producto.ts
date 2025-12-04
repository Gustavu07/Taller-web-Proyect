export interface Producto {
  id: number;
  nombre: string;
  marcaId: number;
  descripcion: string;
  activo: boolean;
  foto: string | null;
}

// Tipo para crear producto
export interface ProductoCreateDTO {
  nombre: string;
  marcaId: number;
  descripcion: string;
  activo?: boolean;
  foto?: string | null;
}

// Tipo para actualización
export interface ProductoUpdateDTO extends Partial<ProductoCreateDTO> {
  id: number;
}
