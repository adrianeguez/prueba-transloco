import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {ArticuloBodegaInterface} from '../../../../interfaces/articulo-bodega.interface';
@Component({
  selector: 'ml-tabla-articulo-bodega',
  templateUrl: './tabla-articulo-bodega.component.html',
  styleUrls: ['./tabla-articulo-bodega.component.scss']
})
export class TablaArticuloBodegaComponent implements OnInit {

  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loanding = false;

  @Input() articulosBodegaEncontrados: ArticuloBodegaInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() artiuloBodegaSeleccionado: EventEmitter<ArticuloBodegaInterface> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cargarDatosLazy(event) {
    this.loanding = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loanding = false;
  }

  obtenerArticuloBodegaSeleccionado(event) {
    this.artiuloBodegaSeleccionado.emit(event.data);
  }
}
