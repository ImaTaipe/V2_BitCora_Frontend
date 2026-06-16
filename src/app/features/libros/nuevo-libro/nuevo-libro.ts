import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../../core/services/libros';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-libro',
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './nuevo-libro.html',
  styleUrl: './nuevo-libro.css',
})
export class NuevoLibro {

  libro = {
    titulo: '',
    autor: '',
    editorial: '',
    sinopsis: '',
    isbn: '',
    anio: 0,
    stock: 0,
    estado: true
  };

  imagen: File | null = null;
  constructor(
    private librosService: LibrosService,
    private router: Router
  ) {}

  onFileChange(event: any) {
    this.imagen = event.target.files[0];
  }

  guardar() {
    this.librosService.crearLibro({
      ...this.libro,
      imagen: this.imagen
    }).subscribe(() => {
      alert('Libro creado correctamente');
      this.router.navigate(['/libros']);
    });
  }
}