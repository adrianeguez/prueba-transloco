import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CargandoService, EstaTipeandoComponent} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {establecerValoresConfiguracionAbstractControl} from '@manticore-labs/ng-api';
import {ContactoEmpresaInterface} from '../../../../interfaces/contacto-empresa.interface';
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar
} from '../../../../../../constantes/mensajes-toaster';
import {AdministradorEstablecimientoInterface} from '../../../../interfaces/administrador-establecimiento.interface';
import {
  CONFIGURACION_ADMINISTRADORESTABLECIMIENTO,
  ConfiguracionFormluarioAdministradorEstablecimiento
} from '../../componentes/formulario-administrador-establecimiento/administrador-establecimiento-formulario.component';
import {AdministradorEstablecimientoRestService} from '../../../../servicios/rest/administrador-establecimiento-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-crear-editar-administrador',
  templateUrl: './crear-editar-administrador.component.html',
  styleUrls: ['./crear-editar-administrador.component.scss']
})
export class CrearEditarAdministradorComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  administradorEstablecimiento: AdministradorEstablecimientoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionAdministradorEstablecimiento: ConfiguracionFormluarioAdministradorEstablecimiento;

  constructor(
    public dialogo: MatDialogRef<CrearEditarAdministradorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { administradorEstablecimiento: AdministradorEstablecimientoInterface; idEstablecimiento; idEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _administradorEstablecimientoRestService: AdministradorEstablecimientoRestService,
    private readonly _cargandoService: CargandoService,
  ) {
  }

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.administradorEstablecimiento ? 'Llene' : 'Modifique'
      } los campos necesarios para el administrador.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionAdministradorEstablecimiento = CONFIGURACION_ADMINISTRADORESTABLECIMIENTO();
    if (!this.data.administradorEstablecimiento) {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionAdministradorEstablecimiento,
        {},
      );
    } else {
      const admnistradorEstablecimientoEditar: AdministradorEstablecimientoInterface = this.data.administradorEstablecimiento;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionAdministradorEstablecimiento,
        admnistradorEstablecimientoEditar,
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

  validarFormulario(administrador) {
    if (administrador) {
      this.administradorEstablecimiento = administrador;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.administradorEstablecimiento = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this.administradorEstablecimiento.contactoEmpresa =
      (this.administradorEstablecimiento.contactoEmpresa as ContactoEmpresaInterface).id;
    this.administradorEstablecimiento.gestionaPtoEmision =
      +this.administradorEstablecimiento.gestionaPtoEmision === 1;
    this._cargandoService.habilitarCargando();
    if (this.data.administradorEstablecimiento) {
      this._administradorEstablecimientoRestService
        .updateOne(this.data.administradorEstablecimiento.id, this.administradorEstablecimiento)
        .subscribe(
          r => {
            r.habilitado = r.habilitado ? 1 : 0;
            r.gestionaPtoEmision = r.gestionaPtoEmision ? 1 : 0;
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
      this.administradorEstablecimiento.habilitado = true;
      this.administradorEstablecimiento.establecimiento = this.data.idEstablecimiento;
      this._administradorEstablecimientoRestService.create(this.administradorEstablecimiento).subscribe(
        r => {
          r.habilitado = r.habilitado ? 1 : 0;
          r.gestionaPtoEmision = r.gestionaPtoEmision ? 1 : 0;
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
