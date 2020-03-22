import { ArticuloProveedorInterface } from '../../../../interfaces/articulo-proveedor.interface';
import { ESTADOS } from './../../../../../../enums/estados';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ml-tabla-articulo-proveedor',
  templateUrl: './tabla-articulo-proveedor.component.html',
  styleUrls: ['./tabla-articulo-proveedor.component.scss'],
})
export class TablaArticuloProveedorComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() articulosProveedoresEncontradas: ArticuloProveedorInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() articuloProveedorSeleccionado: EventEmitter<
    ArticuloProveedorInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  obtenerArticuloProveedorSeleccionado(event) {
    this.articuloProveedorSeleccionado.emit(event.data);
  }
}
