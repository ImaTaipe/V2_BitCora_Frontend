import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../../../core/services/usuarios';


@Component({
  selector: 'app-nuevo-usuario',
  imports: [FormsModule],
  templateUrl: './nuevo-usuario.html',
  styleUrl: './nuevo-usuario.css',
})
export class NuevoUsuario {

  usuario = {

    nombreCompleto: '',

    correo: '',

    password: '',

    rol: 'Lector',

    telefono: '',

    direccion: ''

  };

  constructor(
    private usuariosService: Usuarios,
    private router: Router
  ) {}

  guardar() {

  if (
    !this.usuario.nombreCompleto.trim() ||
    !this.usuario.correo.trim() ||
    !this.usuario.password.trim() ||
    !this.usuario.telefono.trim() ||
    !this.usuario.direccion.trim()
  ) {

    alert(
      'Todos los campos son obligatorios'
    );

    return;
  }

  this.usuariosService
    .create(this.usuario)
    .subscribe(() => {

      alert(
        'Usuario creado'
      );

      this.router.navigate(
        ['/usuarios']
      );

    });

}

}