import { Component, OnInit, signal, computed } from '@angular/core';
import { Multas } from '../../../core/services/multas';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-multas',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-multas.html',
  styleUrl: './lista-multas.css',
})
export class ListaMultas implements OnInit {
  filtro = signal('');
  desde = signal('');
  hasta = signal('');
  multas = signal<any[]>([]);

  multasFiltradas = computed(() => {
    let lista = this.multas();
    const texto = this.filtro().toLowerCase().trim();
    const fechaDesde = this.desde();
    const fechaHasta = this.hasta();
    if (texto) {
      lista = lista.filter(m => (m.usuario && m.usuario.toLowerCase().includes(texto)) || (m.libro && m.libro.toLowerCase().includes(texto)));
    }
    if (fechaDesde) {
      lista = lista.filter(m => m.fechaEmision.split('T')[0] >= fechaDesde);
    }
    if (fechaHasta) {
      lista = lista.filter(m => m.fechaEmision.split('T')[0] <= fechaHasta);
    }
    return lista;
  });
  constructor(private multasService: Multas, public auth: Auth) {}
  ngOnInit(): void {
    this.cargar();
  }
  cargar() {
    this.multasService.getAll().subscribe(data => this.multas.set(data));
  }
  pagar(id: number) {
    if (!confirm('¿Registrar pago?')) return;
    this.multasService.pagar(id).subscribe(() => this.cargar());
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar multa?')) return;
    this.multasService.eliminar(id).subscribe(() => this.cargar());
  }
}