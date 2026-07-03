import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import { Categorias } from '../../../core/services/categorias';


@Component({
  selector: 'app-editar-categoria',
  imports: [FormsModule],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css',
})
export class EditarCategoria implements OnInit {

  id = 0;
  errorNombre = '';
  

  categoria: any = null;

  constructor(
  private route: ActivatedRoute,
  private categoriasService: Categorias,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.categoriasService
  .getById(this.id)
  .subscribe(data => {

    console.log('Categoria recibida:', data);

    this.categoria = data;

    this.cdr.detectChanges();

  });
  }

  guardar() {

  const nombreNormalizado = this.categoria.nombre.trim().toLowerCase();

  this.categoriasService.getAll().subscribe(categorias => {

    const existe = categorias.some(c =>
      c.nombre.trim().toLowerCase() === nombreNormalizado &&
      c.id !== this.id // 👈 clave: excluir la misma categoría
    );

    if (existe) {
      this.errorNombre = 'Ya existe una categoría con este nombre';
      return;
    }

    this.errorNombre = '';

    this.categoriasService
      .update(this.id, this.categoria)
      .subscribe(() => {

        alert('Categoría actualizada');

        this.router.navigate(['/categorias']);

      });

  });

}
cancelar() {
  this.router.navigate(['/categorias']);
}
}