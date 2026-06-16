import { Component, OnInit, signal, computed } from '@angular/core';
import { Multas } from '../../../core/services/multas';
import { CommonModule, DatePipe } from '@angular/common';
import { Auth } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lista-multas',
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [DatePipe],
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

  constructor(
    private multasService: Multas, 
    public auth: Auth,
    private datePipe: DatePipe
  ) {}

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

  generarPdf() {
    const doc = new jsPDF();
    const ahora = new Date();
    
    const fechaImpresion = ahora.toLocaleDateString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
    const horaImpresion = !isNaN(ahora.getTime()) ? ahora.toLocaleTimeString('es-PE', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }) : '';

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80);
    doc.text('BitCoraPerú', 14, 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    doc.text('Gestor de Biblioteca Automático', 14, 24);

    doc.setFontSize(9);
    doc.text(`Fecha: ${fechaImpresion}`, 196, 18, { align: 'right' });
    doc.text(`Hora: ${horaImpresion}`, 196, 24, { align: 'right' });

    doc.setDrawColor(231, 76, 60);
    doc.setLineWidth(1);
    doc.line(14, 28, 196, 28);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(52, 73, 94);
    doc.text('REPORTE DE MULTAS', 14, 38);

    autoTable(doc, {
      startY: 43,
      head: [[
        'Usuario', 
        'Libro', 
        'Monto', 
        'Motivo', 
        'Fecha Emisión', 
        'Estado'
      ]],
      body: this.multasFiltradas().map(m => [
        m.usuario,
        m.libro || '-',
        `S/ ${m.monto}`,
        m.motivo,
        this.datePipe.transform(m.fechaEmision, 'dd/MM/yyyy') || '',
        m.estado
      ]),
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      margin: { top: 43, left: 14, right: 14 }
    });

    doc.save(`reporte-multas-filtrado-${fechaImpresion.replace(/\//g, '-')}.pdf`);
  }
}