import { Component, signal, OnInit } from '@angular/core';
import { dashboardService } from '../../../core/services/dashboard';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Resenas } from '../../../core/services/resenas';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',imports: [
  CommonModule,
  RouterLink,
  FormsModule
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  rol = signal('');
  admin = signal<any>(null);
  bibliotecario = signal<any>(null);
  lector = signal<any>(null);
  resenaLibroId = signal<number | null>(null);
  comentario = '';
  estrellas = 5;

 constructor(
  private dashboardService: dashboardService,
  private resenasService: Resenas
) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.rol.set(user.rol);

    if (user.rol === 'Administrador') {
      this.dashboardService.cargarDashboardAdmin().subscribe(data => this.admin.set(data));
    }
    if (user.rol === 'Bibliotecario') {
      this.dashboardService.cargarDashboardBibliotecario().subscribe(data => this.bibliotecario.set(data));
    }
    if (user.rol === 'Lector') { this.dashboardService .cargarDashboardLector().subscribe(data => {this.lector.set(data);
    console.log('Estructura Dashboard Lector:', data);});
    }
  }
  abrirResena(libroId: number) {

  if (this.resenaLibroId() === libroId) {
    this.resenaLibroId.set(null);
    return;
  }
  this.resenaLibroId.set(libroId);
  this.comentario = '';
  this.estrellas = 5;
  }

  guardarResena(libroId: number) {

  this.resenasService
    .crear({
      libroId: libroId,
      comentario: this.comentario,
      estrellas: this.estrellas
    })
    .subscribe({
      next: () => {

        alert('Reseña registrada');

        this.resenaLibroId.set(null);
        this.dashboardService
  .cargarDashboardLector()
  .subscribe(data => {

    this.lector.set(data);

  });

      },
      error: err => {

        console.error(err);

        alert('No se pudo registrar');

      }
    });

}
obtenerImagen(url?: string) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://localhost:7220${url}`;
  }
}