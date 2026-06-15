import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class dashboardService {

  private apiUrl =
    `${environment.apiUrl}/dashboard`;

  adminData =
    signal<any>(null);

  bibliotecarioData =
    signal<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  cargarDashboardAdmin() {

    return this.http.get<any>(
      `${this.apiUrl}/admin`
    );
  }

  cargarDashboardBibliotecario() {

    return this.http.get<any>(
      `${this.apiUrl}/bibliotecario`
    );
  }
}