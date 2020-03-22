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
import { EstablecimientoInterface } from '../../../../interfaces/establecimiento.interface';
import {
  CONFIGURACION_ESTABLECIMIENTO,
  ConfiguracionFormluarioDireccion,
} from '../../componentes/establecimiento-formulario/establecimiento-formulario.component';
// tslint:disable-next-line:max-line-length
import { EstablecimientoRestService } from '../../../../servicios/rest/establecimiento-rest.service';
import {
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';

@Component({
  selector: 'ml-crear-editar-establecimiento',
  templateUrl: './crear-editar-establecimiento.component.html',
  styleUrls: ['./crear-editar-establecimiento.component.sass'],
})
export class CrearEditarEstablecimientoComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  establecimientoCrearEditar: EstablecimientoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionEstablecimiento: ConfiguracionFormluarioDireccion;

  constructor(
    public dialogo: MatDialogRef<CrearEditarEstablecimientoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { establecimiento: EstablecimientoInterface; idEdificio },
    private readonly _toasterService: ToasterService,
    private readonly _establecimientoRestService: EstablecimientoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.establecimiento ? 'Llene' : 'Modifique'
    } los campos necesarios para el establecimiento.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionEstablecimiento = CONFIGURACION_ESTABLECIMIENTO();
    if (this.data.establecimiento) {
      const establecimientoEditar = this.data.establecimiento;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEstablecimiento,
        establecimientoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionEstablecimiento,
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

  validarFormulario(establecimiento) {
    if (establecimiento) {
      this.establecimientoCrearEditar = establecimiento;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.establecimientoCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.establecimiento) {
      this._establecimientoRestService
        .updateOne(
          this.data.establecimiento.id,
          this.establecimientoCrearEditar,
        )
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
              generarToasterErrorEditarCampoRepetido('codigo'),
            );
          },
        );
    } else {
      this.establecimientoCrearEditar.habilitado = 1;
      this.establecimientoCrearEditar.edificio = +this.data.idEdificio;
      this._establecimientoRestService
        .create(this.establecimientoCrearEditar)
        .subscribe(
          r => {
            r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(
              generarToasterErrorCrearCampoRepetido('codigo'),
            );
          },
        );
    }
  }
}
