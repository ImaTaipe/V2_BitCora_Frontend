import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core'; // 💡 Importado ChangeDetectorRef
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
  imagenPreview: string | null = null; // Variable para almacenar el base64 de la imagen

  constructor(
    private librosService: LibrosService,
    private router: Router,
    private cdr: ChangeDetectorRef // 💡 Inyectado en el constructor
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.imagen = file;

      // 💡 Generar la vista previa en tiempo real
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string; 
        this.cdr.detectChanges(); // ✨ Forzamos a Angular a redibujar el DOM con la nueva previsualización
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