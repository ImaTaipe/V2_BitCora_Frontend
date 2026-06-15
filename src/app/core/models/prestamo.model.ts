export interface Prestamo {
  id: number;
  libroId: number;
  usuarioId: number;

  fechaPrestamo: string;

  fechaDevolucionMaxima: string;

  fechaEntregaReal?: string;

  estado: string;
}