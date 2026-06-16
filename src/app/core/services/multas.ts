import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Multas {

  private apiUrl =
    `${environment.apiUrl}/multas`;

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

  pagar(id: number) {
    return this.http.put(
      `${this.apiUrl}/pagar/${id}`,
      {}
    );
  }

  eliminar(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}