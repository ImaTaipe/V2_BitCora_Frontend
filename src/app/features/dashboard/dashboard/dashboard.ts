import { Component, signal, OnInit} from '@angular/core';
import { dashboardService } from '../../../core/services/dashboard';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {

  rol =
    signal('');

  admin =
    signal<any>(null);

  bibliotecario =
    signal<any>(null);

  constructor(
    private dashboardService:
      dashboardService
  ) { }

  ngOnInit(): void {

    const user =
      JSON.parse(
        localStorage.getItem(
          'user'
        ) || '{}'
      );

    this.rol.set(
      user.rol
    );

    if (
      user.rol ===
      'Administrador'
    ) {

      this.dashboardService
        .cargarDashboardAdmin()
        .subscribe(data => {

          this.admin.set(
            data
          );

        });
    }

    if (
      user.rol ===
      'Bibliotecario'
    ) {

      this.dashboardService
        .cargarDashboardBibliotecario()
        .subscribe(data => {

          this.bibliotecario.set(
            data
          );

        });
    }
  }
}