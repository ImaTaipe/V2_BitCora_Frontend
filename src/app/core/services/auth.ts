import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl =
    `${environment.apiUrl}/auth`;

  private currentUserSignal =
    signal<any>(
      JSON.parse(
        localStorage.getItem('user') || 'null'
      )
    );

  currentUser =
    computed(() =>
      this.currentUserSignal()
    );

  isLoggedIn =
    computed(() =>
      !!this.currentUserSignal()
    );

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(
    correo: string,
    password: string
  ) {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        correo,
        password
      }
    );
  }

  saveSession(
    response: any
  ) {
    localStorage.setItem(
      'token',
      response.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(response)
    );

    this.currentUserSignal.set(
      response
    );
  }

  logout() {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'user'
    );

    this.currentUserSignal.set(
      null
    );

    this.router.navigate(
      ['/login']
    );
  }

  puedeGestionarPrestamos(): boolean {

  return (
    this.getRol() === 'Administrador'
    ||
    this.getRol() === 'Bibliotecario'
  );

}

  getToken() {
    return localStorage.getItem(
      'token'
    );
  }
  getRol(): string {
  return this.currentUserSignal()?.rol ?? '';
}

esAdministrador(): boolean {
  return this.getRol() === 'Administrador';
}

esBibliotecario(): boolean {
  return this.getRol() === 'Bibliotecario';
} 
}