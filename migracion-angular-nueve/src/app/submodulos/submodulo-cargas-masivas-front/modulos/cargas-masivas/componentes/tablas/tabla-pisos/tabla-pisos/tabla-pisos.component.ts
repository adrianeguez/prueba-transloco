import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../../../enums/estados';
import { PisoInterface } from '../../../../../../../submodulo-empresa-front/interfaces/piso.interface';

@Component({
  selector: 'ml-tabla-pisos',
  templateUrl: './tabla-pisos.component.html',
  styleUrls: ['./tabla-pisos.component.scss'],
})
export class TablaPisosComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() pisosEncontrados: PisoInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() pisoSeleccionado: EventEmitter<PisoInterface> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerPisoSeleccionado(event) {
    this.pisoSeleccionado.emit(event.data);
  }
}
