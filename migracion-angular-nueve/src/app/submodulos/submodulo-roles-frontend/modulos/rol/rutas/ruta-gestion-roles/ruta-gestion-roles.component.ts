import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RolRestService} from '../../../../servicios/rest/rol.service';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { MatDialog } from '@angular/material/dialog';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RolInterface} from '../../../../interfaces/rol-interface';
import {ToasterService} from 'angular2-toaster';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {CrearEditarRolComponent} from '../../modales/crear-editar-rol/crear-editar-rol.component';
import {RUTAS_ROL} from '../definicion-rutas/rutas-rol';


@Component({
  selector: 'ml-gestion-roles',
  templateUrl: './ruta-gestion-roles.component.html',
  styleUrls: ['./ruta-gestion-roles.component.sass'],
})
export class RutaGestionRolesComponent
  extends RutaConMigasDePanTablaBusqueda<RolInterface,
    RolRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];
  habilitado: boolean;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _rolRestService: RolRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _rolRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );
    this.tipoBusqueda = 'findAll';
    this.queryParams.relations = [];
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this.habilitado = true;
    // #region: para activated
    this.ruta = RUTAS_ROL.rutaGestionRoles(false, true, [
      // aqui ids si son necesarios
    ]).ruta;
    this.queryParams.where = {
    };
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_ROL.rutaGestionRoles(false, true),
    ];
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = [];
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
      this.queryParams.relations = [];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = [
        {
          nombre: `Like("%25${busqueda}%25")`,
        }
      ];
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

  abrirModalCrearRol(registro?) {
    if (registro) {
      this.establecerRegistroActual(registro.id);
    }
    const dialogRef = this.dialog.open(CrearEditarRolComponent, {
      width: '700px',
      data: {
        rol: registro,
        // mas campos que se manden al modal
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: RolInterface) => {
      if (registroCreado) {
        if (registro) {
          const indice = this.values.indexOf(registro);
          this.values[indice] = registroCreado;
        } else {
          this.values.unshift(registroCreado);
        }
      }
    });
  }
  actualizarEstado(registro: RolInterface) {
    this._cargandoService.habilitarCargando();
    const activo = registro.estado ? false : true;
    const rolEnArreglo = this.values.find(rol => registro.id === rol.id);
    const indiceRol = this.values.indexOf(rolEnArreglo);
    this._rolRestService.updateOne(registro.id, { estado: activo }).subscribe(
      r => {
        this._cargandoService.deshabilitarCargando();
        this.values[indiceRol].estado = activo ? 1 : 0;
        this._toasterService.pop('success', 'Éxito', 'Estado actualizado');
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(
          'error',
          'Error',
          'Lo sentimos ocurrió un error con el servidor.',
        );
      },
    );
  }
}

