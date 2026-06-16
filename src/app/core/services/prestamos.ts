import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Prestamos {

  private apiUrl =
    `${environment.apiUrl}/prestamos`;

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<any[]>(
      this.apiUrl
    );
  }

  crear(data: any) {
    return this.http.post(
      this.apiUrl,
      data
    );
  }

  devolver(id: number) {
    return this.http.put(
      `${this.apiUrl}/devolver/${id}`,
      {}
    );
  }
  getActivosUsuario(usuarioId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/activos-usuario/${usuarioId}`
  );
}
}