import { CommonModule } from '@angular/common';
import { Component, computed, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../../core/services/libros';
import { Categorias } from '../../../core/services/categorias';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {

  filtro = signal('');
  categorias = signal<any[]>([]);
  categoriaSeleccionada = signal<number>(0);

  constructor(
    public librosService: LibrosService,
    public authService: Auth,
    private categoriasService: Categorias
  ) {}

  ngOnInit(): void {
    console.log('ROL:', this.authService.getRol());
    this.librosService.cargarLibros();

    this.categoriasService
      .getAll()
      .subscribe(data => {
        this.categorias.set(
          data.filter(x => x.estado)
        );
      });
  }

  librosFiltrados = computed(() => {

    const texto =
      this.filtro()
        .toLowerCase()
        .trim();

    const categoriaId =
      this.categoriaSeleccionada();

    return this.librosService
      .libros()
      .filter(libro => {

        const coincideTexto =
          (libro.titulo &&
            libro.titulo.toLowerCase().includes(texto))
          ||
          (libro.autor &&
            libro.autor.toLowerCase().includes(texto));

        const coincideCategoria =
          categoriaId === 0
          ||
          libro.categoriaId === categoriaId;

        return coincideTexto &&
               coincideCategoria;

      });

  });

  obtenerImagen(url?: string) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://localhost:7220${url}`;
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este libro?')) return;
    this.librosService
  .eliminarLibro(id)
  .subscribe({

    next: () => {

      alert('Libro eliminado');

      this.librosService.cargarLibros();

    },

    error: (err) => {

      alert(err.error);

    }

  });
  }

  generarPdf() {

    const rol = this.authService.getRol();
    if (rol !== 'Administrador' && rol !== 'Bibliotecario') {
      return;
    }

    const doc = new jsPDF();
    const ahora = new Date();
    const fechaImpresion = ahora.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const horaImpresion = ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

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
    doc.text('REPORTE GENERAL DEL CATÁLOGO DE LIBROS', 14, 38);

    autoTable(doc, {
      startY: 43,
      head: [['ID', 'Título', 'Autor', 'Stock']],
      body: this.librosFiltrados().map(libro => [
        libro.id,
        libro.titulo,
        libro.autor,
        libro.stock
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

    doc.save(`reporte-catalogo-${fechaImpresion.replace(/\//g, '-')}.pdf`);
  }
}