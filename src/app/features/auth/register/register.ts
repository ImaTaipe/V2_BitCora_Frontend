import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register  {

  nombreCompleto = signal('');
  correo = signal('');
  password = signal('');
  confirmarPassword = signal('');
  telefono = signal('');
  direccion = signal('');

  error = signal('');

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  registrar() {
    this.error.set('');

    if (this.password() !== this.confirmarPassword()) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }

    this.auth.register({
      nombreCompleto: this.nombreCompleto(),
      correo: this.correo(),
      password: this.password(),
      telefono: this.telefono(),
      direccion: this.direccion()
    })
    .subscribe({
      next: response => {
        this.auth.saveSession(response);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.error.set(err.error || 'Ocurrió un error al registrar el usuario');
      }
    });
  }
}