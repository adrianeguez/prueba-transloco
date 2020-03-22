import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MovimientoInterface } from '../../../../interfaces/movimiento.interface';
import { FilterMovimientoComponent } from '../../../filters/filter-movimiento/filter-movimiento/filter-movimiento.component';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-tipo-movimiento',
  templateUrl: './modal-lista-movimiento.component.html',
  styleUrls: ['./modal-lista-movimiento.component.scss'],
})
export class ModalListaMovimientoComponent implements OnInit {
  @ViewChild(FilterMovimientoComponent, { static: true })
  filterMovimiento: FilterMovimientoComponent;

  tipoMovimiento;

  totalRegistros: number;

  movimientosEncontrados: MovimientoInterface[] = [];

  columnas = [
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
  ];

  constructor(
    public dialogo: MatDialogRef<ModalListaMovimientoComponent>,
    private _cargandoService: CargandoService,
    @Inject(MAT_DIALOG_DATA) public data: { tipoMovimiento, empresaId },
  ) {}

  ngOnInit() {}

  setearMovimiento(movimiento: [MovimientoInterface[], number]) {
    this.movimientosEncontrados = movimiento[0];
    this.totalRegistros = movimiento[1];
  }

  setearSkip(skip) {
    this.filterMovimiento.skip = skip;
    this.filterMovimiento.buscarMovimientosPorTipo();
  }

  obtenerMovimientoSeleccionado(eventoMovimiento: MovimientoInterface) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoMovimiento);
    this._cargandoService.deshabilitarCargando();
  }
}
