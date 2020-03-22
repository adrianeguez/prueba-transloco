import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../../../enums/estados';
import { EdificioInterface } from '../../../../../../../submodulo-empresa-front/interfaces/edificio.interface';

@Component({
  selector: 'ml-tabla-edificio',
  templateUrl: './tabla-edificio.component.html',
  styleUrls: ['./tabla-edificio.component.scss'],
})
export class TablaEdificioComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() edificiosEncontrados: EdificioInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() edificioSeleccionado: EventEmitter<
    EdificioInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerEdificioSeleccionado(event) {
    this.edificioSeleccionado.emit(event.data);
  }
}
