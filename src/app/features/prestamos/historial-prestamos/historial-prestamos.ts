import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // 📄 Añadido DatePipe
import { FormsModule } from '@angular/forms';
import { Prestamos } from '../../../core/services/prestamos';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-historial-prestamos',
  imports: [CommonModule, FormsModule],
  providers: [DatePipe], // 📄 Proveedor para formatear fechas desde lógica TS
  templateUrl: './historial-prestamos.html',
  styleUrl: './historial-prestamos.css',
})
export class HistorialPrestamos implements OnInit {

  prestamos = signal<any[]>([]);
  filtro = signal('');
  desde = signal('');
  hasta = signal('');
  estado = signal('');

  constructor(
    private prestamosService: Prestamos,
    private datePipe: DatePipe // 📄 Inyectamos el formateador de fechas
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

  prestamosFiltrados = computed(() => {
    let lista = this.prestamos();
    const texto = this.filtro().toLowerCase().trim();

    if (texto) {
      lista = lista.filter(x =>
        x.usuario.toLowerCase().includes(texto) ||
        x.libro.toLowerCase().includes(texto)
      );
    }

    if (this.estado()) {
      lista = lista.filter(x => x.estado === this.estado());
    }

    if (this.desde()) {
      lista = lista.filter(x => x.fechaPrestamo.split('T')[0] >= this.desde());
    }

    if (this.hasta()) {
      lista = lista.filter(x => x.fechaPrestamo.split('T')[0] <= this.hasta());
    }

    return lista;
  });

  // 📄 ENCABEZADO CORPORATIVO DINÁMICO SEGÚN LO FILTRADO EN PANTALLA
  generarPdf() {
    const doc = new jsPDF();
    const ahora = new Date();
    
    const fechaImpresion = ahora.toLocaleDateString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
    const horaImpresion = ahora.toLocaleTimeString('es-PE', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    // Encabezado principal
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80);
    doc.text('BitCoraPerú', 14, 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    doc.text('Gestor de Biblioteca Automático', 14, 24);

    // Meta-información a la derecha
    doc.setFontSize(9);
    doc.text(`Fecha: ${fechaImpresion}`, 196, 18, { align: 'right' });
    doc.text(`Hora: ${horaImpresion}`, 196, 24, { align: 'right' });

    // Separador estético
    doc.setDrawColor(231, 76, 60);
    doc.setLineWidth(1);
    doc.line(14, 28, 196, 28);

    // Título del documento interno
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(52, 73, 94);
    doc.text('REPORTE FILTRADO - HISTORIAL DE PRÉSTAMOS', 14, 38);

    // Renderizar la tabla usando la señal de los datos actualmente filtrados
    autoTable(doc, {
      startY: 43,
      head: [[
        'Usuario', 
        'Libro', 
        'F. Préstamo', 
        'Dev. Máxima', 
        'Entrega Real', 
        'Estado'
      ]],
      body: this.prestamosFiltrados().map(p => [
        p.usuario,
        p.libro,
        this.datePipe.transform(p.fechaPrestamo, 'dd/MM/yyyy') || '',
        this.datePipe.transform(p.fechaDevolucionMaxima, 'dd/MM/yyyy') || '',
        p.fechaEntregaReal ? this.datePipe.transform(p.fechaEntregaReal, 'dd/MM/yyyy') : '-',
        p.estado
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

    doc.save(`historial-filtrado-${fechaImpresion.replace(/\//g, '-')}.pdf`);
  }
}