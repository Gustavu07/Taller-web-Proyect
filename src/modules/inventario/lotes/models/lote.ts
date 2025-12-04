export interface Lote {
  id: number;
  productoId: number;
  codigoLote: string;
  fechaVencimiento: string; // Formato ISO: "YYYY-MM-DD" (viene de LocalDate de Java)
  cantidad: number;
  notificacionActiva: boolean;
}

export interface LoteCreateDTO {
  productoId: number;
  codigoLote: string;
  fechaVencimiento: string; // "YYYY-MM-DD"
  cantidad: number;
  notificacionActiva?: boolean;
}

export interface LoteUpdateDTO extends Partial<LoteCreateDTO> {
  id: number;
}

export const estaProximoAVencer = (
  fechaVencimiento: string,
  diasAntes: number = 30
): boolean => {
  const hoy = new Date();
  const fechaVenc = new Date(fechaVencimiento);
  const diferenciaDias = Math.ceil(
    (fechaVenc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diferenciaDias <= diasAntes && diferenciaDias >= 0;
};

// Helper: Verificar si un lote está vencido
export const estaVencido = (fechaVencimiento: string): boolean => {
  const hoy = new Date();
  const fechaVenc = new Date(fechaVencimiento);
  return fechaVenc < hoy;
};
