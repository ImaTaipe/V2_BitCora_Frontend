import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prestamos } from '../../../core/services/prestamos';
import { Resenas } from '../../../core/services/resenas';

@Component({
  selector: 'app-nueva-resena',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './nueva-resena.html',
  styleUrl: './nueva-resena.css',
})
export class NuevaResena
implements OnInit {

  libros =
    signal<any[]>([]);

  libroId = 0;

  comentario = '';

  estrellas = 5;

  constructor(
    private prestamosService:
      Prestamos,

    private resenasService:
      Resenas
  ) {}

  ngOnInit(): void {

    this.prestamosService
      .getMisLibrosResenables()
      .subscribe(data => {

        this.libros.set(data);

      });
  }

  guardar() {

    this.resenasService
      .crear({

        libroId:
          this.libroId,

        comentario:
          this.comentario,

        estrellas:
          this.estrellas

      })
      .subscribe(() => {

        alert(
          'Reseña registrada'
        );

      });
  }
}