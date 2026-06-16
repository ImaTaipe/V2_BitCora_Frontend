import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Usuarios {

  private apiUrl =
    `${environment.apiUrl}/usuarios`;

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<any[]>(
      this.apiUrl
    );
  }

  getById(id: number) {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );
  }
}