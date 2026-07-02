import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../../../core/services/libros';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-libro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-libro.html',
  styleUrl: './editar-libro.css',
})
export class EditarLibro implements OnInit {

  libro: any = null; 
  imagen: File | null = null;
  imagenPreview: string | null = null;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.librosService.getLibro(this.id).subscribe({
      next: (data) => {
        this.libro = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('La API falló al traer el libro:', err);
        this.libro = { id: 0 }; 
        this.cdr.detectChanges();
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.imagen = file;

      // 💡 Generar la vista previa en tiempo real
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string; // Guarda la imagen en formato base64
        this.cdr.detectChanges(); // Forzamos a Angular a redibujar la imagen preview
      };
      reader.readAsDataURL(file);
    }
  }

  guardar() {

  const payload = {
    ...this.libro,
    imagen: this.imagen
  };

  this.librosService
    .editarLibro(
      this.id,
      payload
    )
    .subscribe({
      next: () => {
        alert(
          'Libro actualizado con éxito'
        );
        this.router.navigate(
          ['/libros']
        );
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}
