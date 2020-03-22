import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { CrearEditarNombrePermisoComponent } from '../../modales/crear-editar-nombre-permiso/crear-editar-nombre-permiso.component';
import { NombrePermisoInterface } from '../../../../interfaces/nombre-permiso-interface';
import { PermisoNombreRestService } from '../../../../servicios/rest/permiso-nombre-rest.service';
import { ESTADOS } from '../../../../../../enums/estados';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_PERMISO} from '../definicion-rutas/rutas-menu';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ml-gestion-nombre-permiso',
  templateUrl: './ruta-gestion-nombre-permiso.component.html',
  styleUrls: ['./ruta-gestion-nombre-permiso.component.sass'],
})

export class RutaGestionNombrePermisoComponent
  extends RutaConMigasDePanTablaBusqueda<NombrePermisoInterface,
    PermisoNombreRestService,
    ToasterService>
  implements OnInit {
  columnas = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'nombreModulo', header: 'Módulo'},
    {habilitado: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];
  habilitado: boolean;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _nombrePermisoRestService: PermisoNombreRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _nombrePermisoRestService,
      _router,
      _toasterServicePrivate,
      0,
      10,
    );
    this.tipoBusqueda = 'findAll';
    this.queryParams.relations = ['modulo'];
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this.habilitado = true;
 // #region: para activated
    this.ruta = RUTAS_PERMISO.rutaGestionNombrePermiso(false, true, [
      // aqui ids si son necesarios
    ]).ruta;
    this.queryParams.where = {
    };
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_PERMISO.rutaInicio(false, true, []),
      RUTAS_PERMISO.rutaGestionNombrePermiso(false, true),
    ];
    this.establecerMigas(rutas);




    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.relations = ['modulo'];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.queryParams.relations = ['modulo'];
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

  abrirModalCrearNombrePermiso(registro?) {
    if (registro) {
      this.establecerRegistroActual(registro.id);
    }
    const dialogRef = this.dialog.open(CrearEditarNombrePermisoComponent, {
      width: '700px',
      data: {
        nombrePermiso: registro,
       // mas campos que se manden al modal
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: NombrePermisoInterface) => {
      if (registroCreado) {
        const consulta = {
          where: {
            id: registroCreado.id
          },
          relations: [],
        };
        this._cargandoService.habilitarCargando();
        this._nombrePermisoRestService
          .findAll('criterioBusqueda=' + JSON.stringify(consulta))
          .subscribe(
        (registroResultado) => {
              if (!registro) {
                this.values.unshift(registroResultado[0][0]);
              } else {
                const indice = this.values.indexOf(registro);
                this.values[indice] = registroResultado[0][0];
              }
              this._cargandoService.deshabilitarCargando();
            },
            () => {
              this._cargandoService.deshabilitarCargando();
            }
          );
      }
    });
  }

actualizarEstado(registro) {
  this._cargandoService.habilitarCargando();
  const activo = registro.estado ? false : true;
  const rolEnArreglo = this.values.find(rol => registro.id === rol.id);
  const indiceRol = this.values.indexOf(rolEnArreglo);
  this._nombrePermisoRestService.updateOne(registro.id, { estado: activo }).subscribe(
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

