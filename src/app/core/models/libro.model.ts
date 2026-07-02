export interface Libro {

  id: number;

  titulo: string;

  autor: string;

  editorial: string;

  sinopsis: string;

  isbn: string;

  anio: number;

  stock: number;

  categoriaId?: number;

  categoria?: string;

  urlImagen?: string;

  estado: boolean;

  promedioEstrellas: number;

  cantidadResenas: number;
}