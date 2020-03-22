import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { BodegaInterface } from '../../../../interfaces/bodega.interface';

@Component({
  selector: 'ml-tabla-bodegas',
  templateUrl: './tabla-bodegas.component.html',
  styleUrls: ['./tabla-bodegas.component.scss'],
})
export class TablaBodegasComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() bodegasEncontradas: BodegaInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() bodegaSeleccionada: EventEmitter<
    BodegaInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  obtenerBodegaSeleccionada(event) {
    this.bodegaSeleccionada.emit(event.data);
  }
}
