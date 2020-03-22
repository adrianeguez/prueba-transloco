import { Component, OnInit } from '@angular/core';
import { UsuarioRolInterface } from '../../../../interfaces/usuario-rol.interface';
import { UsuarioRolRestService } from '../../../../servicios/rest/usuario-rol.service';
// tslint:disable-next-line:max-line-length
import { MatDialog } from '@angular/material';
import { UsuarioInterface } from '../../../../interfaces/usuario.interface';
import { ToasterService } from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService, ModalConfirmacionComponent} from 'man-lab-ng';
import {MigaDePanInterface, RutaConMigasDePan, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ActivatedRoute, Router} from '@angular/router';
import {DatosUsuarioInterface} from '../../../../../submodulo-empresa-front/interfaces/datos-usuario.interface';
import {RUTAS_ROLES_USUARIO} from '../../../../constantes/rutas-roles-usuario';
import {RUTAS_USUARIO} from '../../../usuario/rutas/definicion-rutas/rutas-usuario';
import {RUTAS_PERMISO} from '../definicion-rutas/rutas-menu';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RolInterface} from '../../../../interfaces/rol-interface';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';
declare var datosEmpresa: string;
@Component({
  selector: 'ml-gestion-usuario-rol',
  templateUrl: './ruta-gestion-usuario-rol.component.html',
  styleUrls: ['./ruta-gestion-usuario-rol.component.sass'],
})

export class RutaGestionUsuarioRolComponent extends RutaConMigasDePan implements OnInit {
  columnas = [
    { field: 'usuario', header: 'Nombre' },
    { field: 'rol', header: 'Rol' },
    { field: 'id', header: 'Acciones' },
  ];
  usuarioSeleccionado: DatosUsuarioInterface;
  rolSeleccionado: RolInterface;
  usuariosRol: UsuarioRolInterface[];
  totalRegistros: number;
  rows = 1;

  constructor(protected _emitirMigaPanService: EmitirMigaPanService,
              protected _cargandoService: CargandoService,
              protected _activatedRoute: ActivatedRoute,
              protected _usuarioRolRestService: UsuarioRolRestService,
              protected _router: Router,
              protected _toasterServicePrivate: ToasterService,
              private readonly _autho0Service: Auth0Service,
              public dialog: MatDialog) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      // declarar rutas para migas de pan en orden
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_PERMISO.rutaGestionUsuarioRol(false, true)
    ];
    this.establecerMigas(rutas);
  }

  agreagarUsuarioRol() {
    this._cargandoService.habilitarCargando();
    const usuarioRolACrear: UsuarioRolInterface = {
      rol: this.rolSeleccionado.id as number,
      usuario: this.usuarioSeleccionado.id,
      empresaId: this._autho0Service.empresaSeleccionada.empresa.id
    };
    this._usuarioRolRestService.crearUsuarioRol(usuarioRolACrear)
      .subscribe((r: any) => {
          this._cargandoService.deshabilitarCargando();
      this.buscarRolesUsuario();
        },
        error => {
          console.error(error);
          if (error.error.message.message) {
            this._toasterServicePrivate.pop('warning', 'Cuidado', error.error.message.message );
          } else {
            this._toasterServicePrivate.pop(toastErrorConexionServidor.type, toastErrorConexionServidor.title, toastErrorConexionServidor.body);
          }
          this._cargandoService.deshabilitarCargando();
        });
  }

  setearRolSeleccionado(rol: RolInterface | boolean) {
    if (rol) {
      this.rolSeleccionado = rol as RolInterface;
      this.buscarRolesUsuario();
    }
  }

  quitarPermisoRol(rolUsuario) {
    this._cargandoService.habilitarCargando();
    this._usuarioRolRestService
      .deleteOne(rolUsuario.id)
      .subscribe(
        r => {
          this._cargandoService.deshabilitarCargando();
          this._toasterServicePrivate.pop('success', 'Correcto', 'Usuario eliminado de la lista');
          this.buscarRolesUsuario();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
        }
      );
  }

  private buscarRolesUsuario() {
    const idEmpresa = this._autho0Service.empresaSeleccionada.empresa.id;
    const query = {
      where: {
        rol: this.rolSeleccionado.id,
        empresaId: idEmpresa
      },
      relations: ['usuario', 'rol'],
      skip:  0,
      take: 1,
      order: {
        id: 'DESC'
      }
    };

    const consulta = `criterioBusqueda=${JSON.stringify(query)}`;
    this._cargandoService.habilitarCargando();
    this._usuarioRolRestService
      .findAll(consulta)
      .subscribe(
        (r: any) => {
          this.usuariosRol = r[0];
          this.totalRegistros = r[1];
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        }
      );
  }
  cargarMasDatos(event) {
    const idEmpresa = this._autho0Service.empresaSeleccionada.empresa.id;
    const query = {
      where: {
        rol: this.rolSeleccionado.id,
        empresaId: idEmpresa
      },
      relations: ['usuario', 'rol'],
      skip:  event.first,
      take: 1,
      order: {
        id: 'DESC'
      }
    };

    const consulta = `criterioBusqueda=${JSON.stringify(query)}`;
    this._cargandoService.habilitarCargando();
    this._usuarioRolRestService
      .findAll(consulta)
      .subscribe(
        (r: any) => {
          this.usuariosRol = r[0];
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        }
      );
  }
}
// export class RutaGestionUsuarioRolComponent extends RutaConMigasDePanTablaBusqueda<
//   UsuarioRolInterface,
//   UsuarioRolRestService,
//   ToasterService> implements OnInit {
//   usuarioSeleccionado: DatosUsuarioInterface;
//   rolSeleccionado: RolInterface;

//   usuariosRol: UsuarioRolInterface[];
//
//   constructor(
//     protected _emitirMigaPanService: EmitirMigaPanService,
//     protected _cargandoService: CargandoService,
//     protected _activatedRoute: ActivatedRoute,
//     protected _usuarioRolRestService: UsuarioRolRestService,
//     protected _router: Router,
//     protected _toasterServicePrivate: ToasterService,
//     public _dialog: MatDialog,
//     private readonly _toasterService: ToasterService,
//   ) {
//     super(
//       _emitirMigaPanService,
//       _activatedRoute,
//       _usuarioRolRestService,
//       _router,
//       _toasterService,
//       0,
//       10
//     );
//     this.tipoBusqueda = 'findAll';
//     this.queryParams.relations = [];
//     this.queryParams.order = {
//       id: 'DESC',
//     };
//   }
//
//   ngOnInit() {}
//
//   setearRolSeleccionado(rolSeleccionado: RolInterface | boolean) {
//     if (rolSeleccionado) {
//       this.rolSeleccionado = rolSeleccionado as RolInterface;
//       this._buscarRolesUsuario();
//     } else {
//       this.usuarioSeleccionado = undefined;
//       this.usuariosRol = [];
//     }
//   }
//
//   private _buscarRolesUsuario() {
//     this._cargandoService.habilitarCargando();
//     this._usuarioRolRestService
//       .fullUserRol(this.rolSeleccionado.id as number)
//       .subscribe(
//         (r: any) => {
//           this._cargandoService.deshabilitarCargando();
//           this.usuariosRol = r;
//         },
//         err => {
//           this._cargandoService.deshabilitarCargando();
//           this.usuariosRol = [];
//           console.error(err);
//         },
//       );
//   }
//
//   agreagarUsuarioRol() {
//     const usuarioRolACrearse: UsuarioRolInterface = {
//       user_id: this.usuarioSeleccionado.user_id,
//       rol: this.rolSeleccionado.id as number,
//     };
//     const usuarioSeleccionado = this.usuarioSeleccionado
//       .usuario as UsuarioInterface;
//     const existeUsuario = this._verificarUsuarioRol(usuarioSeleccionado);
//     if (existeUsuario) {
//       this._toasterService.pop(
//         'warning',
//         'Cuidado',
//         'No se puede agregar el registro ya existe.',
//       );
//     } else {
//       this._cargandoService.habilitarCargando();
//       this._usuarioRolRestService.create(usuarioRolACrearse).subscribe(
//         (usuarioRolCreado: any) => {
//           this._cargandoService.deshabilitarCargando();
//           const objetoUsuarioRolCreado = {
//             usuario: this.usuarioSeleccionado.usuario,
//             rol: this.rolSeleccionado,
//           };
//           this.usuariosRol.push(objetoUsuarioRolCreado);
//           this.rows = this.rows + 1;
//           this.totalRegistros = this.usuariosRol.length;
//           this._toasterService.pop(
//             'success',
//             'Correcto',
//             'Se creó correctamente.',
//           );
//         },
//         error => {
//           console.error(error);
//           this._cargandoService.deshabilitarCargando();
//         },
//       );
//     }
//   }
//
//   quitarPermisoRol(usuarioRol) {
//     const mensajeModal = `Estas seguro de quitar el usuario <strong>${usuarioRol.usuario.nombre}</strong> `;
//     const dialogRef = this._dialog.open(ModalConfirmacionComponent, {
//       height: '270px',
//       width: '600px',
//       data: { mensaje: mensajeModal },
//     });
//     const resultadoModal$ = dialogRef.afterClosed();
//     resultadoModal$.subscribe((respuesta: boolean) => {
//       if (respuesta) {
//         const indiceUsuarioRol = this.usuariosRol.indexOf(usuarioRol);
//         this._usuarioRolRestService.deleteOne(usuarioRol.id).subscribe(
//           r => {
//             this.usuariosRol.splice(indiceUsuarioRol, 1);
//             this.totalRegistros = this.usuariosRol.length;
//           },
//           error => {
//             console.error(error);
//           },
//         );
//       }
//     });
//   }
//
//   private _verificarUsuarioRol(usuario: UsuarioInterface): boolean {
//     return this.usuariosRol.some((valor: any) => {
//       const menuObjeto = Number(valor.usuario.id);
//       return usuario.id === menuObjeto;
//     });
//   }
// }
