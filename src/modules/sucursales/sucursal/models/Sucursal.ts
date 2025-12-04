export interface Sucursal {
  id: number;
  direccion: string;
  telefono: string;
  latitud: number;
  longitud: number;
  activa: boolean;
  imagenUrl: string | null;
  numerosContacto: string[];
  numerosCorporativos: string[];
}

export interface SucursalCreateDTO {
  direccion: string;
  telefono: string;
  latitud: number;
  longitud: number;
  activa?: boolean;
  imagenUrl?: string | null;
  numerosContacto?: string[];
  numerosCorporativos?: string[];
}

export interface SucursalUpdateDTO extends Partial<SucursalCreateDTO> {
  id: number;
}
