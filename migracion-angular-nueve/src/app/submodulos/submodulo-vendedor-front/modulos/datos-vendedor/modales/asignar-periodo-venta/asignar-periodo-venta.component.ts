import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { RutaGestionPeriodoVentaComponent } from '../../../periodo-venta/rutas/ruta-gestion-periodo-venta/ruta-gestion-periodo-venta.component';
import {
  toastErrorCrear,
  toastExitoCrear,
} from './../../../../../../constantes/mensajes-toaster';
import { PeriodoVentaInterface } from './../../../../interfaces/periodo-venta-interface';
import { PeriodoVentaRestService } from './../../../../servicios/rest/periodo-venta-rest.service';
import { PeriodosPorVendedorRestService } from './../../../../servicios/rest/periodos-por-vendedor-rest.service';
import { generarToasterErrorConMensaje } from '../../../../constantes/mensajes-toast';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-asignar-periodo-venta',
  templateUrl: './asignar-periodo-venta.component.html',
  styleUrls: ['./asignar-periodo-venta.component.scss'],
})
export class AsignarPeriodoVentaComponent implements OnInit {
  descripcion: string;
  periodoVentaSeleccionado: PeriodoVentaInterface;

  constructor(
    public dialogo: MatDialogRef<RutaGestionPeriodoVentaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { registro: number; idEmpresa: number | string },
    private readonly _toasterService: ToasterService,
    private readonly _periodoVentaRestService: PeriodoVentaRestService,
    private readonly _periodosPorVendedorRestService: PeriodosPorVendedorRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = 'Seleccione el periodo de venta';
  }

  seteoPeriodoVentaSeleccionado(evento) {
    this.periodoVentaSeleccionado = evento;
  }

  metodoCrearPeriodoVenta() {
    if (this.periodoVentaSeleccionado && this.data.registro) {
      const nuevoPeriodoVenta = {
        idVendedor: this.data.registro,
        idPeriodo: this.periodoVentaSeleccionado.id,
        vigenciaHasta: this.periodoVentaSeleccionado.fechaFin,
      };
      this._periodosPorVendedorRestService
        .buscarYCrearPeriodoVendedor(nuevoPeriodoVenta)
        .subscribe(
          r => {
            if (r) {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoCrear);
              this.dialogo.close(r);
            } else {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(
                generarToasterErrorConMensaje('Error ya se encuentra asignado'),
              );
            }
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }
}
