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
  generarToasterErrorCrearCampoRepetido,
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';
import { TipoCargoInterface } from '../../../../interfaces/tipo-cargo.interface';
import {
  CONFIGURACION_TIPOCARGO,
  ConfiguracionFormluarioTipoCargo,
} from '../../componentes/tipo-cargo-formulario/tipo-cargo-formulario.component';
import { TipoCargoRestService } from '../../../../servicios/rest/tipo-cargo-rest.service';

@Component({
  selector: 'app-crear-editar-tipo-cargo',
  templateUrl: './crear-editar-tipo-cargo.component.html',
  styleUrls: ['./crear-editar-tipo-cargo.component.scss'],
})
export class CrearEditarTipoCargoComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  tipoCargoCrearEditar: TipoCargoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionTipoCargo: ConfiguracionFormluarioTipoCargo;

  constructor(
    public dialogo: MatDialogRef<CrearEditarTipoCargoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { tipoCargo: TipoCargoInterface; idEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _tipoCargoRestService: TipoCargoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.tipoCargo ? 'Llene' : 'Modifique'
    } los campos necesarios para el tipo de cargo.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionTipoCargo = CONFIGURACION_TIPOCARGO();
    if (this.data.tipoCargo) {
      const tipoCargoEditar = this.data.tipoCargo;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoCargo,
        tipoCargoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoCargo,
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

  validarFormulario(tipoCargo) {
    if (tipoCargo) {
      this.tipoCargoCrearEditar = tipoCargo;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.tipoCargoCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.tipoCargo) {
      this._tipoCargoRestService
        .updateOne(this.data.tipoCargo.id, this.tipoCargoCrearEditar)
        .subscribe(
          r => {
            r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(generarToasterErrorCrearCampoRepetido('código'));
          },
        );
    } else {
      this.tipoCargoCrearEditar.habilitado = true;
      this.tipoCargoCrearEditar.empresa = +this.data.idEmpresa;
      this._tipoCargoRestService.create(this.tipoCargoCrearEditar).subscribe(
        r => {
          r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastExitoCrear);
          this.dialogo.close(r);
        },
        err => {
          this._cargandoService.deshabilitarCargando();
          console.error(err);
          this._toasterService.pop(generarToasterErrorCrearCampoRepetido('código'));
        },
      );
    }
  }
}
