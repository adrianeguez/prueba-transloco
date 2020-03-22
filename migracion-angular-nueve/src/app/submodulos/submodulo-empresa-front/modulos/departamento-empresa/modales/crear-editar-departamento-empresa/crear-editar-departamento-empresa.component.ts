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
  CONFIGURACION_DEPARTAMENTOEMPRESA,
  ConfiguracionFormluarioDepartamentoEmpresa,
} from '../../componentes/departamento-empresa-formulario/departamento-empresa-formulario.component';
// tslint:disable-next-line:max-line-length
import { DepartamentoEmpresaRestService } from '../../../../servicios/rest/departamento-empresa-rest.service';
import { DepartamentoEmpresaInterface } from '../../../../interfaces/departamento-empresa.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';

@Component({
  selector: 'ml-crear-editar-departamento-empresa',
  templateUrl: './crear-editar-departamento-empresa.component.html',
  styleUrls: ['./crear-editar-departamento-empresa.component.sass'],
})
export class CrearEditarDepartamentoEmpresaComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  departamentoEmpresaCrearEditar: DepartamentoEmpresaInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionDepartamentoEmpresa: ConfiguracionFormluarioDepartamentoEmpresa;

  constructor(
    public dialogo: MatDialogRef<CrearEditarDepartamentoEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      departamentoEmpresa: DepartamentoEmpresaInterface;
      idEmpresa;
      departamentoEmpresaPadre;
    },
    private readonly _toasterService: ToasterService,
    private readonly _departamentoEmpresaRestService: DepartamentoEmpresaRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.departamentoEmpresa ? 'Llene' : 'Modifique'
    } los campos necesarios para el departamento.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionDepartamentoEmpresa = CONFIGURACION_DEPARTAMENTOEMPRESA();
    this.configuracionDepartamentoEmpresa.Nivel.disabled = true;

    if (this.data.departamentoEmpresa) {
      const departamentoEmpresaEditar = this.data.departamentoEmpresa;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDepartamentoEmpresa,
        departamentoEmpresaEditar,
      );
    } else {
      // tslint:disable-next-line:max-line-length
      this.configuracionDepartamentoEmpresa.Nivel.valor = this.data
        .departamentoEmpresaPadre
        ? this.data.departamentoEmpresaPadre.nivel + 1
        : 0;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDepartamentoEmpresa,
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

  validarFormulario(departamentoEmpresa) {
    if (departamentoEmpresa) {
      this.departamentoEmpresaCrearEditar = departamentoEmpresa;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.departamentoEmpresaCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.departamentoEmpresa) {
      if (this.departamentoEmpresaCrearEditar.departamentoEmpresaPadre === '') {
        this.departamentoEmpresaCrearEditar.departamentoEmpresaPadre = null;
      }
      this._departamentoEmpresaRestService
        .updateOne(
          this.data.departamentoEmpresa.id,
          this.departamentoEmpresaCrearEditar,
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
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.departamentoEmpresaCrearEditar.habilitado = true;
      this.departamentoEmpresaCrearEditar.empresa = this.data.idEmpresa;
      if (this.data.departamentoEmpresaPadre) {
        this.departamentoEmpresaCrearEditar.departamentoEmpresaPadre = this.data.departamentoEmpresaPadre.id;
      }
      this._departamentoEmpresaRestService
        .create(this.departamentoEmpresaCrearEditar)
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
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }
}
