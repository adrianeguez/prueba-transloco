import {
  toastExitoEliminar,
  toastErrorEliminar,
  toastErrorEditar,
  toastExitoEditar,
} from './../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from './../../../../../../enums/estados';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearEditarPrecioComponent } from '../../modales/crear-editar-precio/crear-editar-precio.component';
import { ToasterService } from 'angular2-toaster';
import {
  RutaConMigasDePanTablaBusqueda,
  MigaDePanInterface,
} from '@manticore-labs/ng-api';
import {
  CargandoService,
  EmitirMigaPanService,
  ModalConfirmacionComponent,
} from 'man-lab-ng';
import { PreciosInterface } from '../../../../interfaces/precios.interface';
import { PreciosRestService } from '../../../../servicios/rest/precios-rest.service';
import { ArticulosEmpresaRestService } from '../../../../../submodulo-articulos-front/servicios/rest/articulo-empresa-rest.service';
import { RUTAS_PRECIO } from '../definicion-rutas/rutas-precio';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_ARTICULO_EMPRESA } from '../../../articulo-empresa/rutas/definicion-rutas/rutas-articulo-empresa';
import { OPCIONES_SI_NO } from '../../../../../submodulo-articulos-front/enums/si-no';
import { ArticuloInterface } from '../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import { ArticuloEmpresaInterface } from '../../../../../submodulo-articulos-front/interfaces/articulo-empresa.interface';

@Component({
  selector: 'ml-gestion-precios',
  templateUrl: './ruta-gestion-precios.component.html',
  styleUrls: ['./ruta-gestion-precios.component.sass'],
})
export class RutaGestionPreciosComponent
  extends RutaConMigasDePanTablaBusqueda<
    PreciosInterface,
    PreciosRestService,
    ToasterService
  >
  implements OnInit {
  nombrePadre: string;
  estados = ESTADOS;
  precios: PreciosInterface[];
  totalRegistros: number;
  rows = NUMERO_FILAS_TABLAS;
  idEmpresa: number;
  idArticuloEmpresa: number;
  articulo: ArticuloInterface;
  columnas = [
    { field: 'valor', header: 'Precio' },
    { field: 'esPrincipal', header: 'Es principal' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    public dialog: MatDialog,
    protected readonly _preciosRestService: PreciosRestService,
    protected readonly _articulosEmpresaRestService: ArticulosEmpresaRestService,
    protected readonly _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _preciosRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.ruta = RUTAS_PRECIO.rutaGestionPrecio(false, true, [
      this.idEmpresa,
      this.idArticuloEmpresa,
    ]).ruta;
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(parametros => {
      this.idEmpresa = +parametros.idEmpresa;
      this.idArticuloEmpresa = +parametros.idArticuloEmpresa;
      const consulta = {
        where: {
          id: this.idArticuloEmpresa,
        },
        relations: ['articulo'],
      };
      this._articulosEmpresaRestService
        .findAll('criterioBusqueda=' + JSON.stringify(consulta))
        .subscribe(
          respuesta => {
            this.articulo = respuesta[0][0].articulo as ArticuloInterface;
            this.nombrePadre = this.articulo.nombre;
          },
          error => {
            console.error(error);
          },
        );
      this.ruta = RUTAS_PRECIO.rutaGestionPrecio(true, false, [
        this.idEmpresa,
        this.idArticuloEmpresa,
      ]);
      const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
        RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
        RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
        RUTAS_ARTICULO_EMPRESA.rutaGestionArticuloEmpresa(false, true, [
          this.idEmpresa,
        ]),
        RUTAS_PRECIO.rutaGestionPrecio(false, true, [
          this.idEmpresa,
          this.idArticuloEmpresa,
        ]),
      ];
      this.queryParams.where = this.queryParams.where
        ? this.queryParams.where
        : { articuloPorEmpresa: this.idArticuloEmpresa };
      this.queryParams.relations =
        this.queryParams.relations.length > 0
          ? this.queryParams.relations
          : ['articuloPorEmpresa', 'articuloPorEmpresa.articulo'];
      this.establecerMigas(rutas);
      this.escucharCambiosEnQueryParams();
      this.escucharCambiosEnParametros();
      this._cargandoService.deshabilitarCargando();
    });
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
      this.tipoBusqueda
    );
    this.loading = false;
  }

  seteoEstadoSeleccionado(value) {
    this.optionalParams = { registroActual: undefined };
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {
      articuloPorEmpresa: this.idArticuloEmpresa,
      habilitado: estadoSeleccionado,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
      'articuloPorEmpresa',
      'articuloPorEmpresa.articulo',
    ], this.tipoBusqueda);
  }

  actualizarEstado(registro: PreciosInterface) {
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const precioEnArreglo = this.values.find(
      precio => registro.id === precio.id,
    );
    const inidicePrecio = this.values.indexOf(precioEnArreglo);
    this._preciosRestService.updateOne(registro.id, { habilitado }).subscribe(
      () => {
        this.values[inidicePrecio].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
      },
      error => {
        console.error(error);
      },
    );
  }

  actualizarEsPrincipal(registro: PreciosInterface) {
    const esPrincipal =
      registro.esPrincipal === OPCIONES_SI_NO.NO
        ? OPCIONES_SI_NO.SI
        : OPCIONES_SI_NO.NO;
    const precioEnArreglo = this.values.find(
      precio => registro.id === precio.id,
    );
    const indicePrecio = this.values.indexOf(precioEnArreglo);
    registro.esPrincipal = esPrincipal;
    const criterioBusqueda = {
      idArticuloEmpresa: this.idArticuloEmpresa,
      precio: registro,
    };
    this._preciosRestService
      .buscarActualizarPrecioEsPrincipal(criterioBusqueda)
      .subscribe(
        () => {
          if (esPrincipal) {
            this.values.forEach(respuesta => {
              if (respuesta.esPrincipal) {
                respuesta.esPrincipal = 0;
              }
            });
          }
          this.values[indicePrecio].esPrincipal = esPrincipal;
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  eliminarRegistro(registro: PreciosInterface) {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '800px',
      data: {
        mensaje: '¿Está seguro que desea eliminar este registro?',
        titulo: 'Eliminar precio',
        nombreBotonTrue: 'eliminar',
        nombreBotonFalse: 'cancelar',
      },
    });
    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe((respuesta: PreciosInterface) => {
      if (respuesta) {
        this._cargandoService.habilitarCargando();
        const precioEnArreglo = this.values.find(
          precio => registro.id === precio.id,
        );
        const inidicePrecio = this.values.indexOf(precioEnArreglo);
        this._preciosRestService.deleteOne(registro.id).subscribe(
          () => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEliminar);
            this.values.splice(inidicePrecio, 1);
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastErrorEliminar);
          },
        );
      }
    });
  }

  async abrirModalEditarPrecio(registro: PreciosInterface) {
    const articulo = (registro.articuloPorEmpresa as ArticuloEmpresaInterface)
      .articulo as ArticuloInterface;
    const articuloEsIcentivo = articulo ? articulo.esIncentivo : undefined;
    const indicePrecio = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarPrecioComponent, {
      width: '800px',
      data: {
        precio: registro,
        esIncentivo: articuloEsIcentivo,
      },
    });

    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe((respuesta: PreciosInterface) => {
      if (respuesta) {
        this.optionalParams = { registroActual: respuesta.id };
        this.values.splice(indicePrecio, 1, respuesta);
      }
    });
  }

  async abrirModalCrearPrecio() {
    const articulo = this.articulo;
    const articuloEsIcentivo = articulo ? articulo.esIncentivo : undefined;
    const dialogRef = this.dialog.open(CrearEditarPrecioComponent, {
      width: '800px',
      data: {
        idArticuloEmpresa: this.idArticuloEmpresa,
        esIncentivo: articuloEsIcentivo,
      },
    });

    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe((respuesta: PreciosInterface) => {
      if (respuesta) {
        if (respuesta.esPrincipal) {
          this.values.forEach(valor => {
            if (valor.esPrincipal) {
              valor.esPrincipal = 0;
            }
          });
        }
        this.optionalParams = { registroActual: respuesta.id };
        this.values.unshift(respuesta);
      }
    });
  }
}
