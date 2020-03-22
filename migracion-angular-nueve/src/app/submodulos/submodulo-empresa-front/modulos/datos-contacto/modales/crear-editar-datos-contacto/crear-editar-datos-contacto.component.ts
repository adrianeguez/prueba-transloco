import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import {
  CONFIGURACION_DATOSCONTACTO,
  ConfiguracionFormluarioDatosContacto,
} from '../../componentes/formulario-datos-contacto/datos-contacto-formulario.component';
import { DatosContactoRestService } from '../../../../servicios/rest/datos-contacto-rest.service';
import { DatosContactoInterface } from '../../../../interfaces/datos-contacto.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-crear-editar-datos-contacto',
  templateUrl: './crear-editar-datos-contacto.component.html',
  styleUrls: ['./crear-editar-datos-contacto.component.sass'],
})
export class CrearEditarDatosContactoComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  datoContactoCrearEditar: DatosContactoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionDatoContacto: ConfiguracionFormluarioDatosContacto;

  constructor(
    public dialogo: MatDialogRef<CrearEditarDatosContactoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { datosContacto: DatosContactoInterface; idContactoEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _datosContactoRestService: DatosContactoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.datosContacto ? 'Llene' : 'Modifique'
    } los campos necesarios para el dato de contacto.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionDatoContacto = CONFIGURACION_DATOSCONTACTO();
    if (this.data.datosContacto) {
      const datoContactoEditar = this.data.datosContacto;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDatoContacto,
        datoContactoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDatoContacto,
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

  validarFormulario(datoContacto) {
    if (datoContacto) {
      this.datoContactoCrearEditar = datoContacto;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.datoContactoCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    this.datoContactoCrearEditar.esPrincipal =
      +this.datoContactoCrearEditar.esPrincipal === 1;
    this.datoContactoCrearEditar.fax = this.datoContactoCrearEditar.fax === '' ? null : this.datoContactoCrearEditar.fax;
    if (this.data.datosContacto) {
      this._datosContactoRestService
        .updateOne(this.data.datosContacto.id, this.datoContactoCrearEditar)
        .subscribe(
          respuesta => {
            respuesta.esPrincipal = respuesta.esPrincipal ? 1 : 0;
            respuesta.habilitado = respuesta.habilitado ? 1 : 0;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(respuesta);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.datoContactoCrearEditar.habilitado = true;
      this.datoContactoCrearEditar.contactoEmpresa = +this.data
        .idContactoEmpresa;
      this._datosContactoRestService
        .create(this.datoContactoCrearEditar)
        .subscribe(
          respuesta => {
            respuesta.esPrincipal = respuesta.esPrincipal ? 1 : 0;
            respuesta.habilitado = respuesta.habilitado ? 1 : 0;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(respuesta);
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
