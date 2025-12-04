export interface Personal {
  id: number;
  nombreCompleto: string;
  correoInstitucional: string;
  numerosTelefono: string[];
  sucursalId: number;
}

// Tipo para crear personal
export interface PersonalCreateDTO {
  nombreCompleto: string;
  correoInstitucional: string;
  numerosTelefono: string[];
  sucursalId: number;
}

// Tipo para actualización
export interface PersonalUpdateDTO extends Partial<PersonalCreateDTO> {
  id: number;
}
