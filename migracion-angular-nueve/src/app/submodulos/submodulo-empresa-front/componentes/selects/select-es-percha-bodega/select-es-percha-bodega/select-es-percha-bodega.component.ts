import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OPCIONES_FILTER_ES_PERCHA } from '../../../../modulos/bodega/constantes/opciones-filter-es-percha';

@Component({
  selector: 'ml-select-es-percha-bodega',
  templateUrl: './select-es-percha-bodega.component.html',
  styleUrls: ['./select-es-percha-bodega.component.scss'],
})
export class SelectEsPerchaBodegaComponent implements OnInit {
  opcionesDropdown = OPCIONES_FILTER_ES_PERCHA;

  @Output() esPerchaSeleccionado: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  enviarOpcionSeleccionada(evento) {
    this.esPerchaSeleccionado.emit(
      evento.value === 0 || evento.value === 1 ? evento.value : undefined,
    );
  }
}
