import { Component, signal, OnInit } from '@angular/core';
import { Prestamos } from '../../../core/services/prestamos';
import { Router } from '@angular/router';
import { LibrosService } from '../../../core/services/libros';
import { Usuarios } from '../../../core/services/usuarios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-prestamo',
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-prestamo.html',
  styleUrl: './nuevo-prestamo.css',
})
export class NuevoPrestamo
implements OnInit {

  usuarios = signal<any[]>([]);
  libros = signal<any[]>([]);
  usuarioId = 0;

  libroId = 0;
  fechaDevolucion = '';
  constructor(
    private prestamos: Prestamos,

    private usuariosService: Usuarios,

    private librosService: LibrosService,

    private router: Router
  ) {}

  ngOnInit(): void {

  this.usuariosService
  .getAll()
  .subscribe(data => {

    const lectores = data.filter(
      (u: any) => u.rol === 'Lector'
    );

    this.usuarios.set(lectores);
  });

  this.librosService .getAll() .subscribe(data => { this.libros.set(data); });

}

  guardar() {

    this.prestamos
    .crear({

      usuarioId:
        this.usuarioId,

      libroId:
        this.libroId,

      fechaDevolucionMaxima:this.fechaDevolucion

    })
      .subscribe(() => {

        alert(
          'Préstamo registrado'
        );

        this.router.navigate(
          ['/prestamos']
        );

      });

  }
}