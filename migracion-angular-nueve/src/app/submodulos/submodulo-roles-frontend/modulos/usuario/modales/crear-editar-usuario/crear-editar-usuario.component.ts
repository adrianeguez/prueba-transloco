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
import {establecerValoresConfiguracionAbstractControl, FormularioModal} from '@manticore-labs/ng-api';
import { RutaGestionUsuarioComponent } from '../../rutas/ruta-gestion-usuario/ruta-gestion-usuario.component';

import {
  DatosUsuarioRestService,
} from '../../../../servicios/rest/datos-usuario-rest.service';
import {DatosUsuarioInterface} from '../../../../../submodulo-empresa-front/interfaces/datos-usuario.interface';
import {
  CONFIGURACION_DATOSUSUARIO,
  ConfiguracionFormluarioDatosUsuario
} from '../../componentes/datos-usuario-formulario/datos-usuario-formulario.component';
import {Auth0Service} from '../../../../servicios/rest/auth0.service';
import {observable} from 'rxjs';

@Component({
  selector: 'ml-crear-editar-usuario',
  templateUrl: './crear-editar-usuario.component.html',
  styleUrls: ['./crear-editar-usuario.component.sass'],
})
export class CrearEditarUsuarioComponent extends FormularioModal<DatosUsuarioInterface, ConfiguracionFormluarioDatosUsuario,
  DatosUsuarioRestService> implements OnInit, AfterViewInit {

  constructor(
    public dialogo: MatDialogRef<RutaGestionUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: DatosUsuarioInterface, esPerfil: boolean },
    private readonly _toasterService: ToasterService,
    private readonly _datosUsuarioService: DatosUsuarioRestService,
    private readonly _auth0Service: Auth0Service,
    private readonly _cargandoService: CargandoService,
  ) {
    super(
      _datosUsuarioService,
      _cargandoService,
      _toasterService,
      data.usuario,
    );
  }
  ngOnInit(): void {
    this.encerarConfiguracionDisabled();
  }
  private encerarConfiguracionDisabled() {
    this.configuracionDisabled = CONFIGURACION_DATOSUSUARIO();
    if (this.data.usuario) {
      // logica para deshabilitar campos aqui
      if (this.data.esPerfil) {
        this.configuracionDisabled.IdentificacionPais.disabled = true;
      }
      const datoUsuarioEditar = Object.assign(
        {},
        this.data.usuario,
      );
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        datoUsuarioEditar,
      );
    } else {
      establecerValoresConfiguracionAbstractControl(
        this.configuracionDisabled,
        {},
      );
    }
  }

  editarOCrear() {
    console.log('this.registro', this.registroCrearEditar);
    let observableCrearEditar$;
    if (this.registro) {
      observableCrearEditar$ = this._datosUsuarioService.updateOne(this.registro.id, this.registroCrearEditar);
    } else {
      observableCrearEditar$ = this._auth0Service.guardarUsuario(this.registroCrearEditar);
    }
    this._cargandoService.habilitarCargando();
    observableCrearEditar$
      .subscribe(
        registroCreado => {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop('success', this.toasterTitulo, this.toasterDescripcion);
          this.cerrarModal(registroCreado);
        },
        error => {
          this._toasterService.pop('error', this.toasterTituloError, this.toasterDescripcionError);
          this._cargandoService.deshabilitarCargando();
          console.log({
            error: error,
            mensaje: 'Error guardando/actualizando registro'
          });
        }
      );
  }
}
