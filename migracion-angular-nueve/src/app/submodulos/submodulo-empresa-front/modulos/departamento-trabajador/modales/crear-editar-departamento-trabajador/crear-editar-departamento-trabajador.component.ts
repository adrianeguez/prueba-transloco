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
  CONFIGURACION_DEPARTAMENTOTRABAJADOR,
  ConfiguracionFormluarioDepartamentoTrabajador,
} from '../../componentes/departamento-trabajador-formulario/departamento-trabajador-formulario.component';
// tslint:disable-next-line:max-line-length
import { DepartamentoTrabajadorRestService } from '../../../../servicios/rest/departamento-trabajador-rest.service';
import { DepartamentoTrabajadorInterface } from '../../../../interfaces/departamento-trabajador.interface';
import { ContactoEmpresaInterface } from '../../../../interfaces/contacto-empresa.interface';
import { DatosUsuarioInterface } from '../../../../interfaces/datos-usuario.interface';
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';

@Component({
  selector: 'ml-crear-editar-departamento-trabajador',
  templateUrl: './crear-editar-departamento-trabajador.component.html',
  styleUrls: ['./crear-editar-departamento-trabajador.component.sass'],
})
export class CrearEditarDepartamentoTrabajadorComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  departamentoTrabajadorCrearEditar: DepartamentoTrabajadorInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionDepartamentoTrabajador: ConfiguracionFormluarioDepartamentoTrabajador;

  constructor(
    public dialogo: MatDialogRef<CrearEditarDepartamentoTrabajadorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      departamentoTrabajador: DepartamentoTrabajadorInterface;
      idDepartamentoEmpresa;
      idEmpresa;
    },
    private readonly _toasterService: ToasterService,
    private readonly _departamentoTrabajadorRestService: DepartamentoTrabajadorRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.departamentoTrabajador ? 'Llene' : 'Modifique'
    } los campos necesarios para el trabajador.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionDepartamentoTrabajador = CONFIGURACION_DEPARTAMENTOTRABAJADOR();
    this.configuracionDepartamentoTrabajador.Nombres.disabled = true;
    this.configuracionDepartamentoTrabajador.Apellidos.disabled = true;
    if (!this.data.departamentoTrabajador) {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDepartamentoTrabajador,
        {},
      );
    } else {
      const departamentoTrabajadorEditar: DepartamentoTrabajadorInterface = this
        .data.departamentoTrabajador;
      const contactoEmpresa: ContactoEmpresaInterface = departamentoTrabajadorEditar.contactoEmpresa as ContactoEmpresaInterface;
      const datosUsuario: DatosUsuarioInterface = contactoEmpresa.datosUsuario as DatosUsuarioInterface;
      this.configuracionDepartamentoTrabajador.Nombres.valor = (datosUsuario as DatosUsuarioInterface).nombres;
      this.configuracionDepartamentoTrabajador.Apellidos.valor = (datosUsuario as DatosUsuarioInterface).apellidos;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDepartamentoTrabajador,
        departamentoTrabajadorEditar,
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

  validarFormulario(departamentoTrabajador) {
    if (departamentoTrabajador) {
      delete departamentoTrabajador.nombres;
      delete departamentoTrabajador.apellidos;
      this.departamentoTrabajadorCrearEditar = departamentoTrabajador;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.departamentoTrabajadorCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.departamentoTrabajador) {
      this._departamentoTrabajadorRestService
        .updateOne(
          this.data.departamentoTrabajador.id,
          this.departamentoTrabajadorCrearEditar,
        )
        .subscribe(
          r => {
            r.habilitado = r.habilitado ? 1 : 0;
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
      this.departamentoTrabajadorCrearEditar.habilitado = true;
      this.departamentoTrabajadorCrearEditar.departamentoEmpresa = this.data.idDepartamentoEmpresa;
      this._departamentoTrabajadorRestService
        .create(this.departamentoTrabajadorCrearEditar)
        .subscribe(
          r => {
            r.habilitado = r.habilitado ? 1 : 0;
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
