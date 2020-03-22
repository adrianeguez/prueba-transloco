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
  CONFIGURACION_CALIFICACIONPROVEEDOR,
  ConfiguracionFormluarioCalificacionProveedor,
} from '../../componentes/calificacion-proveedor-formulario/calificacion-proveedor-formulario.component';
import { CalificacionProveedorRestService } from '../../../../servicios/rest/calificacion-proveedor-rest.service';
import { CalificacionProveedorInterface } from '../../../../interfaces/calificacion-proveedor.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-crear-editar-calificacion-proveedor',
  templateUrl: './crear-editar-calificacion-proveedor.component.html',
  styleUrls: ['./crear-editar-calificacion-proveedor.component.sass'],
})
export class CrearEditarCalificacionProveedorComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  calificacionProveedorCrearEditar: CalificacionProveedorInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionCalificacionProveedor: ConfiguracionFormluarioCalificacionProveedor;

  constructor(
    public dialogo: MatDialogRef<CrearEditarCalificacionProveedorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      calificacionProveedor: CalificacionProveedorInterface;
      idEmpresaProveedor;
    },
    private readonly _toasterService: ToasterService,
    private readonly _calificacionProveedorRestService: CalificacionProveedorRestService,
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.calificacionProveedor ? 'Llene' : 'Modifique'
    } los campos necesarios para la calificación.`;
    this.encerarConfiguracionDisabled();
  }

  encerarConfiguracionDisabled() {
    this.configuracionCalificacionProveedor = CONFIGURACION_CALIFICACIONPROVEEDOR();
    if (this.data.calificacionProveedor) {
      const calificacionProveedorEditar = this.data.calificacionProveedor;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionCalificacionProveedor,
        calificacionProveedorEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionCalificacionProveedor,
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

  validarFormulario(calificacionProveedor) {
    if (calificacionProveedor) {
      this.calificacionProveedorCrearEditar = calificacionProveedor;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.calificacionProveedorCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.calificacionProveedor) {
      this._calificacionProveedorRestService
        .guardarCalificacionProveedor({
          calificacion: this.calificacionProveedorCrearEditar,
          idCalificacion: this.data.calificacionProveedor.id,
          idEmpresaProveedor: this.data.idEmpresaProveedor,
        })
        .subscribe(
          r => {
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
      this.calificacionProveedorCrearEditar.empresaProveedor = this.data.idEmpresaProveedor;
      this._calificacionProveedorRestService
        .guardarCalificacionProveedor({
          calificacion: this.calificacionProveedorCrearEditar,
          idEmpresaProveedor: +this.data.idEmpresaProveedor,
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
