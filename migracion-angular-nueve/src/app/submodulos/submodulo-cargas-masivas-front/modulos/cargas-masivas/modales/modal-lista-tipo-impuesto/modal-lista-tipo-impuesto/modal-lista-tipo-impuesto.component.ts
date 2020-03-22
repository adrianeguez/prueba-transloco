import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
// tslint:disable-next-line: max-line-length
import { FilterTipoImpuestoComponent } from '../../../componentes/filters/filter-tipo-impuesto/filter-tipo-impuesto/filter-tipo-impuesto.component';
import { TipoImpuestoInterface } from '../../../../../../submodulo-articulos-front/interfaces/tipo-impuesto.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-tipo-impuesto',
  templateUrl: './modal-lista-tipo-impuesto.component.html',
  styleUrls: ['./modal-lista-tipo-impuesto.component.scss'],
})
export class ModalListaTipoImpuestoComponent implements OnInit {
  @ViewChild(FilterTipoImpuestoComponent, { static: true })
  filterTipoImpuestoComponent: FilterTipoImpuestoComponent;

  totalRegistros: number;

  tipoImpuestoEncontrado: TipoImpuestoInterface[] = [];

  columnas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'codigoSri', header: 'Código del SRI' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalListaTipoImpuestoComponent>,
    private _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearTipoImpuesto(tipoImpuesto: [TipoImpuestoInterface[], number]) {
    this.tipoImpuestoEncontrado = tipoImpuesto[0];
    this.totalRegistros = tipoImpuesto[1];
  }

  setearSkip(skip) {
    this.filterTipoImpuestoComponent.skip = skip;
    this.filterTipoImpuestoComponent.buscarTipoImpuesto();
  }

  obtenerTipoImpuesto(eventoTipoImpuesto: TipoImpuestoInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoTipoImpuesto);
    this._cargandoService.deshabilitarCargando();
  }
}
