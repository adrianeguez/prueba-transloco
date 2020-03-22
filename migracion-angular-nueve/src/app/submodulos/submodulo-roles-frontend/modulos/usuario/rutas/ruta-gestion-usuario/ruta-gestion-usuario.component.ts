import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import { DatosUsuarioInterface } from 'src/app/submodulos/submodulo-empresa-front/interfaces/datos-usuario.interface';
import {DatosUsuarioRestService} from '../../../../servicios/rest/datos-usuario-rest.service';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_USUARIO} from '../definicion-rutas/rutas-usuario';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {CrearEditarUsuarioComponent} from '../../modales/crear-editar-usuario/crear-editar-usuario.component';
import {Auth0Service} from '../../../../servicios/rest/auth0.service';

@Component({
  selector: 'ml-gestion-usuario',
  templateUrl: './ruta-gestion-usuario.component.html',
  styleUrls: ['./ruta-gestion-usuario.component.sass'],
})
export class RutaGestionUsuarioComponent extends RutaConMigasDePanTablaBusqueda<DatosUsuarioInterface,
  DatosUsuarioRestService,
  ToasterService>
  implements OnInit  {

  columnas = [
    { field: 'nombres', header: 'Nombres' },
    { field: 'apellidos', header: 'Apellidos' },
    { field: 'identificacionPais', header: 'Identificación'},
    { field: 'direccion', header: 'Dirección' },
    { field: 'celular', header: 'Celular' },
    { field: 'id', header: 'Acciones' },
  ];
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _usuarioAuth0RestService: DatosUsuarioRestService,
    protected _toasterServicePrivate: ToasterService,
    private readonly _auth0Service: Auth0Service,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _usuarioAuth0RestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );
    this.tipoBusqueda = 'findAll';
    // this.queryParams.relations = [];
    this.queryParams.order = {
      id: 'DESC',
    };
  }
  ngOnInit() {
this.ruta = RUTAS_USUARIO.rutaGestionUsuarios(false, true).ruta;
  const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
    RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
    RUTAS_USUARIO.rutaGestionUsuarios(false, true)
  ];
  this.establecerMigas(rutas);
  this.escucharCambiosEnQueryParams();
  this.escucharCambiosEnParametros();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      // this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {};
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      // this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = [
        // find where or
        {
          apellidos: `Like("%25${busqueda}%25")`
        },
        {
          identificacionPais: busqueda
        }
      ];
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }
  abrirModalCrearUsuario(registro?) {
    if (registro) {
      this.establecerRegistroActual(registro.id);
    }
    const dialogRef = this.dialog.open(CrearEditarUsuarioComponent, {
      width: '700px',
      data: {
        usuario: registro
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado) => {
      if (registroCreado) {
        if (registro) {
          this.establecerRegistroActual(registro.id);
          const indice = this.values.indexOf(registro);
          this.values[indice] = registroCreado;
        } else {
          this.values.unshift(registroCreado);
        }
        console.log('registro creado', registroCreado);
      }
    });
  }
}
