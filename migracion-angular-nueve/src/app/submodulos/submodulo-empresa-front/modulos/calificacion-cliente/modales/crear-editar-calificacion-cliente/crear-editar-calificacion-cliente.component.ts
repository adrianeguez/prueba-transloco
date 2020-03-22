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
  CONFIGURACION_CALIFICACIONCLIENTE,
  ConfiguracionFormluarioCalificacionCliente,
} from '../../componentes/calificacion-cliente-formulario/calificacion-cliente-formulario.component';
import { CalificacionClienteRestService } from '../../../../servicios/rest/calificacion-cliente-rest.service';
import { CalificacionClienteInterface } from '../../../../interfaces/calificacion-cliente.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-crear-editar-calificacion-cliente',
  templateUrl: './crear-editar-calificacion-cliente.component.html',
  styleUrls: ['./crear-editar-calificacion-cliente.component.sass'],
})
export class CrearEditarCalificacionClienteComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  calificacionClienteCrearEditar: CalificacionClienteInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionCalificacionCliente: ConfiguracionFormluarioCalificacionCliente;

  constructor(
    public dialogo: MatDialogRef<CrearEditarCalificacionClienteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      calificacionCliente: CalificacionClienteInterface;
      idEmpresaCliente;
    },
    private readonly _toasterService: ToasterService,
    private readonly _calificacionClienteRestService: CalificacionClienteRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.calificacionCliente ? 'Llene' : 'Modifique'
    } los campos necesarios para la calificación.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionCalificacionCliente = CONFIGURACION_CALIFICACIONCLIENTE();
    if (this.data.calificacionCliente) {
      const calificacionClienteEditar = this.data.calificacionCliente;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionCalificacionCliente,
        calificacionClienteEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionCalificacionCliente,
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

  validarFormulario(calificacionCliente) {
    if (calificacionCliente) {
      this.calificacionClienteCrearEditar = calificacionCliente;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.calificacionClienteCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.calificacionCliente) {
      this._calificacionClienteRestService
        .guardarCalificacionCliente({
          calificacion: this.calificacionClienteCrearEditar,
          idCalificacion: this.data.calificacionCliente.id,
          idEmpresaCliente: this.data.idEmpresaCliente,
        })
        .subscribe(
          (r: CalificacionClienteInterface) => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            r.calificacion = +r.calificacion.toFixed(2);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.calificacionClienteCrearEditar.empresaCliente = this.data.idEmpresaCliente;
      this._calificacionClienteRestService
        .guardarCalificacionCliente({
          calificacion: this.calificacionClienteCrearEditar,
          idEmpresaCliente: +this.data.idEmpresaCliente,
        })
        .subscribe(
          r => {
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
