import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../../../enums/estados';
import { TipoImpuestoInterface } from '../../../../../../../submodulo-articulos-front/interfaces/tipo-impuesto.interface';

@Component({
  selector: 'ml-tabla-tipo-impuesto',
  templateUrl: './tabla-tipo-impuesto.component.html',
  styleUrls: ['./tabla-tipo-impuesto.component.scss'],
})
export class TablaTipoImpuestoComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() tipoImpuestoEncontrado: TipoImpuestoInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() tipoImpuestoSeleccionado: EventEmitter<
    TipoImpuestoInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerTipoImpuestoSeleccionado(event) {
    this.tipoImpuestoSeleccionado.emit(event.data);
  }
}
