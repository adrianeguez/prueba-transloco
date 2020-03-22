import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ToasterService} from 'angular2-toaster';
import {HistorialImpuestoRestService} from '../../../../servicios/rest/historial-impuesto-rest.service';
import {RutaGestionArticulosComponent} from '../../rutas/ruta-gestion-articulos/ruta-gestion-articulos.component';
import {toastErrorCrear, toastExitoCrear} from './../../../../../../constantes/mensajes-toaster';
import {ESTADOS} from './../../../../../../enums/estados';
import {ArticuloInterface} from './../../../../interfaces/articulo.interface';
import {TipoImpuestoInterface} from './../../../../interfaces/tipo-impuesto.interface';
import {generarToasterErrorConMensaje} from '../../../../constantes/mensaje-toast';
import {CargandoService} from 'man-lab-ng';
import {TarifaInterface} from '../../../../interfaces/tarifa.interface';


@Component({
  selector: 'ml-asignar-impuesto',
  templateUrl: './asignar-impuesto.component.html',
  styleUrls: ['./asignar-impuesto.component.sass'],
})
export class AsignarImpuestoComponent implements OnInit {
  estados = ESTADOS;
  tipoImpuestoSeleccionado: TipoImpuestoInterface;
  tarifaSeleccionado: TarifaInterface;

  constructor(
    public dialogo: MatDialogRef<RutaGestionArticulosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articulo: ArticuloInterface },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _historialImpuestoRestService: HistorialImpuestoRestService
  ) {
  }

  ngOnInit() {
  }

  seteoTipoImpuestoSeleccionado(tipoImpuesto) {
    console.log('tipoImpuesto');
    console.log(tipoImpuesto);
    this.tipoImpuestoSeleccionado = tipoImpuesto !== null ? tipoImpuesto : undefined;
  }

  seteoTarifaSeleccionado(tarifa) {
    console.log('tarifa');
    console.log(tarifa);
    this.tarifaSeleccionado = tarifa !== null ? tarifa : undefined;
  }

  metodoCrearAsignacionTarifaImpuesto() {
    this._cargandoService.habilitarCargando();
    if (this.data.articulo && this.tipoImpuestoSeleccionado) {
      if (this.tarifaSeleccionado) {
        const criteriosBusqueda = {
          articulo: this.data.articulo,
          tipoImpuesto: this.tipoImpuestoSeleccionado,
          tarifa: this.tarifaSeleccionado
        };
        this._historialImpuestoRestService
          .crearHistorialImpuesto(criteriosBusqueda)
          .subscribe(
            respuesta => {
              if (respuesta) {
                this._cargandoService.deshabilitarCargando();
                this._toasterService.pop(toastExitoCrear);
                this.dialogo.close(respuesta);
              }
            },
            error => {
              this._cargandoService.deshabilitarCargando();
              console.error(error);
              this._toasterService.pop(toastErrorCrear);
            },
          );
      } else {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(
          generarToasterErrorConMensaje('No contiene tarifa'),
        );
      }
    }
  }
}
