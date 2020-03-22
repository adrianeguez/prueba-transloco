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
  generarToasterErrorCrearCampoRepetido,
  generarToasterErrorEditarCampoRepetido,
  toastErrorCrearEmpresa,
  toastErrorEditarEmpresa,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { PuntoEmisionInterface } from '../../../../interfaces/punto-emision.interface';
import {
  CONFIGURACION_PUNTOEMISION,
  ConfiguracionFormluarioPuntoEmision,
} from '../../componentes/punto-emision-formulario/punto-emision-formulario.component';
import { PuntoEmisionRestService } from '../../../../servicios/rest/punto-emision-rest.service';
import { ESTADOS } from '../../../../../../enums/estados';

@Component({
  selector: 'ml-crear-editar-punto-emision',
  templateUrl: './crear-editar-punto-emision.component.html',
  styleUrls: ['./crear-editar-punto-emision.component.scss'],
})
export class CrearEditarPuntoEmisionComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  puntoEmisionCrearEditar: PuntoEmisionInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionPuntoEmision: ConfiguracionFormluarioPuntoEmision;

  constructor(
    public dialogo: MatDialogRef<CrearEditarPuntoEmisionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { puntoEmision: PuntoEmisionInterface; idEstablecimiento, idEdificio: number },
    private readonly _toasterService: ToasterService,
    private readonly _puntoEmisionRestService: PuntoEmisionRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.puntoEmision ? 'Llene' : 'Modifique'
    } los campos necesarios para el punto de emisión.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionPuntoEmision = CONFIGURACION_PUNTOEMISION();
    this.configuracionPuntoEmision.EnUso.disabled = true;
    this.configuracionPuntoEmision.EnUso.hidden = true;
    if (this.data.puntoEmision) {
      const puntoEmisionEditar = this.data.puntoEmision;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionPuntoEmision,
        puntoEmisionEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionPuntoEmision,
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

  validarFormulario(puntoEmision) {
    if (puntoEmision) {
      this.puntoEmisionCrearEditar = puntoEmision;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.puntoEmisionCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.puntoEmision) {
      this._puntoEmisionRestService
        .updateOne(this.data.puntoEmision.id, this.puntoEmisionCrearEditar)
        .subscribe(
          r => {
            r.enUso = r.enUso ? 1 : 0;
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
      this.puntoEmisionCrearEditar.habilitado = true;
      this.puntoEmisionCrearEditar.enUso = false;
      this.puntoEmisionCrearEditar.establecimiento = this.data.idEstablecimiento;
      this._puntoEmisionRestService
        .create(this.puntoEmisionCrearEditar)
        .subscribe(
          r => {
            r.enUso = r.enUso ? 1 : 0;
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
