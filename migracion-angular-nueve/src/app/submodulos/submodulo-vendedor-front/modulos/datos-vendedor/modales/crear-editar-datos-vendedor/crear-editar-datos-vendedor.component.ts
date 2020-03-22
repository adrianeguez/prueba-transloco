import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import {
  ConfiguracionFormluarioDatosVendedor,
  CONFIGURACION_DATOSVENDEDOR,
} from '../../componentes/datos-vendedor-formulario/datos-vendedor-formulario.component';
import { RutaGestionDatosVendedorComponent } from '../../rutas/ruta-gestion-datos-vendedor/ruta-gestion-datos-vendedor.component';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from './../../../../../../enums/estados';
import { DatosVendedorInterface } from './../../../../interfaces/datos-vendedor-interface';
import { DatosVendedorRestService } from './../../../../servicios/rest/datos-vendedor-rest.service';
import { validacionFechaMaximaMinima } from '../../../../funciones/validacion-fecha-maximo-minimo/validacion-fecha-maximo-minimo';
import { generarToasterErrorConMensaje } from '../../../../../submodulo-articulos-front/constantes/mensaje-toast';

@Component({
  selector: 'ml-crear-editar-datos-vendedor',
  templateUrl: './crear-editar-datos-vendedor.component.html',
  styleUrls: ['./crear-editar-datos-vendedor.component.scss'],
})
export class CrearEditarDatosVendedorComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  datosVendedorCrearEditar: DatosVendedorInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionDatosVendedor: ConfiguracionFormluarioDatosVendedor;

  constructor(
    public dialogo: MatDialogRef<RutaGestionDatosVendedorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { datosVendedor: DatosVendedorInterface },
    private readonly _toasterService: ToasterService,
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.datosVendedor ? 'Llene' : 'Modifique'
    } los campos necesarios del vendedor.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionDatosVendedor = CONFIGURACION_DATOSVENDEDOR();

    if (this.data.datosVendedor) {
      const datosVendedorEditar = this.data.datosVendedor;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDatosVendedor,
        datosVendedorEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDatosVendedor,
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

  validarFormulario(datosVendedor) {
    if (datosVendedor) {
      this.datosVendedorCrearEditar = datosVendedor;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.datosVendedorCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    const validacionFechas = validacionFechaMaximaMinima(
      this.datosVendedorCrearEditar.fechaIngreso,
      this.datosVendedorCrearEditar.fechaSalida,
    );
    if (this.data.datosVendedor) {
      if (validacionFechas) {
        this._datosVendedorRestService
          .updateOne(this.data.datosVendedor.id, this.datosVendedorCrearEditar)
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
      this.datosVendedorCrearEditar.habilitado = ESTADOS.Activo;
      this._datosVendedorRestService
        .create(this.datosVendedorCrearEditar)
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
    }
  }
}
