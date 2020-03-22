import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService, ModalConfirmacionComponent} from 'man-lab-ng';
import {DetalleAdicionalRestService} from '../../../../servicios/rest/detalle-adicional-rest.service';
import {RUTAS_ARTICULO} from '../../../articulo/rutas/definicion-rutas/rutas-articulo';
import {RUTAS_SUBGRUPO} from '../../../subgrupo/rutas/definicion-rutas/rutas-subgrupo';
// tslint:disable-next-line: max-line-length
import {CrearEditarDetalleAdicionalComponent} from '../../modales/crear-editar-detalle-adicional/crear-editar-detalle-adicional.component';
import {RUTAS_DETALLE_ADICIONAL} from '../definicion-rutas/rutas-detalles-adicionales';
import {
  toastErrorConexionServidor,
  toastErrorEliminar,
  toastExitoEliminar,
} from '../../../../../../constantes/mensajes-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {DetalleAdicionalInterface} from '../../../../interfaces/detalle-adicional.interface';
import {RUTAS_MENU_ARTICULO} from './../../../../ruta/definicion-rutas/rutas-menu';
import {ArticulosRestService} from './../../../../servicios/rest/articulos-rest.service';
import {RUTAS_GRUPOS} from './../../../grupo/rutas/definicion-rutas/rutas-grupos';
import {WIDTH_MODAL_DETALLE} from './../../constantes/tamanio-modal-detalle';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

@Component({
  selector: 'ml-ruta-gestion-detalle-adicional',
  templateUrl: './ruta-gestion-detalle-adicional.component.html',
  styleUrls: ['./ruta-gestion-detalle-adicional.component.sass'],
})
export class RutaGestionDetalleAdicionalComponent
  extends RutaConMigasDePanTablaBusqueda<DetalleAdicionalInterface,
    DetalleAdicionalRestService,
    ToasterService>
  implements OnInit {
  nombrePadre: string;
  estado = ESTADOS;
  detallesAdicionales: DetalleAdicionalInterface[];
  totalRegistros: number;
  rows = NUMERO_FILAS_TABLAS;
  idArticulo: number;
  idGrupo: number;
  idSubgrupo: number;
  columnas = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'valor', header: 'Descripción'},
    {field: 'id', header: 'Acciones'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    public dialog: MatDialog,
    protected readonly _detalleAdicionalRestService: DetalleAdicionalRestService,
    protected readonly _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    private readonly _articulosRestService: ArticulosRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _detalleAdicionalRestService,
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
            console.error(error);
          },
        );
        this.ruta = RUTAS_DETALLE_ADICIONAL.rutaGestionDetalleAdicional(
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
            this.idGrupo,
            this.idSubgrupo,
          ]),
          RUTAS_DETALLE_ADICIONAL.rutaGestionDetalleAdicional(false, true, [
            this.idGrupo,
            this.idSubgrupo,
            this.idArticulo,
          ]),
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

  buscarDetalleAdicionalPorNombre(busqueda) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
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
        this.queryParams.relations,
        this.tipoBusqueda,
      );
    } else {
      this.busqueda = valorBusqueda;
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        {campo: 'nombre', valor: `%25${this.busqueda}%25`},
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
      camposABuscar: this.queryParams.camposABuscar,
      relations: [
        {
          key: 'articulo',
          entidad: 'detalle_adicional',
          query: [{campo: 'id', valor: this.idArticulo}],
        },
      ],
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this._detalleAdicionalRestService
      .findWhereOr('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        (resultado: [DetalleAdicionalInterface[], number]) => {
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

  abrirModalCrearDetalleAdicional() {
    const dialogRef = this.dialog.open(CrearEditarDetalleAdicionalComponent, {
      width: WIDTH_MODAL_DETALLE,
      data: {idArticulo: this.idArticulo},
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(
      (respuesta: DetalleAdicionalInterface) => {
        if (respuesta) {
          this.optionalParams = {registroActual: respuesta.id};
          this.values.unshift(respuesta);
          this.optionalParams.registroActual = respuesta.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  abrirModalEditarDetalleAdicional(registro) {
    const indiceDetalleAdicional = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarDetalleAdicionalComponent, {
      width: WIDTH_MODAL_DETALLE,
      data: {detalleAdicional: registro},
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(
      (registroEditado: DetalleAdicionalInterface) => {
        if (registroEditado) {
          this.optionalParams = {registroActual: registroEditado.id};
          this.values.splice(indiceDetalleAdicional, 1, registroEditado);
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }


  confirmacionElimnarRegistro(registro) {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '1000px',
      data: {
        mensaje: '¿Está seguro que desea eliminar este registro?',
        titulo: `Eliminar detalle adicional`,
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

  eliminarRegistro(registro) {
    this._cargandoService.habilitarCargando();
    const detalleAdicionalEnArreglo = this.values.find(
      detalleAdicional => registro.id === detalleAdicional.id,
    );
    const inidiceDetalleAdicional = this.values.indexOf(
      detalleAdicionalEnArreglo,
    );
    this._detalleAdicionalRestService.deleteOne(registro.id).subscribe(
      () => {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastExitoEliminar);
        this.values.splice(inidiceDetalleAdicional, 1);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorEliminar);
      },
    );
  }
}
