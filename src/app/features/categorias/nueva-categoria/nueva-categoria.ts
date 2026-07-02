import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Categorias } from '../../../core/services/categorias';

@Component({
  selector: 'app-nueva-categoria',
  imports: [ FormsModule],
  templateUrl: './nueva-categoria.html',
  styleUrl: './nueva-categoria.css',
})
export class NuevaCategoria {

  nombre = '';

  constructor(
    private categoriasService: Categorias,
    private router: Router
  ) {}

  guardar() {

    this.categoriasService
      .create({
        nombre: this.nombre
      })
      .subscribe(() => {

        alert(
          'Categoría registrada'
        );

        this.router.navigate(
          ['/categorias']
        );

      });
  }
}