import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { MovimientoInterface } from '../../../../interfaces/movimiento.interface';

@Component({
  selector: 'ml-tabla-movimiento',
  templateUrl: './tabla-movimiento.component.html',
  styleUrls: ['./tabla-movimiento.component.scss'],
})
export class TablaMovimientoComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() movimientosEncontrados: MovimientoInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() movimientoSeleccionado: EventEmitter<
    MovimientoInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  obtenerMovimientoSeleccionado(event) {
    this.movimientoSeleccionado.emit(event.data);
  }
}
