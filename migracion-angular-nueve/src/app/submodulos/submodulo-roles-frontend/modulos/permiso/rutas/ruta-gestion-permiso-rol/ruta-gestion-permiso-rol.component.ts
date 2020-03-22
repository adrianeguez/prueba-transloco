import { Component, OnInit } from '@angular/core';
import { RolInterface } from '../../../../interfaces/rol-interface';
import { MatDialog } from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import { ToasterService } from 'angular2-toaster';
import { NombrePermisoInterface } from '../../../../interfaces/nombre-permiso-interface';
import { PermisoRolRestService } from '../../../../servicios/rest/permiso-rol.service';
import { PermisoRolInterface } from '../../../../interfaces/permiso-rol.interface';
import {CargandoService, EmitirMigaPanService, ModalConfirmacionComponent} from 'man-lab-ng';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {ActivatedRoute, Router} from '@angular/router';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {RUTAS_PERMISO} from '../definicion-rutas/rutas-menu';

@Component({
  selector: 'ml-gestion-permiso-rol',
  templateUrl: './ruta-gestion-permiso-rol.component.html',
  styleUrls: ['./ruta-gestion-permiso-rol.component.sass'],
})
export class RutaGestionPermisoRolComponent
  extends RutaConMigasDePanTablaBusqueda<PermisoRolInterface,
    PermisoRolRestService,
    ToasterService>
  implements OnInit {
  rolSeleccionado: RolInterface;
  nombrePermisoEncontrados: NombrePermisoInterface[] = [];
  columnas = [
    { field: 'nombre', header: 'Nombre' },
  ];
  totalRegistros = 0;
  rows = 3;
  permisosSeleccionados: NombrePermisoInterface[] = [];
  columnasPermisosRol = [
    {field: 'nombrePermiso', header: 'Nombre'},
    {field: 'nombrePermiso', header: 'Módulo'},
    {field: 'id', header: 'Acciones'},
  ];
  habilitado: boolean;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _permisoRolRestService: PermisoRolRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _permisoRolRestService,
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
    // #region: para activated
    this.ruta = RUTAS_PERMISO.rutaGestionPermisoRol(false, true, [
      // aqui ids si son necesarios
    ]).ruta;
    this.queryParams.where = {
    };
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_PERMISO.rutaGestionPermisoRol(false, true),
    ];
    this.habilitado = true;
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
  }

  setearNombresPermisoEncontrados(
    nombresPermisosEncontrado: NombrePermisoInterface[],
  ) {
    this.nombrePermisoEncontrados = nombresPermisosEncontrado;
    this.totalRegistros = this.nombrePermisoEncontrados.length;
  }

  setearRolSeleccionado(rolSeleccionado: RolInterface | boolean) {
    if (rolSeleccionado) {
      this.rolSeleccionado = rolSeleccionado as RolInterface;
      // this._buscarPermisosRol(this.rolSeleccionado);
      this.queryParams.where = {
        rol: this.rolSeleccionado.id,
      };
      this.queryParams.relations = ['nombrePermiso', 'nombrePermiso.modulo'];
      this.queryParams.order = {
        id: 'DESC'
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.rolSeleccionado = undefined;
    }
  }

  agregarApermisoRol() {
    const mensajeModal = `Estas seguro de agregar los permisos seleccionados`;
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      height: '270px',
      width: '600px',
      data: { mensaje: mensajeModal },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((respuesta: boolean) => {
      if (respuesta) {
        const nombrePermisoRolACrear: any[] = this.permisosSeleccionados
          .map(nombrePermiso => {
            return {
              nombrePermiso,
              rol: this.rolSeleccionado.id
            };
          });
        this._cargandoService.habilitarCargando();
        this._permisoRolRestService.create(nombrePermisoRolACrear).subscribe(
          (r: any) => {
            this._cargandoService.deshabilitarCargando();
            // this.permisosRol.push();
            this.values.unshift(...r);
            this.totalRecords = this.values.length;
            const copiaNombrePermisosEncontrados = Object.assign([], this.nombrePermisoEncontrados);
            copiaNombrePermisosEncontrados.map( valor => {
              const existeEnSeleccionados = this.permisosSeleccionados.some(seleccionado => seleccionado.id === valor.id);
              if (existeEnSeleccionados) {
                const indice = this.nombrePermisoEncontrados.indexOf(valor);
                this.nombrePermisoEncontrados.splice(indice, 1);
              }
            });
            this.totalRegistros = this.nombrePermisoEncontrados.length;
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
      }
    });
  }

  quitarPermisoRol(permisoRol) {
    const mensajeModal = `Estas seguro de quitar el permisoRol <strong>${permisoRol.nombrePermiso.nombre}-${permisoRol.nombrePermiso.modulo.nombreModulo}</strong> `;
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      height: '270px',
      width: '600px',
      data: { mensaje: mensajeModal },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((respuesta: boolean) => {
      if (respuesta) {
        const indicePermisoRol = this.values.indexOf(permisoRol);
        this._cargandoService.habilitarCargando();
        this._permisoRolRestService.deleteOne(permisoRol.id).subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this.values.splice(indicePermisoRol, 1);
            this.totalRecords = this.values.length;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
      }
    });
  }

  buscarPorIdentificadorONombre(busqueda: string) {
    if (busqueda === '') {
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.where = {
        rol: this.rolSeleccionado.id,
      };
      this.queryParams.relations = ['nombrePermiso', 'nombrePermiso.modulo'];
      this.queryParams.camposABuscar = undefined;
      this.queryParams.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    } else {
      this.queryParams.relations = ['nombrePermiso', 'nombrePermiso.modulo'];
      this.queryParams.skip = 0;
      this.queryParams.take = 10;
      this.queryParams.order = {
        id: 'DESC',
      };
      this.queryParams.camposABuscar = undefined;
      this.queryParams.where = {
        rol: this.rolSeleccionado.id,
      };
      this.tipoBusqueda = 'findAll';
      this.llamarDatosPorQueryParamsRelationsYTipoBusqueda();
    }
  }

}
