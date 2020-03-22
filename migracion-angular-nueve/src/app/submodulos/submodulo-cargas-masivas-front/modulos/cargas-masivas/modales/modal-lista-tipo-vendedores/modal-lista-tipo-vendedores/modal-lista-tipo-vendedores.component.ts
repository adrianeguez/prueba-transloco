import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
// tslint:disable-next-line: max-line-length
import { FilterTipoVendedoresComponent } from '../../../componentes/filters/filter-tipo-vendedores/filter-tipo-vendedores/filter-tipo-vendedores.component';
import { TipoVendedorInterface } from '../../../../../../submodulo-vendedor-front/interfaces/tipo-vendedor-interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-tipo-vendedores',
  templateUrl: './modal-lista-tipo-vendedores.component.html',
  styleUrls: ['./modal-lista-tipo-vendedores.component.scss'],
})
export class ModalListaTipoVendedoresComponent implements OnInit {
  @ViewChild(FilterTipoVendedoresComponent, { static: true })
  filterTipoVendedorComponent: FilterTipoVendedoresComponent;

  totalRegistros: number;

  tipoVendedorEncontrado: TipoVendedorInterface[] = [];

  columnas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalListaTipoVendedoresComponent>,
    private _cargandoService: CargandoService,
  ) {}

  ngOnInit() {}

  setearTipoVendedor(tipoVendedor: [TipoVendedorInterface[], number]) {
    this.tipoVendedorEncontrado = tipoVendedor[0];
    this.totalRegistros = tipoVendedor[1];
  }

  setearSkip(skip) {
    this.filterTipoVendedorComponent.skip = skip;
    this.filterTipoVendedorComponent.buscarTipoVendedor();
  }

  obtenerTipoVendedor(eventoTipoVendedor: TipoVendedorInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoTipoVendedor);
    this._cargandoService.deshabilitarCargando();
  }
}
