import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {Auth0Service} from '../../../servicios/auth0/auth0.service';
import * as moment from 'moment';
import {CrearEditarUsuarioComponent} from '../../../../submodulo-roles-frontend/modulos/usuario/modales/crear-editar-usuario/crear-editar-usuario.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'mlab-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  urlSalir = `${environment.url}:${environment.port}/logout`;
  fechaActual;

  constructor(public readonly _auth0Service: Auth0Service,
              private readonly _dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.fechaActual = moment();
  }

  cerrarSesion() {
    window.location.href = this.urlSalir;
  }

  abrirEditarPerfil() {
    console.log(this._auth0Service);
    const usuario = this._auth0Service.empresaSeleccionada.datoUsuario;
    const dialogRef = this._dialog.open( CrearEditarUsuarioComponent, {
      width: '500px',
      data: {
        usuario: usuario,
        esPerfil: true
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(
        respuesta => {
          this._auth0Service.empresaSeleccionada.datoUsuario = respuesta;
        },
        error => {
          console.error('error actualizando perfil');
        }
      );
  }
}
