import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Resenas {

  private apiUrl =
    `${environment.apiUrl}/resenas`;

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<any[]>(
      this.apiUrl
    );
  }

  getByLibro(libroId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/libro/${libroId}`
    );
  }

  crear(data: any) {
    return this.http.post(
      this.apiUrl,
      data
    );
  }

  eliminar(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}