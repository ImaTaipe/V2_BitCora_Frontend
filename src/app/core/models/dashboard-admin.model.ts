export interface DashboardAdmin {
  totalLibros: number;

  totalUsuarios: number;

  prestamosActivos: number;

  multasRecaudadas: number;

  multasPendientes: number;

  topLibros: string[];

  usuariosSancionados: string[];
}