import { ArticuloInterface } from './../../../../interfaces/articulo.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ArticulosEmpresaRestService } from '../../../../servicios/rest/articulo-empresa-rest.service';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
} from '../../../../../../constantes/mensajes-toaster';
import { ToasterService } from 'angular2-toaster';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-modal-lista-articulo-empresa',
  templateUrl: './modal-lista-articulo-empresa.component.html',
  styleUrls: ['./modal-lista-articulo-empresa.component.scss'],
})
export class ModalListaArticuloEmpresaComponent implements OnInit {
  arreglosArticulos: ArticuloInterface[];
  totalRegistros: number;

  constructor(
    public dialogo: MatDialogRef<ModalListaArticuloEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idEmpresa },
    private _cargandoService: CargandoService,
    private _articuloEmpresaRestService: ArticulosEmpresaRestService,
    private _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.arreglosArticulos = [];
    this.totalRegistros = 0;
  }

  obtenerArticuloSeleccionado(eventoArticulo: ArticuloInterface[]) {
    this._cargandoService.habilitarCargando();
    this.arreglosArticulos = eventoArticulo;
    this.totalRegistros = this.arreglosArticulos.length;
    this._cargandoService.deshabilitarCargando();
  }

  aceptarArticulosSeleccionados() {
    this._cargandoService.habilitarCargando();
    const articulosEmpresa = this.arreglosArticulos.map(articulo => {
      return {
        empresa: +this.data.idEmpresa,
        articulo: articulo.id,
        habilitado: true,
      };
    });
    this._articuloEmpresaRestService
      .agregarArticulosPorEmpresa({ articulosEmpresa })
      .subscribe(
        respuesta => {
          this._toasterService.pop(toastExitoCrear);
          this.dialogo.close(respuesta);
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.log(error);
          this._toasterService.pop(
            'error',
            'error',
            'Error al agregar artículos, algunos artículos ya están agregados',
          );
          this._cargandoService.deshabilitarCargando();
        },
      );
  }
}
