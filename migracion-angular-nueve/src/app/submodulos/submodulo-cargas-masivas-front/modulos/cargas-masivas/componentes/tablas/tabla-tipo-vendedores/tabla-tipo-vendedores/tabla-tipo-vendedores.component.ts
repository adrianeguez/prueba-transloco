import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../../../enums/estados';
import { TipoVendedorInterface } from '../../../../../../../submodulo-vendedor-front/interfaces/tipo-vendedor-interface';

@Component({
  selector: 'ml-tabla-tipo-vendedores',
  templateUrl: './tabla-tipo-vendedores.component.html',
  styleUrls: ['./tabla-tipo-vendedores.component.scss'],
})
export class TablaTipoVendedoresComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() tipoVendedorEncontrado: TipoVendedorInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() tipoVendedorSeleccionado: EventEmitter<
    TipoVendedorInterface
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerTipoVendedorSeleccionado(event) {
    this.tipoVendedorSeleccionado.emit(event.data);
  }
}
