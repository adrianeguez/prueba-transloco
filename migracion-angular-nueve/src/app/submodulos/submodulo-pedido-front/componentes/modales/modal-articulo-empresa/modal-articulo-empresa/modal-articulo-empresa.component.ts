import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {ArticuloEmpresaInterface} from '../../../../interfaces/articulo-empresa.interface';
import {PedidoDetalleInterface} from '../../../../interfaces/pedido-detalle.interface';

@Component({
  selector: 'ml-modal-articulo-empresa',
  templateUrl: './modal-articulo-empresa.component.html',
  styleUrls: ['./modal-articulo-empresa.component.scss']
})
export class ModalArticuloEmpresaComponent implements OnInit {
  articuloSeleccionado: ArticuloEmpresaInterface;
  articuloEnTabla: boolean;

  constructor(
    public dialogo: MatDialogRef<ModalArticuloEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idEmpresa,
      idProveedor,
      idBodega,
      articulosEnTabla,
      esVenta: boolean,
      idBodegaDestino: number,
    },
    private _cargandoService: CargandoService,
    private _toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.articuloEnTabla = false;
  }

  obtenerArticuloSeleccionado(eventoArticulo: ArticuloEmpresaInterface) {
    this._cargandoService.habilitarCargando();
    this.articuloSeleccionado = eventoArticulo;
    this.verificarArticuloEnTabla(this.data.articulosEnTabla, this.articuloSeleccionado.articulo.codigo);
    this._cargandoService.deshabilitarCargando();
  }

  verificarArticuloEnTabla(arreglo, valor) {
    this.articuloEnTabla = arreglo.some((articulo: PedidoDetalleInterface) => {
      return valor === articulo.codigo;
    });
  }

  aceptarArticuloSeleccionado() {
    if (this.articuloEnTabla) {
      this._toasterService.pop(
        'error',
        'ERROR',
        'El artículo ya ha sido añadido en tabla'
      );
    } else {
      this.dialogo.close(this.articuloSeleccionado);
    }
  }
}
