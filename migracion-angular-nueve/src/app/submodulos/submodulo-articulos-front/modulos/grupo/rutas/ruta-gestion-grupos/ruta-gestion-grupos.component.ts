import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { GrupoRestService } from '../../../../servicios/rest/grupo-rest.service';
import { CrearEditarGrupoComponent } from '../../modales/crear-editar-grupo/crear-editar-grupo.component';
import { RUTAS_GRUPOS } from '../definicion-rutas/rutas-grupos';
import {
  toastErrorEditar,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from './../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { GrupoInterface } from './../../../../interfaces/grupo.interface';
import { RUTAS_MENU_ARTICULO } from './../../../../ruta/definicion-rutas/rutas-menu';
import { WIDTH_MODAL_GRUPO } from './../../constantes/tamanio-modal-grupo';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-gestion-grupos',
  templateUrl: './ruta-gestion-grupos.component.html',
  styleUrls: ['./ruta-gestion-grupos.component.sass'],
})
export class RutaGestionGruposComponent
  extends RutaConMigasDePanTablaBusqueda<
    GrupoInterface,
    GrupoRestService,
    ToasterService
  >
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;
  estados = ESTADOS;
  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'codigo', header: 'Código' },
    { field: 'empresaProductora', header: 'Empresa productora' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected dialog: MatDialog,
    protected _router: Router,
    protected _grupoRestService: GrupoRestService,
    protected _toasterServicePrivate: ToasterService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _grupoRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this.ruta = RUTAS_GRUPOS.rutaGestionGrupo(true, false);
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
      RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
      RUTAS_GRUPOS.rutaGestionGrupo(false, true),
    ];
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.llamarDatos(
      this.queryParams.skip,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
    );
    this.loading = false;
  }

  buscarGrupoPorNombreOCodigoOCodigoAuxiliar(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    const where = [
      { nombre: `Like(\"%25${this.busqueda}%25\")` },
      { codigo: `Like(\"%25${this.busqueda}%25\")` },
    ];
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
  }

  seteoEstadoSeleccionado(value) {
    this._cargandoService.habilitarCargando();
    this.optionalParams = { registroActual: undefined };
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = { habilitado: estadoSeleccionado };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
    this._cargandoService.deshabilitarCargando();
  }

  abrirModalCrearGrupo() {
    const dialogRef = this.dialog.open(CrearEditarGrupoComponent, {
      width: WIDTH_MODAL_GRUPO,
      data: { grupo: undefined },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: GrupoInterface) => {
        if (registroCreado) {
          this.optionalParams = { registroActual: registroCreado.id };
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalEditarGrupo(registro: GrupoInterface) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarGrupoComponent, {
      width: WIDTH_MODAL_GRUPO,
      data: { grupo: registro },
    });

    const respuestModal$ = dialogRef.afterClosed();
    respuestModal$.subscribe(
      (registroEditado: GrupoInterface) => {
        if (registroEditado) {
          this.optionalParams = { registroActual: registroEditado.id };
          this.values.splice(indiceRegistro, 1, registroEditado);
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  actualizarEstado(registro: GrupoInterface) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const grupoEnArreglo = this.values.find(grupo => registro.id === grupo.id);
    const indiceGrupo = this.values.indexOf(grupoEnArreglo);
    this._grupoRestService.updateOne(registro.id, { habilitado }).subscribe(
      () => {
        this._cargandoService.deshabilitarCargando();
        this.values[indiceGrupo].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
        this._toasterService.pop(toastExitoEditar);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  irAGestionModuloHijo(idGrupo: GrupoInterface, moduloHijo: string) {
    const ruta = [
      'configuraciones/articulo',
      'grupo-modulo',
      idGrupo,
      moduloHijo + '-modulo',
      'gestion',
    ];
    this._router.navigate(ruta, {
      queryParams: {
        order: JSON.stringify(this.queryParams.order),
        skip: 0,
        take: NUMERO_FILAS_TABLAS,
        where: JSON.stringify({ grupo: idGrupo }),
      },
    });
  }
}
