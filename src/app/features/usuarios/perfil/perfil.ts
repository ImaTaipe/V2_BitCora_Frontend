import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  nombreCompleto = signal('');
  correo = signal('');
  telefono = signal('');
  direccion = signal('');

  mensaje = signal('');
  //
  mostrarModal = signal(false);
  passwordActual = signal('');
passwordNueva = signal('');
confirmarPassword = signal('');
  //
  mensajePassword = signal('');
errorPassword = signal('');

  constructor(
    private http: HttpClient,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.http.get<any>(`${this.apiUrl}/perfil`)
      .subscribe({
        next: (data) => {
          this.nombreCompleto.set(data.nombreCompleto);
          this.correo.set(data.correo);
          this.telefono.set(data.telefono ?? '');
          this.direccion.set(data.direccion ?? '');
        }
      });
  }

  guardar() {

    this.http.put(
      `${this.apiUrl}/perfil`,
      {
        nombreCompleto: this.nombreCompleto(),
        telefono: this.telefono(),
        direccion: this.direccion()
      }
    )
    .subscribe({
      next: () => {
        this.mensaje.set('Perfil actualizado correctamente');
      }
    });
  }
  abrirModal() {
    this.errorPassword.set('');
    this.mensajePassword.set('');
    this.mostrarModal.set(true);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
    this.passwordActual.set('');
    this.passwordNueva.set('');
    this.confirmarPassword.set('');
  }
  cambiarPassword() {

  this.errorPassword.set('');
  this.mensajePassword.set('');

  if (
    this.passwordNueva() !==
    this.confirmarPassword()
  ) {
    this.errorPassword.set(
      'Las contraseñas no coinciden'
    );
    return;
  }

  if (
    this.passwordNueva().length < 6
  ) {
    this.errorPassword.set(
      'La contraseña debe tener al menos 6 caracteres'
    );
    return;
  }

  this.auth
    .cambiarPassword(
      this.passwordActual(),
      this.passwordNueva()
    )
    .subscribe({
      next: () => {

        this.mensajePassword.set(
          'Contraseña actualizada correctamente'
        );

        this.passwordActual.set('');
        this.passwordNueva.set('');
        this.confirmarPassword.set('');

        setTimeout(() => {
            this.cerrarModal();
          }, 1500);
        },

      error: () => {

        this.errorPassword.set(
          'La contraseña actual es incorrecta'
        );
      }
    });
}
}