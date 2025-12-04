export enum DiaSemana {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export interface Horario {
  id: number;
  diaSemana: DiaSemana;
  horaApertura: string; // Formato "HH:mm:ss" (viene como LocalTime de Java)
  horaCierre: string; // Formato "HH:mm:ss"
  sucursalId: number;
}

export interface HorarioCreateDTO {
  diaSemana: DiaSemana;
  horaApertura: string; // "08:00:00"
  horaCierre: string; // "18:00:00"
  sucursalId: number;
}

export interface HorarioUpdateDTO extends Partial<HorarioCreateDTO> {
  id: number;
}

export const DiaSemanaNombres: Record<DiaSemana, string> = {
  [DiaSemana.MONDAY]: "Lunes",
  [DiaSemana.TUESDAY]: "Martes",
  [DiaSemana.WEDNESDAY]: "Miércoles",
  [DiaSemana.THURSDAY]: "Jueves",
  [DiaSemana.FRIDAY]: "Viernes",
  [DiaSemana.SATURDAY]: "Sábado",
  [DiaSemana.SUNDAY]: "Domingo",
};
