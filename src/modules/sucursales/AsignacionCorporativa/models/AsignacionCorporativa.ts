export interface AsignacionCorporativa {
  id: number;
  personalId: number;
  sucursalId: number;
  numeroCorporativo: string;
  activo: boolean;
}

export interface AsignacionCorporativaCreateDTO {
  personalId: number;
  sucursalId: number;
  numeroCorporativo: string;
  activo?: boolean; // Por defecto true
}

export interface AsignacionCorporativaUpdateDTO
  extends Partial<AsignacionCorporativaCreateDTO> {
  id: number;
}
