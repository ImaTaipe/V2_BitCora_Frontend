import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resenas } from '../../../core/services/resenas';
import { Auth } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-resenas',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-resenas.html',
  styleUrl: './lista-resenas.css',
})
export class ListaResenas implements OnInit{
  filtro = signal('');
  desde = signal('');
  especifica = signal('');
  resenas = signal<any[]>([]);

  resenasFiltradas = computed(() => {
    let lista = this.resenas();
    const texto = this.filtro().toLowerCase().trim();
    const fechaDesde = this.desde();
    const fechaEspecifica = this.especifica();

    if (texto) {
      lista = lista.filter(r => (r.usuario && r.usuario.toLowerCase().includes(texto)) || (r.libro && r.libro.toLowerCase().includes(texto)));
    }
    if (fechaDesde) {
      lista = lista.filter(r => r.fecha.split('T')[0] >= fechaDesde);
    }
    if (fechaEspecifica) {
      lista = lista.filter(r => r.fecha.split('T')[0] === fechaEspecifica);
    }
    return lista;
  });

  constructor(
    private resenasService: Resenas,
    public auth: Auth
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.resenasService.getAll().subscribe(data => this.resenas.set(data));
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar reseña?')) return;
    this.resenasService.eliminar(id).subscribe(() => this.cargar());
  }
}