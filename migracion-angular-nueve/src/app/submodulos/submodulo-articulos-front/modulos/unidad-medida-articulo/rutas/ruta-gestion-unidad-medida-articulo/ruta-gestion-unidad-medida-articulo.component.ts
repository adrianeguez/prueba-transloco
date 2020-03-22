import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaConMigasDePanTablaBusqueda } from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService, ModalConfirmacionComponent} from 'man-lab-ng';
import { MigaDePanInterface } from 'man-lab-ng/rutas/interfaces/miga-de-pan-interface';
import { UnidadMedidaPorArticuloRestService } from '../../../../servicios/rest/unidad-medida-por-articulo-rest.service';
import {
  toastErrorConexionServidor,
  toastErrorEliminar,
  toastExitoEliminar,
} from '../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { UnidadMedidaPorArticuloInterface } from '../../../../interfaces/unidad-medida-por-articulo.interface';
import { RUTAS_MENU_ARTICULO } from '../../../../ruta/definicion-rutas/rutas-menu';
import { ArticulosRestService } from '../../../../servicios/rest/articulos-rest.service';
import { UnidadMedidaRestService } from '../../../../servicios/rest/unidad-medida-rest.service';
import { RUTAS_UNIDADES_MEDIDAS } from '../../../unidad-medida/rutas/definicion-rutas/rutas-unidades-medidas';
import { RUTAS_UNIDAD_MEDIDA_ARTICULO } from '../definicion-rutas/rutas-unidades-medidas-articulos';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-gestion-unidad-medida-articulo',
  templateUrl: './ruta-gestion-unidad-medida-articulo.component.html',
  styleUrls: ['./ruta-gestion-unidad-medida-articulo.component.sass'],
})
export class RutaGestionUnidadMedidaArticuloComponent
  extends RutaConMigasDePanTablaBusqueda<
    UnidadMedidaPorArticuloInterface,
    UnidadMedidaPorArticuloRestService,
    ToasterService
  >
  implements OnInit {
  nombrePadre: string;
  estados = ESTADOS;
  idArticulo: number;
  idUnidadMedida: number;
  rows = NUMERO_FILAS_TABLAS;
  columnas = [
    { field: 'articulo', header: 'Nombre' },
    { field: 'articulo', header: 'Nombre corto' },
    { field: 'articulo', header: 'Descripción' },
    { field: 'articulo', header: 'Codigo producto' },
    { field: 'articulo', header: 'Codigo barras' },
    { field: 'articulo', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected dialog: MatDialog,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _unidadMedidaPorArticuloRestService: UnidadMedidaPorArticuloRestService,
    private _articulosRestService: ArticulosRestService,
    protected _toasterServicePrivate: ToasterService,
    private readonly _unidadMedidaRestService: UnidadMedidaRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _unidadMedidaPorArticuloRestService,
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
    this._activatedRoute.params.subscribe(
      parametros => {
        this.idUnidadMedida = +parametros.idUnidadMedida;
        this._unidadMedidaRestService.findOne(this.idUnidadMedida).subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this.nombrePadre = respuesta.nombre;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.ruta = RUTAS_UNIDAD_MEDIDA_ARTICULO.rutaGestionUnidadMedidaArticulo(
          true,
          false,
          [this.idUnidadMedida],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
          RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
          RUTAS_UNIDADES_MEDIDAS.rutaGestionUnidadMedida(false, true),
          RUTAS_UNIDAD_MEDIDA_ARTICULO.rutaGestionUnidadMedidaArticulo(
            false,
            true,
            [this.idUnidadMedida],
          ),
        ];
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
      },
    );
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : { unidadMedida: this.idUnidadMedida };
    (this.queryParams.skip = event.first);
      this.llamarDatos(
        this.queryParams.skip,
        this.queryParams.where,
        this.queryParams.camposABuscar,
        this.optionalParams,
        this.queryParams.order,
        this.queryParams.relations,
        'findAll'
      );
    this.loading = false;
  }

  buscarUnidadMedidaPorNombreOAbreviacion(busqueda) {
    const valorBusqueda = busqueda.trim();
    if (valorBusqueda === '') {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.loading = false;
      this.llamarDatos(
        0,
        { unidadMedida: this.idUnidadMedida },
        undefined,
        undefined,
        undefined,
        ['articulo', 'unidadMedida'],
        this.tipoBusqueda,
      );
    } else {
      this.busqueda = valorBusqueda;
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        { campo: 'nombre', valor: `%25${this.busqueda}%25`, like: true },
      ];
      this.llamarDatos(
        0,
        undefined,
        this.queryParams.camposABuscar,
        undefined,
        undefined,
        undefined,
        this.tipoBusqueda,
      );
    }
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    const consulta = {
      camposABuscar: [],
      relations: [
        {
          key: 'articulo',
          entidad: 'articulo',
          query: this.queryParams.camposABuscar,
        },
        {
          key: 'unidadMedida',
          entidad: 'unidad_medida',
          query: [{ campo: 'id', valor: this.idUnidadMedida }],
        },
      ],
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this._unidadMedidaPorArticuloRestService
      .findWhereOr('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        (resultado: [UnidadMedidaPorArticuloInterface[], number]) => {
          this._cargandoService.deshabilitarCargando();
          this.values = resultado[0];
          this.totalRecords = resultado[1];
          this.first = 0;
          this.loading = false;
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
          this.loading = false;
        },
      );
  }

  actualizarEstado(registro: any) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.articulo.habilitado === ESTADOS.Inactivo;
    const unidadMedidaArticuloEnArreglo = this.values.find(
      unidadMedidaArticulo => registro.id === unidadMedidaArticulo.id,
    );
    const indiceUnidadMedidaArticulo = this.values.indexOf(
      unidadMedidaArticuloEnArreglo,
    );
    this._articulosRestService
      .updateOne(registro.articulo.id, { habilitado })
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceUnidadMedidaArticulo].articulo[
            'habilitado'
          ] = habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
        },
      );
  }

  seteoEstadoSeleccionado(value) {
    this.optionalParams = { registroActual: undefined };
    const estadoSeleccionado = value;
    if (estadoSeleccionado !== undefined) {
      this.busqueda = estadoSeleccionado;
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        { campo: 'habilitado', valor: `%25${this.busqueda}%25`, like: true },
      ];
      this.loading = false;
      this.llamarDatos(
        0,
        undefined,
        this.queryParams.camposABuscar,
        undefined,
        undefined,
        ['articulo', 'unidadMedida'],
        this.tipoBusqueda);
    } else {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.loading = false;
      this.llamarDatos(
        0,
        { unidadMedida: this.idUnidadMedida },
        undefined,
        undefined,
        undefined,
        ['articulo', 'unidadMedida'],
        this.tipoBusqueda
      );
    }
  }

  confirmacionElimnarRegistro(registro) {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '800px',
      data: {
        mensaje: '¿Está seguro que desea eliminar este registro?',
        titulo: `Eliminar articulo`,
        nombreBotonTrue: 'Aceptar',
        nombreBotonFalse: 'Cancelar',
      },
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(async r => {
        if (r) {
          await this.eliminarRegistro(registro);
        }
      },
      error => {
        this._toasterService.pop(toastErrorEliminar);
      }
    );
  }

  eliminarRegistro(registro: UnidadMedidaPorArticuloInterface) {
    this._cargandoService.habilitarCargando();
    const unidadMedidaArticuloEnArreglo = this.values.find(
      unidadMedidaActiculo => registro.id === unidadMedidaActiculo.id,
    );
    const indiceUnidadMedidaArticulo = this.values.indexOf(
      unidadMedidaArticuloEnArreglo,
    );
    this._unidadMedidaPorArticuloRestService.deleteOne(registro.id).subscribe(
      () => {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastExitoEliminar);
        this.values.splice(indiceUnidadMedidaArticulo, 1);
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastErrorEliminar);
      },
    );
  }
}
