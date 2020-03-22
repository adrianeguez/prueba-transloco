import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CargandoService, EstaTipeandoComponent } from 'man-lab-ng';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import { NombrePermisoInterface } from '../../../../interfaces/nombre-permiso-interface';
import {
  CONFIGURACION_NOMBREPERMISO,
  ConfiguracionFormluarioNombrePermiso,
} from '../../componentes/nombre-permiso/components/nombre-permiso-formulario/nombre-permiso-formulario.component';
import { PermisoNombreRestService } from '../../../../servicios/rest/permiso-nombre-rest.service';
import {RutaGestionNombrePermisoComponent} from '../../rutas/ruta-gestion-nombre-permiso/ruta-gestion-nombre-permiso.component';

@Component({
  selector: 'ml-crear-editar-nombre-permiso',
  templateUrl: './crear-editar-nombre-permiso.component.html',
  styleUrls: ['./crear-editar-nombre-permiso.component.sass'],
})
export class CrearEditarNombrePermisoComponent
  implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  nombrePermisoCrearEditar: NombrePermisoInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionNombrePermiso: ConfiguracionFormluarioNombrePermiso;

  constructor(
    public dialogo: MatDialogRef<RutaGestionNombrePermisoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { nombrePermiso: NombrePermisoInterface },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _nombrePermisoRestService: PermisoNombreRestService,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.nombrePermiso ? 'Llene' : 'Modifique'
    } los campos necesarios para el nombre del permiso.`;
    this.encerarConfiguracionDisabled();
  }
  encerarConfiguracionDisabled() {
    this.configuracionNombrePermiso = CONFIGURACION_NOMBREPERMISO();
    if (this.data.nombrePermiso) {
      const nombrePermisoAEditar = this.data.nombrePermiso;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionNombrePermiso,
        nombrePermisoAEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionNombrePermiso,
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
  validarFormulario(nombrePermiso) {
    if (nombrePermiso) {
      this.nombrePermisoCrearEditar = nombrePermiso;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.nombrePermisoCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.nombrePermiso) {
      this._nombrePermisoRestService
        .updateOne(this.data.nombrePermiso.id, this.nombrePermisoCrearEditar)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              'success',
              'Correcto',
              'Se actualizó correctamente',
            );
            this.dialogo.close(r);
          },
          err => {
            console.error(err);
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              'error',
              'Error',
              'Ocurrió un problema con el servidor',
            );
          },
        );
    } else {
      this.nombrePermisoCrearEditar.estado = true;
      this._nombrePermisoRestService
        .create(this.nombrePermisoCrearEditar)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              'success',
              'Correcto',
              'Se creó correctamente',
            );
            this.dialogo.close(r);
          },
          err => {
            console.error(err);
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(
              'error',
              'Error',
              'Ocurrió un problema con el servidor',
            );
          },
        );
    }
  }
}
