import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {MigaDePanInterface} from 'man-lab-ng/rutas/interfaces/miga-de-pan-interface';
import {UnidadMedidaRestService} from '../../../../servicios/rest/unidad-medida-rest.service';
import {WIDTH_MODAL_SELECT} from '../../../unidad-medida-articulo/constantes/tamanio-modal-unidad-articulo';
import {CrearEditarUnidadMedidaComponent} from '../../modales/crear-editar-unidad-medida/crear-editar-unidad-medida.component';
import {
  toastErrorEditar,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from './../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {UnidadMedidaInterface} from './../../../../interfaces/unidad-medida.interface';
import {RUTAS_MENU_ARTICULO} from './../../../../ruta/definicion-rutas/rutas-menu';
import {WIDTH_MODAL_UNIDAD_MEDIDA} from './../../constantes/tamanio-modal-unidad-medida';
import {AsignarArticuloComponent} from './../../modales/asignar-articulo/asignar-articulo.component';
import {RUTAS_UNIDADES_MEDIDAS} from './../definicion-rutas/rutas-unidades-medidas';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-gestion-unidad-medida',
  templateUrl: './ruta-gestion-unidad-medida.component.html',
  styleUrls: ['./ruta-gestion-unidad-medida.component.sass'],
})
export class RutaGestionUnidadMedidaComponent
  extends RutaConMigasDePanTablaBusqueda<UnidadMedidaInterface,
    UnidadMedidaRestService,
    ToasterService>
  implements OnInit {
  estados = ESTADOS;
  rows = NUMERO_FILAS_TABLAS;
  columnas = [
    {field: 'nombre', header: 'Unidad de Medida'},
    {field: 'abreviacion', header: 'Abreviacion'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected dialog: MatDialog,
    protected _router: Router,
    protected _unidadMedidaRestService: UnidadMedidaRestService,
    protected _toasterServicePrivate: ToasterService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _unidadMedidaRestService,
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
    this.ruta = RUTAS_UNIDADES_MEDIDAS.rutaGestionUnidadMedida(true, false);
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
      RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
      RUTAS_UNIDADES_MEDIDAS.rutaGestionUnidadMedida(false, true),
    ];
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
    this._cargandoService.deshabilitarCargando();
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.llamarDatos(
      event.first,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
    );
    this.loading = false;
  }

  buscarUnidadMedidaPorNombreOAbreviacion(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    const where = [
      {nombre: `Like(\"%25${valorBusqueda}%25\")`},
      {abreviacion: `Like(\"%25${valorBusqueda}%25\")`},
    ];
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order);
  }

  seteoEstadoSeleccionado(value) {
    this.optionalParams = {registroActual: undefined};
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {habilitado: estadoSeleccionado};
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order);
  }

  abrirModalCrearUnidadMedida() {
    const dialogRef = this.dialog.open(CrearEditarUnidadMedidaComponent, {
      width: WIDTH_MODAL_UNIDAD_MEDIDA,
      data: {unidadMedida: undefined},
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: UnidadMedidaInterface) => {
        if (registroCreado) {
          this.optionalParams = {registroActual: registroCreado.id};
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalEditarUnidadMedida(registro: UnidadMedidaInterface) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarUnidadMedidaComponent, {
      width: WIDTH_MODAL_UNIDAD_MEDIDA,
      data: {unidadMedida: registro},
    });

    const respuestModal$ = dialogRef.afterClosed();
    respuestModal$.subscribe(
      (registroEditado: UnidadMedidaInterface) => {
        if (registroEditado) {
          this.optionalParams = {registroActual: registroEditado.id};
          this.values.splice(indiceRegistro, 1, registroEditado); // replace
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  actualizarEstado(registro: UnidadMedidaInterface) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const unidadMedidaEnArreglo = this.values.find(
      unidadMedida => registro.id === unidadMedida.id,
    );
    const indiceUnidadMedida = this.values.indexOf(unidadMedidaEnArreglo);
    this._unidadMedidaRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceUnidadMedida].habilitado = habilitado
            ? ESTADOS.Activo
            : ESTADOS.Inactivo;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  abrirModalSeleccionarArticulo(registro) {
    const dialogRef = this.dialog.open(AsignarArticuloComponent, {
      width: WIDTH_MODAL_SELECT,
      data: {idUnidadMedida: registro.id},
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(
      (registroCreado: any) => {
        if (registroCreado) {
          this.optionalParams = {registroActual: registroCreado.id};
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  irAGestionModuloHijo(idUnidadMedida: number, moduloHijo: string) {
    const ruta = [
      'configuraciones/articulo' + '/unidad-medida-modulo',
      idUnidadMedida,
      moduloHijo + '-modulo',
      'gestion',
    ];
    this._router.navigate(ruta, {
      queryParams: {
        order: JSON.stringify(this.queryParams.order),
        skip: 0,
        take: NUMERO_FILAS_TABLAS,
        where: JSON.stringify({unidadMedida: idUnidadMedida}),
        relations: JSON.stringify(['articulo']),
      },
    });
  }
}
