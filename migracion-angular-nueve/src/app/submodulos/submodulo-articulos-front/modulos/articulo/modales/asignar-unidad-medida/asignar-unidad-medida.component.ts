import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { UnidadMedidaInterface } from '../../../../interfaces/unidad-medida.interface';
import { UnidadMedidaPorArticuloRestService } from '../../../../servicios/rest/unidad-medida-por-articulo-rest.service';
import { RutaGestionArticulosComponent } from '../../rutas/ruta-gestion-articulos/ruta-gestion-articulos.component';
import {
  generarToasterErrorCrearCampoRepetido,
  toastErrorCrear,
  toastExitoCrear,
} from './../../../../../../constantes/mensajes-toaster';
import { ArticuloInterface } from './../../../../interfaces/articulo.interface';
import { CargandoService } from 'man-lab-ng';
import {generarToasterErrorConMensaje} from '../../../../constantes/mensaje-toast';

@Component({
  selector: 'ml-asignar-unidad-medida',
  templateUrl: './asignar-unidad-medida.component.html',
  styleUrls: ['./asignar-unidad-medida.component.sass'],
})
export class AsignarUnidadMedidaComponent implements OnInit {
  unidadesMedidas: UnidadMedidaInterface[];
  unidadMedidaSeleccionada: UnidadMedidaInterface;

  constructor(
    public dialogo: MatDialogRef<RutaGestionArticulosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articulo: ArticuloInterface },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _unidadMedidaPorArticuloRestService: UnidadMedidaPorArticuloRestService,
  ) {}

  ngOnInit() {}

  seteoUnidadMedidaSeleccionado(unidadMedida) {
    this.unidadMedidaSeleccionada = unidadMedida ? unidadMedida : undefined;
  }

  metodoCrearAsignacionUnidadMedida() {
    this._cargandoService.habilitarCargando();
    if (this.data.articulo && this.unidadMedidaSeleccionada) {
      const unidadMedidaPorArticulo = {
        idArticulo: this.data.articulo.id,
        idUnidadMedida: this.unidadMedidaSeleccionada.id,
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
                generarToasterErrorConMensaje(
                  `La unidad de medida "${this.unidadMedidaSeleccionada.nombre}" ya se encuentra registrada.` ,
                  'warning',
                  'Warning'
                ),
              );
            }
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }
}
