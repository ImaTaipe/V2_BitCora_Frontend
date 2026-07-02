import { Component, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  correo = signal('');

  password = signal('');

  loading = signal(false);

  error = signal('');

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  iniciarSesion() {

    this.error.set('');

    this.loading.set(true);

    this.auth.login(
      this.correo(),
      this.password()
    )
    .subscribe({

      next: (response) => {

        this.auth.saveSession(
          response
        );

        this.loading.set(false);

        this.router.navigate(
          ['/dashboard']
        );
      },

      error: () => {

        this.loading.set(false);

        this.error.set(
          'Correo o contraseña incorrectos'
        );
      }
    });
  }
}