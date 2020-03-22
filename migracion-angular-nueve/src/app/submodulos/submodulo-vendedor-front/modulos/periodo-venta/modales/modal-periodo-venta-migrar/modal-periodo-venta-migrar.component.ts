import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RutaGestionPeriodoVentaComponent} from '../../rutas/ruta-gestion-periodo-venta/ruta-gestion-periodo-venta.component';
import {ToasterService} from 'angular2-toaster';
import {PeriodoVentaRestService} from '../../../../servicios/rest/periodo-venta-rest.service';
import {PeriodosPorVendedorRestService} from '../../../../servicios/rest/periodos-por-vendedor-rest.service';
import {CargandoService} from 'man-lab-ng';
import {validacionFechaMaximaMinima} from '../../../../funciones/validacion-fecha-maximo-minimo/validacion-fecha-maximo-minimo';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {PeriodoVentaInterface} from './../../../../interfaces/periodo-venta-interface';
import {generarToasterErrorConMensaje} from '../../../../../submodulo-articulos-front/constantes/mensaje-toast';

@Component({
  selector: 'ml-modal-periodo-venta-migrar',
  templateUrl: './modal-periodo-venta-migrar.component.html',
  styleUrls: ['./modal-periodo-venta-migrar.component.scss']
})
export class ModalPeriodoVentaMigrarComponent implements OnInit {

  descripcion: string;
  periodoVentaSeleccionado: PeriodoVentaInterface;
  fechaAbuscar;
  fecha;
  fechaTrae;
  mostrarSelect;
  fechasValidas;

  periodoVentaEditar: PeriodoVentaInterface = {};

  constructor(
    public dialogo: MatDialogRef<RutaGestionPeriodoVentaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private readonly _toasterService: ToasterService,
    private readonly _periodoVentaRestService: PeriodoVentaRestService,
    private readonly _periodosPorVendedorRestService: PeriodosPorVendedorRestService,
    private readonly _cargandoService: CargandoService,
  ) {
  }

  ngOnInit() {
    this.descripcion = 'Seleccione la fecha de cierre del periodo';
    this.mostrarSelect = false;
    this.fechasValidas = false;
    this.fechaTrae = this.data.periodoAcerrar.fechaFin;
    const fecha = this.fechaTrae.split('-');
    this.fechaAbuscar = {'year': +fecha[0], 'month': +fecha[1], 'day': +fecha[2]};
  }


  seteoPeriodoVentaSeleccionado(evento) {
    this.periodoVentaSeleccionado = evento;
  }

  detectarFechas(event) {
    const fechaValidarFin = `${event.year}-${event.month}-${event.day}`;
    this.fechasValidas = validacionFechaMaximaMinima(
      this.data.periodoAcerrar.fechaInicio,
      fechaValidarFin,
    );
    if (this.fechasValidas) {
      this.descripcion = `Fecha cierre de periodo: ${fechaValidarFin} seleccione el periodo a migrar`;
    } else {
      this._toasterService.pop(
        generarToasterErrorConMensaje('Error al seleccionar fecha'),
      );
    }
  }

  cargarSelect() {
    this.fecha = `${this.fechaAbuscar.year}-${this.fechaAbuscar.month}-${this.fechaAbuscar.day}`;
    this.mostrarSelect = true;
  }

  cerrarPeriodo() {
    this.periodoVentaEditar.fechaFin = this.fecha;
    this.periodoVentaEditar.idPeriodoSiguiente = this.periodoVentaSeleccionado.id;
    this.periodoVentaEditar.idPeriodoAnterior = this.data.periodoAcerrar.idPeriodoAnterior ? this.data.periodoAcerrar.idPeriodoAnterior : this.data.periodoAcerrar.id;
    this.periodoVentaEditar.habilitado = 2;
    this._periodoVentaRestService
      .updateOne(this.data.periodoAcerrar.id, this.periodoVentaEditar)
      .subscribe(
        async (r) => {
          try {
            await this._periodoVentaRestService.cambioEstadoPeridoCierreMigrar(
              {
                idPeriodoCierre: this.data.periodoAcerrar.id,
                idPeriodoMigra: this.periodoVentaSeleccionado.id,
                habilitadoPeriodo: 1,
              }
            ).toPromise();
            await this._periodoVentaRestService.cerrarPeriodoVentas(
              {
                idEmpresa: this.data.empresa,
                idPeriodoCierre: r.id,
                idPeriodoMigra: r.idPeriodoSiguiente,
              }
            ).toPromise();
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close({
              registroEditado: r,
              periodoMigrar: this.periodoVentaSeleccionado,
            });
          } catch (e) {
            this._cargandoService.deshabilitarCargando();
            console.error(e);
            this._toasterService.pop(toastErrorEditar);
          }
        },
        err => {
          this._cargandoService.deshabilitarCargando();
          console.error(err);
          this._toasterService.pop(toastErrorEditar);
        },
      );

  }


  /* metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    const validacionFechas = validacionFechaMaximaMinima(
      this.periodoVentaCrearEditar.fechaInicio,
      this.periodoVentaCrearEditar.fechaFin,
    );
    if (this.data.periodoVenta) {
      if (validacionFechas) {
        this._periodoVentaRestService
          .updateOne(this.data.periodoVenta.id, this.periodoVentaCrearEditar)
          .subscribe(
            r => {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoEditar);
              this.dialogo.close(r);
            },
            err => {
              this._cargandoService.deshabilitarCargando();
              console.error(err);
              this._toasterService.pop(toastErrorEditar);
            },
          );
      } else {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(
          generarToasterErrorConMensaje('Error al seleccionar fechas'),
        );
      }
    } else {
      this.periodoVentaCrearEditar.empresa = this.data.idEmpresa;
      this.periodoVentaCrearEditar.habilitado = false;
      if (validacionFechas) {
        this._periodoVentaRestService
          .create(this.periodoVentaCrearEditar)
          .subscribe(
            r => {
              r.habilitado = +r.habilitado;
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(toastExitoCrear);
              this.dialogo.close(r);
            },
            err => {
              this._cargandoService.deshabilitarCargando();
              console.error(err);
              this._toasterService.pop(toastErrorCrear);
            },
          );
      } else {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(
          generarToasterErrorConMensaje('Error al seleccionar fechas'),
        );
      }
    }
  }
 */


}
