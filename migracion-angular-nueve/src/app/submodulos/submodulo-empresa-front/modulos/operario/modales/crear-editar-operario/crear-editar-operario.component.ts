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
import { ContactoEmpresaInterface } from '../../../../interfaces/contacto-empresa.interface';
import { DatosUsuarioInterface } from '../../../../interfaces/datos-usuario.interface';
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { OperarioInterface } from '../../../../interfaces/operario.interface';
import {
  CONFIGURACION_OPERARIO,
  ConfiguracionFormluarioOperario,
} from '../../componentes/operario-formulario/operario-formulario.component';
import { OperarioRestService } from '../../../../servicios/rest/operario-rest.service';

@Component({
  selector: 'app-crear-editar-operario',
  templateUrl: './crear-editar-operario.component.html',
  styleUrls: ['./crear-editar-operario.component.scss'],
})
export class CrearEditarOperarioComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  operarioCrearEditar: OperarioInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionOperario: ConfiguracionFormluarioOperario;

  constructor(
    public dialogo: MatDialogRef<CrearEditarOperarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { operario: OperarioInterface; idPuntoEmision; idEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _operarioRestService: OperarioRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.operario ? 'Llene' : 'Modifique'
    } los campos necesarios para el operario.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionOperario = CONFIGURACION_OPERARIO();
    this.configuracionOperario.Nombres.disabled = true;
    this.configuracionOperario.Apellidos.disabled = true;
    if (!this.data.operario) {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionOperario,
        {},
      );
    } else {
      const operarioEditar: OperarioInterface = this.data.operario;
      const contactoEmpresa: ContactoEmpresaInterface = operarioEditar.contactoEmpresa as ContactoEmpresaInterface;
      const datosUsuario: DatosUsuarioInterface = contactoEmpresa.datosUsuario as DatosUsuarioInterface;
      this.configuracionOperario.Nombres.valor = (datosUsuario as DatosUsuarioInterface).nombres;
      this.configuracionOperario.Apellidos.valor = (datosUsuario as DatosUsuarioInterface).apellidos;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionOperario,
        operarioEditar,
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

  validarFormulario(operario) {
    if (operario) {
      delete operario.nombres;
      delete operario.apellidos;
      this.operarioCrearEditar = operario;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.operarioCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this.operarioCrearEditar.nombreContacto = ((this.operarioCrearEditar.contactoEmpresa as ContactoEmpresaInterface).datosUsuario as DatosUsuarioInterface).nombres
    + ' ' + ((this.operarioCrearEditar.contactoEmpresa as ContactoEmpresaInterface).datosUsuario as DatosUsuarioInterface).apellidos;
    this.operarioCrearEditar.documentoContacto = ((this.operarioCrearEditar.contactoEmpresa as ContactoEmpresaInterface).datosUsuario as DatosUsuarioInterface).identificacionPais;
    this._cargandoService.habilitarCargando();
    if (this.data.operario) {
      this._operarioRestService
        .updateOne(this.data.operario.id, this.operarioCrearEditar)
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
              generarToasterErrorEditarCampoRepetido('contacto'),
            );
          },
        );
    } else {
      this.operarioCrearEditar.habilitado = true;
      this.operarioCrearEditar.puntoEmision = this.data.idPuntoEmision;
      this._operarioRestService.create(this.operarioCrearEditar).subscribe(
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
            generarToasterErrorCrearCampoRepetido('contacto'),
          );
        },
      );
    }
  }
}
