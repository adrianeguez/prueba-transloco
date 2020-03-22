import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import {
  ConfiguracionFormluarioPeriodoVenta,
  CONFIGURACION_PERIODOVENTA,
} from '../../componentes/periodo-venta-formulario/periodo-venta-formulario.component';
import { RutaGestionPeriodoVentaComponent } from '../../rutas/ruta-gestion-periodo-venta/ruta-gestion-periodo-venta.component';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { PeriodoVentaInterface } from './../../../../interfaces/periodo-venta-interface';
import { PeriodoVentaRestService } from './../../../../servicios/rest/periodo-venta-rest.service';
import { generarToasterErrorConMensaje } from '../../../../../submodulo-articulos-front/constantes/mensaje-toast';
import { validacionMaximoMinimo } from '../../../../funciones/validacion-maximo-minimo/validacion-maximo-minimo';
import { validacionFechaMaximaMinima } from '../../../../funciones/validacion-fecha-maximo-minimo/validacion-fecha-maximo-minimo';

@Component({
  selector: 'ml-crear-editar-periodo-venta',
  templateUrl: './crear-editar-periodo-venta.component.html',
  styleUrls: ['./crear-editar-periodo-venta.component.scss'],
})
export class CrearEditarPeriodoVentaComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  periodoVentaCrearEditar: PeriodoVentaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionPeriodoVenta: ConfiguracionFormluarioPeriodoVenta;

  constructor(
    public dialogo: MatDialogRef<RutaGestionPeriodoVentaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      periodoVenta: PeriodoVentaInterface;
      idEmpresa: number | string;
    },
    private readonly _toasterService: ToasterService,
    private readonly _periodoVentaRestService: PeriodoVentaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.periodoVenta ? 'Llene' : 'Modifique'
    } los campos necesarios del periodo de venta.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionPeriodoVenta = CONFIGURACION_PERIODOVENTA();

    if (this.data.periodoVenta) {
      const periodoVentaEditar = this.data.periodoVenta;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionPeriodoVenta,
        periodoVentaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionPeriodoVenta,
        {},
      );
    }
  }

  ngAfterViewInit(): void {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  OcultarEstaTipeando() {
    this.componenteEstaTipeando.eliminarAnimacion();
  }

  mostrarEstaTipeando() {
    this.componenteEstaTipeando.ocultarTipeando = false;
    this.componenteEstaTipeando.seVaAnimacion = false;
  }

  establecerFormularioInvalido() {
    this.formularioValido = false;
    this.mostrarEstaTipeando();
  }

  validarFormulario(periodoVenta) {
    if (periodoVenta) {
      this.periodoVentaCrearEditar = periodoVenta;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.periodoVentaCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
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
      this.periodoVentaCrearEditar.habilitado = 0;
      if (validacionFechas) {
        this._periodoVentaRestService
          .create(this.periodoVentaCrearEditar)
          .subscribe(
            r => {

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
}
