import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Categorias {

  private apiUrl =
    `${environment.apiUrl}/categorias`;

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<Categoria[]>(
      this.apiUrl
    );
  }

  getById(id: number) {
    return this.http.get<Categoria>(
      `${this.apiUrl}/${id}`
    );
  }

  create(data: any) {
    return this.http.post(
      this.apiUrl,
      data
    );
  }

  update(
    id: number,
    data: any
  ) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  delete(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}