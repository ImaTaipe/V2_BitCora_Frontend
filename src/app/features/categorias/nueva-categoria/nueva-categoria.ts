import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Categorias } from '../../../core/services/categorias';
import { LibrosService } from '../../../core/services/libros';
import { Libro } from '../../../core/models/libro.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-nueva-categoria',
  imports: [ FormsModule],
  templateUrl: './nueva-categoria.html',
  styleUrl: './nueva-categoria.css',
})
export class NuevaCategoria implements OnInit {

  nombre = '';

  mostrarLibros = false;

  libros: Libro[] = [];

  librosSeleccionados: number[] = [];

  errorNombre = '';

  constructor(
    private categoriasService: Categorias,
    private librosService: LibrosService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.librosService
      .getAll()
      .subscribe(libros => {

        this.libros = libros;

      });

  }

  toggleLibro(id: number) {

    const existe =
      this.librosSeleccionados.includes(id);

    if (existe) {

      this.librosSeleccionados =
        this.librosSeleccionados
          .filter(x => x !== id);

    }
    else {

      this.librosSeleccionados.push(id);

    }

  }

  estaSeleccionado(id: number) {

    return this.librosSeleccionados
      .includes(id);

  }

  guardar() {

  const nombreNormalizado = this.nombre.trim().toLowerCase();

  this.categoriasService.getAll().subscribe(categorias => {

    const existe = categorias.some(c =>
      c.nombre.trim().toLowerCase() === nombreNormalizado
    );

    if (existe) {
      this.errorNombre = 'Ya existe una categoría con este nombre';
      return;
    }

    this.errorNombre = '';

    // 👉 continuar con tu lógica actual
    this.categoriasService
      .create({ nombre: this.nombre })
      .subscribe((categoria: any) => {

        if (!this.mostrarLibros || this.librosSeleccionados.length === 0) {

          alert('Categoría registrada');

          this.router.navigate(['/categorias']);
          return;
        }

        const peticiones = this.librosSeleccionados.map(id => {

          const libro = this.libros.find(x => x.id === id);

          return this.librosService.editarLibro(id, {
            ...libro,
            categoriaId: categoria.id
          });

        });

        forkJoin(peticiones).subscribe(() => {

          alert('Categoría creada y libros asignados');

          this.router.navigate(['/categorias']);
        });

      });

  });
}
cancelar() {
  this.router.navigate(['/categorias']);
}
}