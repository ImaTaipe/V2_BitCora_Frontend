import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {

  private apiUrl = `${environment.apiUrl}/libros`;

  libros = signal<Libro[]>([]);

  constructor(private http: HttpClient) {}

  cargarLibros() {this.http.get<Libro[]>(this.apiUrl).subscribe(data => {this.libros.set(data);
    });
  }

  getById(id: number) {return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  create(formData: FormData) {
    return this.http.post(this.apiUrl,formData
    );
  }

  update(
    id: number,
    libro: any
  ) {

    return this.http.put(`${this.apiUrl}/${id}`, libro);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  crearLibro(data: {
  titulo: string;
  autor: string;
  editorial: string;
  sinopsis: string;
  isbn: string;
  anio: number;
  stock: number;
  categoriaId: number | null;
  estado: boolean;
  imagen: File | null;
}) {

  const formData = new FormData();

  formData.append('Titulo', data.titulo);
  formData.append('Autor', data.autor);
  formData.append('Editorial', data.editorial);
  formData.append('Sinopsis', data.sinopsis);
  formData.append('ISBN', data.isbn);
  formData.append('Anio', data.anio.toString());
  formData.append('Stock', data.stock.toString());
  formData.append('Estado', String(data.estado));
  if (data.categoriaId) {

  formData.append(
    'CategoriaId',
    data.categoriaId.toString()
  );

}

  if (data.imagen) {
    formData.append('Imagen', data.imagen);
  }

  return this.http.post(
    this.apiUrl,
    formData
  );
}
getLibro(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

editarLibro(id: number, data: any) {

  const formData = new FormData();

  formData.append('Titulo', data.titulo);
formData.append('Autor', data.autor);
formData.append('Editorial', data.editorial);
formData.append('Sinopsis', data.sinopsis);
formData.append('ISBN', data.isbn);
formData.append('Anio', data.anio.toString());
formData.append('Stock', data.stock.toString());
formData.append('Estado', String(data.estado));

formData.append(
  'CategoriaId',
  data.categoriaId == null
    ? ''
    : data.categoriaId.toString()
);

if (data.imagen) {
  formData.append('Imagen', data.imagen);
}

  return this.http.put(
    `${this.apiUrl}/${id}`,
    formData
  );
}

getAll() {

  return this.http.get<Libro[]>(
    this.apiUrl
  );

}

eliminarLibro(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}