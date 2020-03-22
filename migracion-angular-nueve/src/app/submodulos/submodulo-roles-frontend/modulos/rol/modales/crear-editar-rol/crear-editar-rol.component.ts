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
import { RolInterface } from '../../../../interfaces/rol-interface';
import { establecerValoresConfiguracionAbstractControl } from '@manticore-labs/ng-api';
import {
  CONFIGURACION_ROL,
  ConfiguracionFormluarioRol,
} from '../../componentes/rol-formulario/rol-formulario.component';
import { RutaGestionRolesComponent } from '../../rutas/ruta-gestion-roles/ruta-gestion-roles.component';
import { RolRestService } from '../../../../servicios/rest/rol.service';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';

@Component({
  selector: 'ml-crear-editar-rol',
  templateUrl: './crear-editar-rol.component.html',
  styleUrls: ['./crear-editar-rol.component.sass'],
})
export class CrearEditarRolComponent implements OnInit, AfterViewInit {
  descripcion: string;
  formularioValido: boolean;
  rolCrearEditar: RolInterface;
  @ViewChild(EstaTipeandoComponent)
  componenteEstaTipeando: EstaTipeandoComponent;
  configuracionRol: ConfiguracionFormluarioRol;

  constructor(
    public dialogo: MatDialogRef<RutaGestionRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rol: RolInterface },
    private readonly _toasterService: ToasterService,
    private readonly _cargandoService: CargandoService,
    private readonly _rolRestService: RolRestService,
    private readonly _auth0Service: Auth0Service,
  ) {}

  ngOnInit(): void {
    this.descripcion = `${
      !this.data.rol ? 'Llene' : 'Modifique'
    } los campos necesarios para el rol.`;
    this.encerarConfiguracionDisabled();
  }
  encerarConfiguracionDisabled() {
    this.configuracionRol = CONFIGURACION_ROL();
    if (this.data.rol) {
      const rolAEditar = this.data.rol;
      establecerValoresConfiguracionAbstractControl(
        this.configuracionRol,
        rolAEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(this.configuracionRol, {});
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
  validarFormulario(rol) {
    if (rol) {
      this.rolCrearEditar = rol;
      this.formularioValido = true;
      this.OcultarEstaTipeando();
    } else {
      this.formularioValido = false;
      this.rolCrearEditar = {};
      this.OcultarEstaTipeando();
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.rol) {
      this._rolRestService
        .updateOne(this.data.rol.id, this.rolCrearEditar)
        .subscribe(
          r => {
            this._toasterService.pop(
              'success',
              'Correcto',
              'Se actualizó correctamente',
            );
            this._cargandoService.deshabilitarCargando();
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
      this.rolCrearEditar.estado = true;
      this.rolCrearEditar.empresa = this._auth0Service.empresaSeleccionada.empresa.id;
      this._rolRestService.create(this.rolCrearEditar).subscribe(
        r => {
          this._toasterService.pop(
            'success',
            'Correcto',
            'Se creó correctamente',
          );
          this._cargandoService.deshabilitarCargando();
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
