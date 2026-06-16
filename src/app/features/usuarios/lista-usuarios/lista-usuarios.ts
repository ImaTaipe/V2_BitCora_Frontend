import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../../core/services/usuarios';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios
implements OnInit {

  usuarios =
    signal<any[]>([]);

  constructor(
    private usuariosService:
      Usuarios
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.usuariosService
      .getAll()
      .subscribe(data => {

        this.usuarios.set(data);

      });

  }

  eliminar(id: number) {

    if (
      !confirm(
        '¿Eliminar usuario?'
      )
    )
      return;

    this.usuariosService
      .delete(id)
      .subscribe(() => {

        this.cargar();

      });

  }

}