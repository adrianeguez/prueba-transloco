import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService, ModalConfirmacionComponent} from 'man-lab-ng';
import {MigaDePanInterface} from 'man-lab-ng/rutas/interfaces/miga-de-pan-interface';
import {RUTAS_ARTICULO} from '../../../articulo/rutas/definicion-rutas/rutas-articulo';
import {RUTAS_GRUPOS} from '../../../grupo/rutas/definicion-rutas/rutas-grupos';
import {RUTAS_SUBGRUPO} from '../../../subgrupo/rutas/definicion-rutas/rutas-subgrupo';
import {RUTAS_ARTICULO_UNIDAD_MEDIDA} from '../definicion-rutas/rutas-articulo-unidad-medida';
import {
  toastErrorConexionServidor,
  toastErrorEliminar,
  toastExitoEliminar,
} from '../../../../../../constantes/mensajes-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {ArticuloInterface} from '../../../../interfaces/articulo.interface';
import {UnidadMedidaPorArticuloInterface} from '../../../../interfaces/unidad-medida-por-articulo.interface';
import {RUTAS_MENU_ARTICULO} from '../../../../ruta/definicion-rutas/rutas-menu';
import {ArticulosRestService} from '../../../../servicios/rest/articulos-rest.service';
import {UnidadMedidaPorArticuloRestService} from '../../../../servicios/rest/unidad-medida-por-articulo-rest.service';
import {UnidadMedidaRestService} from '../../../../servicios/rest/unidad-medida-rest.service';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-ruta-gestion-articulo-unidad-medida',
  templateUrl: './ruta-gestion-articulo-unidad-medida.component.html',
  styleUrls: ['./ruta-gestion-articulo-unidad-medida.component.sass'],
})
export class RutaGestionArticuloUnidadMedidaComponent
  extends RutaConMigasDePanTablaBusqueda<UnidadMedidaPorArticuloInterface,
    UnidadMedidaPorArticuloRestService,
    ToasterService>
  implements OnInit {
  nombrePadre: string;
  estados = ESTADOS;
  articulos: ArticuloInterface[];
  rows = NUMERO_FILAS_TABLAS;
  columnas = [
    {field: 'unidadMedida', header: 'Unidad de Medida'},
    {field: 'unidadMedida', header: 'Abreviación'},
    {field: 'unidadMedida', header: 'Estado'},
    {field: 'esPrincipal', header: 'Es Principal'},
    {field: 'id', header: 'Acciones'},
  ];
  idArticulo: number;
  idGrupo: number;
  idSubgrupo: number;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected readonly _activatedRoute: ActivatedRoute,
    private readonly _unidadMedidaPorArticuloRestService: UnidadMedidaPorArticuloRestService,
    private readonly _unidadMedidaRestService: UnidadMedidaRestService,
    protected readonly _router: Router,
    protected dialog: MatDialog,
    protected _toasterServicePrivate: ToasterService,
    private readonly _articulosRestService: ArticulosRestService,
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
        this.idArticulo = +parametros.idArticulo;
        this.idSubgrupo = +parametros.idSubgrupo;
        this.idGrupo = +parametros.idGrupo;
        this._articulosRestService.findOne(this.idArticulo).subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this.nombrePadre = respuesta.nombreCorto;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.ruta = RUTAS_ARTICULO_UNIDAD_MEDIDA.rutaGestionArticuloUnidadMedida(
          true,
          false,
          [this.idGrupo, this.idSubgrupo, this.idArticulo],
        );

        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_CONFIGURACIONES.rutaConfiguraciones(false, true),
          RUTAS_MENU_ARTICULO.rutaMenuArticulo(false, true),
          RUTAS_GRUPOS.rutaGestionGrupo(false, true),
          RUTAS_SUBGRUPO.rutaGestionSubgrupo(false, true, [this.idGrupo]),
          RUTAS_ARTICULO.rutaGestionArticulo(false, true, [
            this.idSubgrupo,
            this.idSubgrupo,
          ]),
          RUTAS_ARTICULO_UNIDAD_MEDIDA.rutaGestionArticuloUnidadMedida(
            false,
            true,
            [this.idGrupo, this.idSubgrupo, this.idArticulo],
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
    this._cargandoService.deshabilitarCargando();
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : {articulo: this.idArticulo};
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

  buscarUnidadMedidaPorNombreOAbreviacion(busqueda) {
    const valorBusqueda = busqueda.trim();
    if (valorBusqueda === '') {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        {articulo: this.idArticulo},
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
        {campo: 'nombre', valor: `%25${this.busqueda}%25`, like: true},
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
          query: [{campo: 'id', valor: this.idArticulo}],
        },
        {
          key: 'unidadMedida',
          entidad: 'unidad_medida',
          query: this.queryParams.camposABuscar,
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
    this._cargandoService.deshabilitarCargando();
  }

  actualizarEstado(registro: any) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.unidadMedida.habilitado === ESTADOS.Inactivo;
    const unidadMedidaArticuloEnArreglo = this.values.find(
      unidadMedidaArticulo => registro.id === unidadMedidaArticulo.id,
    );
    const indiceUnidadMedidaArticulo = this.values.indexOf(
      unidadMedidaArticuloEnArreglo,
    );
    this._unidadMedidaRestService
      .updateOne(registro.unidadMedida.id, {habilitado})
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceUnidadMedidaArticulo].unidadMedida[
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
    this.optionalParams = {registroActual: undefined};
    const estadoSeleccionado = value;
    if (estadoSeleccionado !== undefined) {
      this.busqueda = estadoSeleccionado;
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        {campo: 'habilitado', valor: `%25${this.busqueda}%25`, like: true},
      ];
      this.loading = false;
      this.llamarDatos(
        0,
        undefined,
        this.queryParams.camposABuscar,
        undefined,
        undefined,
        undefined,
        this.tipoBusqueda,
      );
    } else {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.loading = false;
      this.llamarDatos(
        0,
        {articulo: this.idArticulo},
        undefined,
        undefined,
        undefined,
        ['articulo', 'unidadMedida'],
        this.tipoBusqueda,
      );
    }
  }

  confirmacionElimnarRegistro(registro) {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '800px',
      data: {
        mensaje: '¿Está seguro que desea eliminar este registro?',
        titulo: `Eliminar unidad medida`,
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
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorEliminar);
      },
    );
  }

  actualizarEsPrincipal(registro: any) {
    this._cargandoService.habilitarCargando();
    const esPrincipal = registro.esPrincipal === ESTADOS.Inactivo;
    const unidadMedidaArticuloEnArreglo = this.values.find(
      unidadMedidaArticulo => registro.id === unidadMedidaArticulo.id,
    );
    const indiceUnidadMedidaArticulo = this.values.indexOf(
      unidadMedidaArticuloEnArreglo,
    );
    registro.esPrincipal = esPrincipal;
    const datosEnviar = {
      idArticulo: registro.articulo.id,
      unidadMedida: registro,
    };
    this._unidadMedidaPorArticuloRestService
      .actualizarUnidadMedidaEsPrincipal(datosEnviar)
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceUnidadMedidaArticulo].esPrincipal = esPrincipal ? ESTADOS.Activo : ESTADOS.Inactivo;
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
        },
      );
  }

}
