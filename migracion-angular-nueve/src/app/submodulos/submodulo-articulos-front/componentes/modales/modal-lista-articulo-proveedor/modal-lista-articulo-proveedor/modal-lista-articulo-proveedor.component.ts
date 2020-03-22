import { ArticuloProveedorInterface } from '../../../../interfaces/articulo-proveedor.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-articulo-proveedor',
  templateUrl: './modal-lista-articulo-proveedor.component.html',
  styleUrls: ['./modal-lista-articulo-proveedor.component.scss'],
})
export class ModalListaArticuloProveedorComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalListaArticuloProveedorComponent>,
    private _cargandoService: CargandoService,
    @Inject(MAT_DIALOG_DATA) public data: { idEmpresaProveedor },
  ) {}

  ngOnInit() {}

  obtenerArticuloProveedorSeleccionado(
    eventoArticuloProveedor: ArticuloProveedorInterface,
  ) {
    this._cargandoService.habilitarCargando();
    this.dialogo.close(eventoArticuloProveedor);
    this._cargandoService.deshabilitarCargando();
  }
}
