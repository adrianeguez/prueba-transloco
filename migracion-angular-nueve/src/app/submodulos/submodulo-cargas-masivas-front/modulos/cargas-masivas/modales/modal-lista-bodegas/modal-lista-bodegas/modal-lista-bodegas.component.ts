import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CargandoService } from 'man-lab-ng';
import {BodegaInterface} from '../../../../../../submodulo-empresa-front/interfaces/bodega.interface';
import {FilterBodegaComponent} from '../../../../../../submodulo-empresa-front/componentes/filters/filter-bodega/filter-bodega/filter-bodega.component';

@Component({
  selector: 'ml-modal-lista-bodegas',
  templateUrl: './modal-lista-bodegas.component.html',
  styleUrls: ['./modal-lista-bodegas.component.scss'],
})
export class ModalListaBodegasComponent implements OnInit {
  @ViewChild(FilterBodegaComponent, { static: true })
  filterBodega: FilterBodegaComponent;

  idEmpresa;

  totalRegistros: number;

  bodegasEncontradas: BodegaInterface[] = [];

  columnas = [
    { field: 'nombre', header: 'Razón Social' },
    { field: 'codigo', header: 'R.U.C.' },
    { field: 'esPercha', header: 'Es Percha' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalListaBodegasComponent>,
    private _cargandoService: CargandoService,
    @Inject(MAT_DIALOG_DATA)
    public data: { idEmpresa; idBodegaOrigen?: number },
  ) {}

  ngOnInit() {}

  setearBodegas(respuesta: [BodegaInterface[], number]) {
    if (this.data.idBodegaOrigen) {
      this.bodegasEncontradas = respuesta[0].filter(
        b => b.id !== this.data.idBodegaOrigen,
      );
      this.totalRegistros = respuesta[1] - 1;
    } else {
      this.bodegasEncontradas = respuesta[0];
      this.totalRegistros = respuesta[1];
    }
  }

  setearSkip(skip) {
    this.filterBodega.skip = skip;
    this.filterBodega.buscarPorNombreCodigoEstadoEsPercha();
  }

  obtenerBodegaSeleccionada(eventoBodega: BodegaInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoBodega);
    this._cargandoService.deshabilitarCargando();
  }
}
