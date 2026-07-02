import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../../core/services/libros';
import { RouterLink, Router } from '@angular/router';
import { Categorias } from '../../../core/services/categorias';


@Component({
  selector: 'app-nuevo-libro',
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './nuevo-libro.html',
  styleUrl: './nuevo-libro.css',
})
export class NuevoLibro implements OnInit {

  libro = {
    titulo: '',
    autor: '',
    editorial: '',
    sinopsis: '',
    isbn: '',
    anio: 0,
    stock: 0,
    categoriaId: null,
    estado: true
  };
  categorias = signal<any[]>([]);

  imagen: File | null = null;
  imagenPreview: string | null = null;

  constructor(
    private librosService: LibrosService,
    private categoriasService: Categorias,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoriasService
      .getAll()
      .subscribe(data => {
        this.categorias.set(data);
      });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.imagen = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      this.imagen = null;
      this.imagenPreview = null;
      this.cdr.detectChanges();
    }
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