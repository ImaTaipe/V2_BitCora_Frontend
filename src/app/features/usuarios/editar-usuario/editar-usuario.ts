import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from '../../../core/services/usuarios';


@Component({
  selector: 'app-editar-usuario',
  imports: [FormsModule],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css',
})
export class EditarUsuario
implements OnInit {

  id = 0;

  usuario: any = {
    nombreCompleto: '',
    correo: '',
    rol: '',
    telefono: '',
    direccion: '',
    estado: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: Usuarios
  ) {}

  ngOnInit(): void {

    this.id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.usuariosService
      .getById(this.id)
      .subscribe(data => {

        this.usuario = data;

      });

  }

  guardar() {

    if (
      !this.usuario.nombreCompleto.trim() ||
      !this.usuario.correo.trim() ||
      !this.usuario.telefono.trim() ||
      !this.usuario.direccion.trim()
    ) {

      alert(
        'Todos los campos son obligatorios'
      );

      return;
    }

    this.usuariosService
      .update(
        this.id,
        this.usuario
      )
      .subscribe(() => {

        alert(
          'Usuario actualizado'
        );

        this.router.navigate(
          ['/usuarios']
        );

      });

  }

}