import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../../../enums/estados';
import { GrupoInterface } from '../../../../../../../submodulo-articulos-front/interfaces/grupo.interface';

@Component({
  selector: 'ml-tabla-grupos',
  templateUrl: './tabla-grupos.component.html',
  styleUrls: ['./tabla-grupos.component.scss'],
})
export class TablaGruposComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() gruposEncontrados: GrupoInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() grupoSeleccionado: EventEmitter<
    GrupoInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerGrupoSeleccionado(event) {
    this.grupoSeleccionado.emit(event.data);
  }
}
