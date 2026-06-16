import { Component, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // 📄 Importamos DatePipe
import { Prestamos } from '../../../core/services/prestamos';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lista-prestamos',
  imports: [CommonModule, RouterLink],
  providers: [DatePipe],
  templateUrl: './lista-prestamos.html',
  styleUrl: './lista-prestamos.css',
})
export class ListaPrestamos implements OnInit {

  prestamos = signal<any[]>([]);

  constructor(
    private prestamosService: Prestamos,
    public auth: Auth,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.prestamosService
      .getAll()
      .subscribe(data => {
        this.prestamos.set(data);
      });
  }

  devolver(id: number) {
    if (!confirm('¿Registrar devolución?')) return;

    this.prestamosService
      .devolver(id)
      .subscribe(() => {
        this.cargar();
      });
  }

  generarPdf() {
  const doc = new jsPDF();
  const ahora = new Date();
  const fechaImpresion = ahora.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const horaImpresion = ahora.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
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
  doc.setFontSize(14);
  doc.setTextColor(52, 73, 94);
  doc.text('REPORTE GENERAL DE PRÉSTAMOS ACTIVOS', 14, 38);

  autoTable(doc, {
    startY: 43,
    head: [[
      'Libro', 
      'Usuario', 
      'F. Préstamo', 
      'F. Máxima', 
      'Estado', 
      'Alerta'
    ]],
    body: this.prestamos().map(p => [
      p.libro,
      p.usuario,
      this.datePipe.transform(p.fechaPrestamo, 'dd/MM/yyyy') || '',
      this.datePipe.transform(p.fechaDevolucionMaxima, 'dd/MM/yyyy') || '',
      p.estado,
      p.alerta || 'Vigente'
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

  doc.save(`reporte-prestamos-${fechaImpresion.replace(/\//g, '-')}.pdf`);
}
}