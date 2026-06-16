import { Component, signal, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prestamos } from '../../../core/services/prestamos';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';


@Component({
  selector: 'app-lista-prestamos',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-prestamos.html',
  styleUrl: './lista-prestamos.css',
})
export class ListaPrestamos
implements OnInit {

  prestamos =
    signal<any[]>([]);

  constructor(
  private prestamosService:
    Prestamos,

  public auth:
    Auth
) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.prestamosService
      .getAll()
      .subscribe(data => {

        this.prestamos.set(
          data
        );

      });

  }

  devolver(id: number) {

    if (!confirm(
      '¿Registrar devolución?'
    ))
      return;

    this.prestamosService
      .devolver(id)
      .subscribe(() => {

        this.cargar();

      });
  }
}