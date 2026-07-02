import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';

import { Categorias } from '../../../core/services/categorias';

@Component({
  selector: 'app-editar-categoria',
  imports: [FormsModule],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css',
})
export class EditarCategoria implements OnInit {

  id = 0;

  categoria: any = {
    nombre: '',
    estado: true
  };

  constructor(
    private route: ActivatedRoute,
    private categoriasService: Categorias,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.categoriasService
      .getById(this.id)
      .subscribe(data => {
        this.categoria = data;
      });
  }

  guardar() {

    this.categoriasService
      .update(
        this.id,
        this.categoria
      )
      .subscribe(() => {

        alert(
          'Categoría actualizada'
        );

        this.router.navigate(
          ['/categorias']
        );

      });
  }
}