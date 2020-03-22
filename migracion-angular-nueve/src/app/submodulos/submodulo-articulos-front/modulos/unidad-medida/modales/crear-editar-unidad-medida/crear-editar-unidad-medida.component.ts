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
import { UnidadMedidaRestService } from '../../../../servicios/rest/unidad-medida-rest.service';
import { RutaGestionUnidadMedidaComponent } from '../../rutas/ruta-gestion-unidad-medida/ruta-gestion-unidad-medida.component';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { UnidadMedidaInterface } from './../../../../interfaces/unidad-medida.interface';
// tslint:disable-next-line: max-line-length
import {
  ConfiguracionFormluarioUnidadMedida,
  CONFIGURACION_UNIDADMEDIDA,
} from './../../componentes/unidad-medida-formulario/unidad-medida-formulario.component';

@Component({
  selector: 'ml-crear-editar-unidad-medida',
  templateUrl: './crear-editar-unidad-medida.component.html',
  styleUrls: ['./crear-editar-unidad-medida.component.sass'],
})
export class CrearEditarUnidadMedidaComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  unidadDetalleCrearEditar: UnidadMedidaInterface; // revisar error
  @ViewChild(EstaTipeandoComponent, { static: false })
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionUnidadMedida: ConfiguracionFormluarioUnidadMedida;

  constructor(
    public dialogo: MatDialogRef<RutaGestionUnidadMedidaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { unidadMedida: UnidadMedidaInterface },
    private readonly _toasterService: ToasterService,
    private readonly _unidadMedidaRestService: UnidadMedidaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit() {
    this.descripcion = `${
      !this.data.unidadMedida ? 'Llene' : 'Modifique'
    } los campos necesarios para el grupo.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionUnidadMedida = CONFIGURACION_UNIDADMEDIDA();
    if (this.data.unidadMedida) {
      const unidadMedidaEditar = this.data.unidadMedida;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionUnidadMedida,
        unidadMedidaEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionUnidadMedida,
        {},
      );
    }
  }

  ngAfterViewInit() {
    this.componenteEstaTipeando.ocultarTipeando = true;
  }

  ocultarEstaTipeando() {
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

  validarFormulario(unidadMedida) {
    if (unidadMedida) {
      this.unidadDetalleCrearEditar = unidadMedida;
      this.formularioValido = true;
      this.ocultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.unidadDetalleCrearEditar = {};
      this.ocultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.unidadMedida) {
      this._unidadMedidaRestService
        .updateOne(this.data.unidadMedida.id, this.unidadDetalleCrearEditar)
        .subscribe(
          (respuesta: UnidadMedidaInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(respuesta);
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.unidadDetalleCrearEditar.habilitado = true;
      this._unidadMedidaRestService
        .create(this.unidadDetalleCrearEditar)
        .subscribe(
          respuesta => {
            respuesta.habilitado = +respuesta.habilitado;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(respuesta);
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
