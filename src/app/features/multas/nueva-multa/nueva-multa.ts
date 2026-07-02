import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Prestamos } from '../../../core/services/prestamos';
import { Usuarios } from '../../../core/services/usuarios';
import { Multas } from '../../../core/services/multas';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nueva-multa',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './nueva-multa.html',
  styleUrl: './nueva-multa.css',
})
export class NuevaMulta implements OnInit {
  usuarios = signal<any[]>([]);
  prestamos = signal<any[]>([]);
  usuarioId = 0; prestamoId = 0; monto = 0;
  motivo = ''; otroMotivo = ''; filtro = ''; desde = ''; hasta = '';

  constructor(
    private prestamosService: Prestamos,
    private usuariosService: Usuarios,
    private multasService: Multas,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuariosService
  .getAll()
  .subscribe(data => {

    const lectores = data.filter(
      (u: any) => u.rol === 'Lector'
    );

    this.usuarios.set(lectores);
  });
  }

  onUsuarioChange() {
    this.prestamosService.getActivosUsuario(this.usuarioId).subscribe(data => this.prestamos.set(data));
  }

  guardar() {
    const motivoFinal = this.motivo === 'Otro' ? this.otroMotivo.trim() : this.motivo;
    if (this.usuarioId === 0 || this.prestamoId === 0 || !motivoFinal || this.monto <= 0) {
      alert('Por favor, complete todos los campos correctamente.'); return;
    }
    this.multasService.crear({ usuarioId: this.usuarioId, prestamoId: this.prestamoId, monto: this.monto, motivo: motivoFinal }).subscribe({
      next: () => { alert('Multa registrada'); this.router.navigate(['/multas']); },
      error: (err) => { console.error(err); alert('Error al registrar la multa'); }
    });
  }

  cambiarMotivo() {
    switch(this.motivo) {
      case 'Retraso': this.monto = 5; break;
      case 'Daño de material': this.monto = 20; break;
      case 'Manchas o rayones': this.monto = 10; break;
      case 'Pérdida de libro': this.monto = 50; break;
      default: this.monto = 0; break;
    }
  }
}