export interface Prestamo {

  id: number;

  libroId: number;

  libro: string;

  usuarioId: number;

  usuario: string;

  fechaPrestamo: string;

  fechaDevolucionMaxima: string;

  fechaEntregaReal?: string;

  estado: string;
}