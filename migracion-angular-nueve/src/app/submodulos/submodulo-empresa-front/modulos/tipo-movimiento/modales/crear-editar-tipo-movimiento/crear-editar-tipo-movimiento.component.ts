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
import { TipoMovimientoRestService } from '../../../../servicios/rest/tipo-movimiento-rest.service';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';
import { TipoMovimientoInterface } from '../../../../interfaces/tipo-movimiento.interface';
import {
  CONFIGURACION_TIPOMOVIMIENTO,
  ConfiguracionFormluarioTipoMovimiento,
} from '../../componentes/tipo-movimiento-formulario/tipo-movimiento-formulario.component';

@Component({
  selector: 'mlab-crear-editar-tipo-movimiento',
  templateUrl: './crear-editar-tipo-movimiento.component.html',
  styleUrls: ['./crear-editar-tipo-movimiento.component.scss'],
})
export class CrearEditarTipoMovimientoComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  tipoMovimientoCrearEditar: TipoMovimientoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionTipoMovimiento: ConfiguracionFormluarioTipoMovimiento;

  constructor(
    public dialogo: MatDialogRef<CrearEditarTipoMovimientoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { tipoMovimiento: TipoMovimientoInterface; idEmpresa },
    private readonly _toasterService: ToasterService,
    private readonly _tipoMovimientoRestService: TipoMovimientoRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.tipoMovimiento ? 'Llene' : 'Modifique'
    } los campos necesarios para el tipo de movimiento.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionTipoMovimiento = CONFIGURACION_TIPOMOVIMIENTO();
    if (this.data.tipoMovimiento) {
      const tipoMovimientoEditar = this.data.tipoMovimiento;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoMovimiento,
        tipoMovimientoEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionTipoMovimiento,
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

  validarFormulario(tipoMovimiento) {
    if (tipoMovimiento) {
      this.tipoMovimientoCrearEditar = tipoMovimiento;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.tipoMovimientoCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.tipoMovimiento) {
      this._tipoMovimientoRestService
        .updateOne(this.data.tipoMovimiento.id, this.tipoMovimientoCrearEditar)
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
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.tipoMovimientoCrearEditar.habilitado = 1;
      this.tipoMovimientoCrearEditar.empresa = this.data.idEmpresa;
      this._tipoMovimientoRestService
        .create(this.tipoMovimientoCrearEditar)
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
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }
}
