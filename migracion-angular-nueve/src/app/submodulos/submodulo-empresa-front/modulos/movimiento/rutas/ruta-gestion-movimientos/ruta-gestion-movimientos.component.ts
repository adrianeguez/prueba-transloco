import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ESTADOS } from '../../../../../../enums/estados';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {
  toastErrorConexionServidor,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { MovimientoInterface } from '../../../../interfaces/movimiento.interface';
import { MovimientoRestService } from '../../../../servicios/rest/movimiento-rest.service';
import { TipoMovimientoRestService } from '../../../../servicios/rest/tipo-movimiento-rest.service';
import { RUTAS_MOVIMIENTO } from '../definicion-rutas/rutas-movimiento';
import { RUTAS_TIPO_MOVIMIENTO } from '../../../tipo-movimiento/rutas/definicion-rutas/rutas-tipo-movimiento';
import { CrearEditarMovimientoComponent } from '../../modales/crear-editar-movimiento/crear-editar-movimiento.component';
import { WIDTH_MODAL_MOVIMIENTO } from '../../constantes/tamanio-modales';

@Component({
  selector: 'mlab-ruta-gestion-movimientos',
  templateUrl: './ruta-gestion-movimientos.component.html',
  styleUrls: ['./ruta-gestion-movimientos.component.scss'],
})
export class RutaGestionMovimientosComponent
  extends RutaConMigasDePanTablaBusqueda<
    MovimientoInterface,
    MovimientoRestService,
    ToasterService
  >
  implements OnInit {
  camposABuscar = [];

  rows = NUMERO_FILAS_TABLAS;

  idTipoMovimiento;

  idEmpresa;

  estados = ESTADOS;

  columnas = [
    { field: 'nombre', header: 'Nombre', width: '20%' },
    { field: 'codigo', header: 'Código', width: '10%' },
    { field: 'habilitado', header: 'Estado', width: '10%' },
    { field: 'id', header: 'Acciones', width: '15%' },
  ];

  nombreModuloPadre;

  constructor(
    private readonly _tipoMovimientoRestService: TipoMovimientoRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _movimientoRestService: MovimientoRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _movimientoRestService,
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
        this.idEmpresa = +params.idEmpresa;
        this.idTipoMovimiento = params.idTipoMovimiento;
        this._tipoMovimientoRestService
          .findOne(this.idTipoMovimiento)
          .subscribe(
            tipoMovimiento => {
              this.nombreModuloPadre = tipoMovimiento.nombre;
            },
            error => {
              console.error(error);
              this._cargandoService.deshabilitarCargando();
            },
          );
        this.ruta = RUTAS_MOVIMIENTO.rutaGestionMovimiento(true, false, [
          this.idEmpresa,
          this.idTipoMovimiento,
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_TIPO_MOVIMIENTO.rutaGestionTipoMovimiento(false, true, [
            this.idEmpresa,
          ]),
          RUTAS_MOVIMIENTO.rutaGestionMovimiento(false, true, [
            this.idEmpresa,
            this.idTipoMovimiento,
          ]),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { tipoMovimiento: this.idTipoMovimiento };
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
      this.tipoBusqueda
    );
    this.loading = false;
  }

  abrirModalCrearMovimiento() {
    const dialogRef = this.dialog.open(CrearEditarMovimientoComponent, {
      width: WIDTH_MODAL_MOVIMIENTO,
      data: {
        idTipoMovimiento: this.idTipoMovimiento,
        idEmpresa: this.idEmpresa,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: MovimientoInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastExitoCrear);
      },
    );
  }

  abrirModalEditarMovimiento(registro) {
    this.optionalParams = { registroActual: undefined };
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarMovimientoComponent, {
      width: WIDTH_MODAL_MOVIMIENTO,
      data: { movimiento: registro, idEmpresa: this.idEmpresa },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: MovimientoInterface) => {
        if (registroEditado) {
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  actualizarEstado(registro) {
    this.optionalParams = { registroActual: undefined };
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._movimientoRestService
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
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
        },
      );
  }

  buscarPorNombreCodigo(busqueda: string) {
    this.optionalParams = { registroActual: undefined };
    this.busqueda = busqueda.trim();
    this.tipoBusqueda = 'findAll';
    const where = [
      {
        nombre: `Like(\"%25${this.busqueda}%25\")`,
        tipoMovimiento: this.idTipoMovimiento,
      },
      {
        codigo: `Like(\"%25${this.busqueda}%25\")`,
        tipoMovimiento: this.idTipoMovimiento,
      },
    ];
    this.llamarDatos(0, where, undefined, undefined, undefined, undefined, this.tipoBusqueda);
  }

  escucharEstadoSeleccionado(event) {
    this.optionalParams = { registroActual: undefined };
    const where = {
      habilitado: event === 1 || event === 0 ? event : undefined,
      tipoMovimiento: this.idTipoMovimiento,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, undefined, this.tipoBusqueda);
  }
}
