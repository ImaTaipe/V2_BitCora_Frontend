import { CommonModule } from '@angular/common';
import { Component, computed, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../../core/services/libros';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';



@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit{

  filtro =
    signal('');

  constructor(
    public librosService:
      LibrosService,
      public authService: Auth
  ) {}

  ngOnInit(): void { 
    console.log(
    'ROL:',
    this.authService.getRol()
  );
    this.librosService
      .cargarLibros();
  }

  librosFiltrados =
    computed(() => {

      const texto =
        this.filtro()
          .toLowerCase();

      return this.librosService
        .libros()
        .filter(x =>

          x.titulo
            .toLowerCase()
            .includes(texto)

          ||

          x.autor
            .toLowerCase()
            .includes(texto)
        );
    });

  obtenerImagen(
    url?: string
  ) {

    if (!url)
      return '';

    if (
      url.startsWith(
        'http'
      )
    )
      return url;

    return `https://localhost:7220${url}`;
  }

  eliminar(id: number) {
  if (!confirm('¿Seguro que deseas eliminar este libro?')) return;

  this.librosService.eliminarLibro(id)
    .subscribe(() => {
      this.librosService.cargarLibros();
    });
}
}