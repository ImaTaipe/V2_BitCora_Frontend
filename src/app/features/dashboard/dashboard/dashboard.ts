import {Component,signal,OnInit,AfterViewInit,ElementRef,ViewChild} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { dashboardService } from '../../../core/services/dashboard';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Resenas } from '../../../core/services/resenas';
import { FormsModule } from '@angular/forms';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {

  rol = signal('');
  admin = signal<any>(null);
  bibliotecario = signal<any>(null);
  lector = signal<any>(null);
  resenaLibroId = signal<number | null>(null);
  comentario = '';
  estrellas = 5;
  @ViewChild('chartTopLibros')
  chartTopLibrosRef!: ElementRef;
  @ViewChild('chartUsuarios')
  chartUsuariosRef!: ElementRef;
  @ViewChild('chartPrestamosMes')
  chartPrestamosMesRef!: ElementRef;
  @ViewChild('chartEstadoLibros')
  chartEstadoLibrosRef!: ElementRef;

  constructor(
    private dashboardService: dashboardService,
    private resenasService: Resenas
  ) {}

  ngOnInit(): void {

    const user =
      JSON.parse(
        localStorage.getItem('user') || '{}'
      );

    this.rol.set(user.rol);

    if (user.rol === 'Administrador') {

      this.dashboardService
        .cargarDashboardAdmin()
        .subscribe(data => {

          this.admin.set(data);

          setTimeout(() => {

            this.initTopLibrosChart();

            this.initUsuariosChart();

            this.initPrestamosMesChart();

            this.initEstadoLibrosChart();

          });

        });
    }

    if (user.rol === 'Bibliotecario') {

      this.dashboardService
        .cargarDashboardBibliotecario()
        .subscribe(data =>
          this.bibliotecario.set(data)
        );
    }

    if (user.rol === 'Lector') {

      this.dashboardService
        .cargarDashboardLector()
        .subscribe(data => {

          this.lector.set(data);

          console.log(
            'Estructura Dashboard Lector:',
            data
          );

        });
    }
  }

  ngAfterViewInit() {}

  initUsuariosChart() {

  if (!this.chartUsuariosRef) return;

  const labels =
    this.admin()?.usuariosSancionadosLabels ?? [];

  const cantidades =
    this.admin()?.usuariosSancionadosCantidad ?? [];

  new Chart(
    this.chartUsuariosRef.nativeElement,
    {
      type: 'bar',

      data: {

        labels: labels,

        datasets: [
          {
            label: 'Cantidad de multas',

            data: cantidades,

            backgroundColor: '#D95B5B',

            borderRadius: 8
          }
        ]
      },

      options: {

        indexAxis: 'y',

        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false
          }
        },

        scales: {

          x: {
            beginAtZero: true
          }
        }
      }
    }
  );
}

  initTopLibrosChart() {

    if (!this.chartTopLibrosRef) return;

    const labels =
      this.admin()?.topLibrosLabels ?? [];

    const cantidades =
      this.admin()?.topLibrosCantidad ?? [];

    new Chart(
      this.chartTopLibrosRef.nativeElement,
      {
        type: 'bar',

        data: {

          labels: labels,

          datasets: [
            {
              label: 'Solicitudes',

              data: cantidades,

              backgroundColor:
                '#40405C',

              borderRadius: 10
            }
          ]
        },

        options: {

          plugins: {
            legend: {
              display: false
            }
          },

          responsive: true,

          maintainAspectRatio: false
        }
      }
    );
  }

  initPrestamosMesChart() {

    if (!this.chartPrestamosMesRef)
      return;

    new Chart(
      this.chartPrestamosMesRef.nativeElement,
      {
        type: 'line',

        data: {

          labels:
            this.admin()?.mesesPrestamos ?? [],

          datasets: [
            {
              label: 'Préstamos',

              data:
                this.admin()?.prestamosPorMes ?? [],

              borderColor:
                '#40405C',

              backgroundColor:
                'rgba(64,64,92,.15)',

              fill: true,

              tension: 0.4
            }
          ]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false
        }
      }
    );
  }

  initEstadoLibrosChart() {

    if (!this.chartEstadoLibrosRef)
      return;

    new Chart(
      this.chartEstadoLibrosRef.nativeElement,
      {
        type: 'doughnut',

        data: {

          labels: [
            'Disponibles',
            'Prestados'
          ],

          datasets: [
            {
              data: [

                this.admin()?.librosDisponibles ?? 0,

                this.admin()?.librosPrestados ?? 0

              ],

              backgroundColor: [
                '#4F8A67',
                '#D95B5B'
              ]
            }
          ]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false
        }
      }
    );
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
        libroId,
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

          alert(
            'No se pudo registrar'
          );
        }
      });
  }

  obtenerImagen(url?: string) {

    if (!url) return '';

    if (url.startsWith('http'))
      return url;

    return `https://localhost:7220${url}`;
  }
}