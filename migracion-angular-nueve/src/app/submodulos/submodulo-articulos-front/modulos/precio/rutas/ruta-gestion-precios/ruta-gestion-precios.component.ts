import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService, ModalConfirmacionComponent} from 'man-lab-ng';
import { ArticulosRestService } from '../../../../servicios/rest/articulos-rest.service';
import { PreciosRestService } from '../../../../servicios/rest/precios-rest.service';
import { CrearEditarPrecioComponent } from '../../modales/crear-editar-precio/crear-editar-precio.component';
import { RUTAS_PRECIO } from '../definicion-rutas/rutas-precio';
import {
  toastErrorEliminar,
  toastExitoEliminar,
  toastErrorConexionServidor,
} from './../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from './../../../../../../enums/estados';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { OPCIONES_SI_NO } from './../../../../enums/si-no';
import { PreciosInterface } from './../../../../interfaces/precios.interface';
import { RUTAS_MENU_ARTICULO } from './../../../../ruta/definicion-rutas/rutas-menu';
import { RUTAS_ARTICULO } from './../../../articulo/rutas/definicion-rutas/rutas-articulo';
import { RUTAS_GRUPOS } from './../../../grupo/rutas/definicion-rutas/rutas-grupos';
import { RUTAS_SUBGRUPO } from './../../../subgrupo/rutas/definicion-rutas/rutas-subgrupo';
import {RUTAS_CONFIGURACIONES} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-configuraciones';

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
  idArticulo: number;
  idGrupo: number;
  idSubgrupo: number;
  columnas = [
    { field: 'valor', header: 'Valor' },
    { field: 'esPrincipal', header: 'Es principal' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    public dialog: MatDialog,
    protected readonly _preciosRestService: PreciosRestService,
    protected readonly _articulosRestService: ArticulosRestService,
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
        this.ruta = RUTAS_PRECIO.rutaGestionPrecio(true, false, [
          this.idGrupo,
          this.idSubgrupo,
          this.idArticulo,
        ]);
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
          RUTAS_PRECIO.rutaGestionPrecio(false, true, [
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
      : { articulo: this.idArticulo };
    (this.queryParams.skip = event.first),
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

  seteoEstadoSeleccionado(value) {
    this.optionalParams = { registroActual: undefined };
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {
      articulo: this.idArticulo,
      habilitado: estadoSeleccionado,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
      'articulo',
    ]);
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
    const esPrincipal = registro.esPrincipal === OPCIONES_SI_NO.NO;
    const precioEnArreglo = this.values.find(
      precio => registro.id === precio.id,
    );
    const inidicePrecio = this.values.indexOf(precioEnArreglo);
    const criterioBusqueda = {
      idArticulo: this.idArticulo,
      precio: registro,
    };
    this._preciosRestService
      .buscarActualizarPrecioEsPrincipal(criterioBusqueda)
      .subscribe(
        () => {
          this.values[inidicePrecio].esPrincipal = esPrincipal
            ? OPCIONES_SI_NO.SI
            : OPCIONES_SI_NO.NO;
          this.values.forEach((respuesta, indicePrecio) => {
            // tslint:disable-next-line: no-unused-expression
            indicePrecio !== inidicePrecio
              ? (respuesta.esPrincipal = OPCIONES_SI_NO.NO)
              : undefined;
          });
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
        mensaje: `Seguro que desea elinimar el registro ${registro.nombre}`,
        titulo: `Eliminar precio de ${registro.nombre}`,
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

  eliminarRegistro(registro: PreciosInterface) {
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
        console.error(error);
        this._toasterService.pop(toastErrorEliminar);
      },
    );
  }

  async abrirModalEditarPrecio(registro: PreciosInterface) {
    try {
      const articulo = await this.buscarArticuloPorId();
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
      respuestaModal$.subscribe(
        (respuesta: PreciosInterface) => {
          if (respuesta) {
            this.optionalParams = { registroActual: respuesta.id };
            this.values.splice(indicePrecio, 1, respuesta);
          }
        },
        error => {
          console.error(error);
        },
      );
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }

  async abrirModalCrearPrecio() {
    try {
      const articulo = await this.buscarArticuloPorId();
      const articuloEsIcentivo = articulo ? articulo.esIncentivo : undefined;
      const dialogRef = this.dialog.open(CrearEditarPrecioComponent, {
        width: '800px',
        data: {
          idArticulo: this.idArticulo,
          esIncentivo: articuloEsIcentivo,
        },
      });

      const respuestaModal$ = dialogRef.afterClosed();
      respuestaModal$.subscribe(
        (respuesta: PreciosInterface) => {
          if (respuesta) {
            this.values.forEach(
              // tslint:disable-next-line: no-shadowed-variable
              (respuesta, indicePrecio) => {
                // tslint:disable-next-line: no-unused-expression
                indicePrecio !== respuesta.id
                  ? (respuesta.esPrincipal = OPCIONES_SI_NO.NO)
                  : undefined;
              },
            );
            this.optionalParams = { registroActual: respuesta.id };
            this.values.unshift(respuesta);
          }
        },
        error => {
          console.error(error);
        },
      );
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }

  async buscarArticuloPorId() {
    try {
      const promesaArticulo = await this._articulosRestService
        .findOne(this.idArticulo)
        .toPromise();
      return promesaArticulo;
    } catch (e) {
      this._toasterService.pop(toastErrorConexionServidor);
    }
  }
}
