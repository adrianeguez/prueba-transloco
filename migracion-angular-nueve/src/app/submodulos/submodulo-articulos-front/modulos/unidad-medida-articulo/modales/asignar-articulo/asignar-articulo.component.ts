import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
// tslint:disable-next-line: max-line-length
import { RutaGestionUnidadMedidaArticuloComponent } from '../../rutas/ruta-gestion-unidad-medida-articulo/ruta-gestion-unidad-medida-articulo.component';
import {
  generarToasterErrorCrearCampoRepetido,
  toastErrorCrear,
  toastExitoCrear,
} from './../../../../../../constantes/mensajes-toaster';
import { ArticuloInterface } from './../../../../interfaces/articulo.interface';
import { UnidadMedidaPorArticuloRestService } from './../../../../servicios/rest/unidad-medida-por-articulo-rest.service';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'app-asignar-articulo',
  templateUrl: './asignar-articulo.component.html',
  styleUrls: ['./asignar-articulo.component.sass'],
})
export class AsignarArticuloComponent implements OnInit {
  articuloSeleccionada: ArticuloInterface;

  constructor(
    public dialogo: MatDialogRef<RutaGestionUnidadMedidaArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idUnidadMedida: number },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _unidadMedidaPorArticuloRestService: UnidadMedidaPorArticuloRestService,
  ) {}

  ngOnInit() {}

  seteoArticuloSeleccionado(articulo) {
    this.articuloSeleccionada = articulo ? articulo : undefined;
  }

  metodoCrearAsignacionArticulo() {
    this._cargandoService.habilitarCargando();
    if (this.data.idUnidadMedida && this.articuloSeleccionada) {
      const unidadMedidaPorArticulo = {
        idArticulo: this.articuloSeleccionada.id,
        idUnidadMedida: this.data.idUnidadMedida,
      };

      this._unidadMedidaPorArticuloRestService
        .buscarcrearUnidadMedidaPorArticulo(unidadMedidaPorArticulo)
        .subscribe(
          respuesta => {
            if (respuesta) {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoCrear);
              this.dialogo.close(respuesta);
            } else {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(
                generarToasterErrorCrearCampoRepetido(
                  this.articuloSeleccionada.nombre,
                ),
              );
            }
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }
}
