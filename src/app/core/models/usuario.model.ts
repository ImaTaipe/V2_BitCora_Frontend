export interface Usuario {
  id: number;
  nombreCompleto: string;
  correo: string;
  rol: string;
  telefono?: string;
  direccion?: string;
  estado: boolean;
}