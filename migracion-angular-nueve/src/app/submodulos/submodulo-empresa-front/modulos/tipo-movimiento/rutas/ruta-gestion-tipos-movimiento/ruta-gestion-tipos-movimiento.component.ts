import { Component, OnInit } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { EmpresaRestService } from '../../../../servicios/rest/empresa-rest.service';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
  toastErrorMostrar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { TipoMovimientoRestService } from '../../../../servicios/rest/tipo-movimiento-rest.service';
import { RUTAS_TIPO_MOVIMIENTO } from '../definicion-rutas/rutas-tipo-movimiento';
import { CrearEditarTipoMovimientoComponent } from '../../modales/crear-editar-tipo-movimiento/crear-editar-tipo-movimiento.component';
import { WIDTH_MODAL_TIPO_MOVIMIENTO } from '../../constantes/tamanio-modales';
import { TipoMovimientoInterface } from '../../../../interfaces/tipo-movimiento.interface';

@Component({
  selector: 'mlab-ruta-gestion-tipos-movimiento',
  templateUrl: './ruta-gestion-tipos-movimiento.component.html',
  styleUrls: ['./ruta-gestion-tipos-movimiento.component.scss'],
})
export class RutaGestionTiposMovimientoComponent
  extends RutaConMigasDePanTablaBusqueda<
    TipoMovimientoInterface,
    TipoMovimientoRestService,
    ToasterService
  >
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  idEmpresa;
  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  nombreModuloPadre;

  constructor(
    private readonly _empresaRestService: EmpresaRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _tipoMovimientoRestService: TipoMovimientoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _tipoMovimientoRestService,
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
      params => {
        this.idEmpresa = params.idEmpresa;
        this._empresaRestService.findOne(this.idEmpresa).subscribe(
          empresa => {
            this.nombreModuloPadre = empresa.razonSocial;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_TIPO_MOVIMIENTO.rutaGestionTipoMovimiento(
          true,
          false,
          [this.idEmpresa],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_TIPO_MOVIMIENTO.rutaGestionTipoMovimiento(false, true, [
            this.idEmpresa,
          ]),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { empresa: this.idEmpresa };
        this.establecerMigas(rutas);
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.escucharCambiosEnQueryParams();
    this.llamarDatos(
      this.queryParams.skip,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
      this.tipoBusqueda,
    );
    this.loading = false;
  }

  abrirModalCrearTipoMovimiento() {
    const dialogRef = this.dialog.open(CrearEditarTipoMovimientoComponent, {
      width: WIDTH_MODAL_TIPO_MOVIMIENTO,
      data: { idEmpresa: this.idEmpresa },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: TipoMovimientoInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorCrear);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  buscarPorNombre(busqueda: string) {
    this.optionalParams = { registroActual: undefined };
    this.busqueda = busqueda.trim();
    if (this.busqueda === '') {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        { empresa: this.idEmpresa },
        undefined,
        undefined,
        undefined,
        undefined,
        this.tipoBusqueda
      );
    } else {
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        { campo: 'nombre', valor: `%25${this.busqueda}%25` },
      ];
      this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
    }
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    const consulta = {
      camposABuscar: this.queryParams.camposABuscar,
      relations: [
        {
          key: 'empresa',
          entidad: 'empresa',
          query: [{ campo: 'id', valor: this.idEmpresa }],
        },
      ],
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this._tipoMovimientoRestService
      .findWhereOr('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        (resultado: [TipoMovimientoInterface[], number]) => {
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

  async abrirModalEditarTipoMovimiento(registro) {
    try {
      const indiceRegistro = this.values.indexOf(registro);
      const dialogRef = this.dialog.open(CrearEditarTipoMovimientoComponent, {
        width: WIDTH_MODAL_TIPO_MOVIMIENTO,
        data: {
          tipoMovimiento: registro,
        },
      });
      dialogRef.afterClosed().subscribe(
        (registroEditado: TipoMovimientoInterface) => {
          if (registroEditado) {
            this.values[indiceRegistro] = registroEditado;
            this.optionalParams.registroActual = registroEditado.id;
          }
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
          this._cargandoService.deshabilitarCargando();
        },
      );
    } catch (e) {
      console.error(e);
      this._toasterService.pop(toastErrorMostrar);
    }
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._tipoMovimientoRestService
      .updateOne(registro.id, { habilitado })
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = habilitado
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

  escucharEstadoSeleccionado(event) {
    this.optionalParams = { registroActual: undefined };
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? { habilitado: event, empresa: this.idEmpresa }
      : { empresa: this.idEmpresa };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, undefined, this.tipoBusqueda);
  }

  irAGestionModuloHijo(
    idTIpoMovimiento: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'tipo-movimiento-modulo',
      idTIpoMovimiento,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }
}
