import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TIPOS_EMPRESA } from '../../../../constantes/tipos-empresa';

@Component({
  selector: 'mlab-select-tipo-empresa',
  templateUrl: './select-tipo-empresa.component.html',
  styleUrls: ['./select-tipo-empresa.component.scss'],
})
export class SelectTipoEmpresaComponent implements OnInit {
  opcionesDropdown = [];

  @Output() tipoEmpresaSeleccionado: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.opcionesDropdown = TIPOS_EMPRESA.map(tipoEmpresa => {
      return { label: tipoEmpresa, value: tipoEmpresa };
    });
  }

  enviarOpcionSeleccionada(evento) {
    this.tipoEmpresaSeleccionado.emit(
      evento.value === null ? undefined : evento.value,
    );
  }
}
