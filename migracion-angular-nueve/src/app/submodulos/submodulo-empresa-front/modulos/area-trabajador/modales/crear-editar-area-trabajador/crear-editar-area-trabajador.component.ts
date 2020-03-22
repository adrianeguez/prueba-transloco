import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import {
  CONFIGURACION_AREATRABAJADOR,
  ConfiguracionFormluarioAreaTrabajador,
} from '../../componentes/area-trabajador-formulario/area-trabajador-formulario.component';
import { AreaTrabajadorRestService } from '../../../../servicios/rest/area-trabajador-rest.service';
import { AreaTrabajadorInterface } from '../../../../interfaces/area-trabajador.interface';
import { ContactoEmpresaInterface } from '../../../../interfaces/contacto-empresa.interface';
import { DatosUsuarioInterface } from '../../../../interfaces/datos-usuario.interface';
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-crear-editar-area-trabajador',
  templateUrl: './crear-editar-area-trabajador.component.html',
  styleUrls: ['./crear-editar-area-trabajador.component.sass'],
})
export class CrearEditarAreaTrabajadorComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  areaTrabajadorCrearEditar: AreaTrabajadorInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionAreaTrabajador: ConfiguracionFormluarioAreaTrabajador;

  constructor(
    public dialogo: MatDialogRef<CrearEditarAreaTrabajadorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      areaTrabajador: AreaTrabajadorInterface;
      idAreaPiso;
      idEmpresa;
    },
    private readonly _toasterService: ToasterService,
    private readonly _areaTrabajadorRestService: AreaTrabajadorRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.areaTrabajador ? 'Llene' : 'Modifique'
    } los campos necesarios para el trabajador.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionAreaTrabajador = CONFIGURACION_AREATRABAJADOR();
    this.configuracionAreaTrabajador.Nombres.disabled = true;
    this.configuracionAreaTrabajador.Apellidos.disabled = true;
    if (this.data.areaTrabajador) {
      const areaTrabajadorEditar: AreaTrabajadorInterface = this.data
        .areaTrabajador;
      const contactoEmpresa: ContactoEmpresaInterface = areaTrabajadorEditar.contactoEmpresa as ContactoEmpresaInterface;
      const datosUsuario: DatosUsuarioInterface = contactoEmpresa.datosUsuario as DatosUsuarioInterface;
      this.configuracionAreaTrabajador.Nombres.valor = (datosUsuario as DatosUsuarioInterface).nombres;
      this.configuracionAreaTrabajador.Apellidos.valor = (datosUsuario as DatosUsuarioInterface).apellidos;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionAreaTrabajador,
        areaTrabajadorEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionAreaTrabajador,
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

  validarFormulario(areaTrabajador) {
    if (areaTrabajador) {
      delete areaTrabajador.nombres;
      delete areaTrabajador.apellidos;
      this.areaTrabajadorCrearEditar = areaTrabajador;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.areaTrabajadorCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.areaTrabajador) {
      this._areaTrabajadorRestService
        .updateOne(this.data.areaTrabajador.id, this.areaTrabajadorCrearEditar)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(
              generarToasterErrorEditarCampoRepetido('usuario'),
            );
          },
        );
    } else {
      this.areaTrabajadorCrearEditar.areaPiso = this.data.idAreaPiso;
      this._areaTrabajadorRestService
        .create(this.areaTrabajadorCrearEditar)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(
              generarToasterErrorCrearCampoRepetido('usuario'),
            );
          },
        );
    }
  }
}
