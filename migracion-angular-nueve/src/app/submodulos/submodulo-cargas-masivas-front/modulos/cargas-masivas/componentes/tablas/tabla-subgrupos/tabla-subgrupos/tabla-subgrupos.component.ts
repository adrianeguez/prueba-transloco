import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../../../enums/estados';
import { SubgrupoInterface } from '../../../../../../../submodulo-articulos-front/interfaces/subgrupo.interface';

@Component({
  selector: 'ml-tabla-subgrupos',
  templateUrl: './tabla-subgrupos.component.html',
  styleUrls: ['./tabla-subgrupos.component.scss'],
})
export class TablaSubgruposComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() subgruposEncontrados: SubgrupoInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() subgrupoSeleccionado: EventEmitter<
    SubgrupoInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerSubgrupoSeleccionado(event) {
    this.subgrupoSeleccionado.emit(event.data);
  }
}
