import { Component, OnInit, signal } from '@angular/core';
import { Categorias } from '../../../core/services/categorias';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado-categorias',
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-categorias.html',
  styleUrl: './listado-categorias.css',
})
export class ListadoCategorias implements OnInit {

  categorias = signal<any[]>([]);

  constructor(
    private categoriasService: Categorias
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
  this.categoriasService
    .getAll()
    .subscribe(data => {
      const ordenado = [...data].sort((a, b) => a.id - b.id);
      this.categorias.set(ordenado);
    });
}

  eliminar(id: number) {

    if (!confirm(
      '¿Deseas eliminar esta categoría?'
    )) {
      return;
    }

    this.categoriasService
      .delete(id)
      .subscribe(() => {
        this.cargar();
      });
  }
}