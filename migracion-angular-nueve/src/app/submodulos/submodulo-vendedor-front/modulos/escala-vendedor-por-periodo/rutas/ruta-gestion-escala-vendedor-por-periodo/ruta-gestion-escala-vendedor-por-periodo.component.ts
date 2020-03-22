import {
  toastExitoEditar,
  toastErrorEditar, toastErrorCargarDatos,
} from '../../../../../../constantes/mensajes-toaster';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {MigaDePanInterface} from 'man-lab-ng/rutas/interfaces/miga-de-pan-interface';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {EscalaVendedorPorPeriodoInterface} from '../../../../interfaces/escala-vendedor-por-periodo-interface';
import {EscalaVendedorPorPeriodoRestService} from '../../../../servicios/rest/escala-vendedor-por-periodo-rest.service';
import {RUTAS_DATOS_VENDEDOR} from '../../../datos-vendedor/rutas/definicion-rutas/rutas-datos-vendedor';
import {RUTAS_PERIODOS_POR_VENDEDOR} from '../../../periodos-por-vendedor/rutas/definicion-rutas/rutas-periodos-por-vendedor';
import {RUTAS_ESCALA_VENDEDOR_POR_PERIODO} from '../definicion-rutas/escala-vendedor-por-periodo';
import {PeriodoVentaRestService} from '../../../../servicios/rest/periodo-venta-rest.service';
import {PeriodosPorVendedorRestService} from '../../../../servicios/rest/periodos-por-vendedor-rest.service';

@Component({
  selector: 'ml-ruta-gestion-escala-vendedor-por-periodo',
  templateUrl: './ruta-gestion-escala-vendedor-por-periodo.component.html',
  styleUrls: ['./ruta-gestion-escala-vendedor-por-periodo.component.scss'],
})
export class RutaGestionEscalaVendedorPorPeriodoComponent
  extends RutaConMigasDePanTablaBusqueda<EscalaVendedorPorPeriodoInterface,
    EscalaVendedorPorPeriodoRestService,
    ToasterService>
  implements OnInit {
  nombrePadre: string;
  idEmpresa: number;
  idVendedor: number;
  idPeriodo: number;
  estados = ESTADOS;
  columnas = [
    {field: 'escalaVendedor', header: 'Escala'},
    {field: 'escalaVendedor', header: 'Máximo'},
    {field: 'escalaVendedor', header: 'Mínimo'},
    {field: 'habilitado', header: 'Estado'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    private readonly _escalaVendedorPorPeriodoRestService: EscalaVendedorPorPeriodoRestService,
    private readonly _periodosPorVendedorRestService: PeriodosPorVendedorRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _escalaVendedorPorPeriodoRestService,
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
    this._activatedRoute.params.subscribe(parametros => {
        this.idEmpresa = +parametros.idEmpresa;
        this.idVendedor = +parametros.idVendedor;
        this.idPeriodo = +parametros.idPeriodo;
        this.buscarEscala('');
        this._periodosPorVendedorRestService.findOne(this.idPeriodo).subscribe(
          (respuesta: any) => {
            this.nombrePadre = respuesta.periodoVenta.nombre;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.ruta = RUTAS_ESCALA_VENDEDOR_POR_PERIODO.rutaGestionEscalaVendedorPorPeriodo(
          true,
          false,
          [this.idEmpresa, this.idVendedor, this.idPeriodo],
        );
        this.llamarDatos(
          0,
          {periodosPorVendedor: this.idPeriodo},
          undefined,
          undefined,
          this.queryParams.order,
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_DATOS_VENDEDOR.rutaGestionDatosVendedor(false, true, [
            this.idEmpresa,
          ]),
          RUTAS_PERIODOS_POR_VENDEDOR.rutaGestionPeriodosPorVendedor(
            false,
            true,
            [this.idEmpresa, this.idVendedor],
          ),
          RUTAS_ESCALA_VENDEDOR_POR_PERIODO.rutaGestionEscalaVendedorPorPeriodo(
            false,
            true,
            [this.idEmpresa, this.idVendedor, this.idPeriodo],
          ),
        ];
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
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
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : {periodosPorVendedor: this.idPeriodo};
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

  buscarEscala(busqueda: string) {
    const datos = {
      nombreEscala: busqueda.trim(),
      idPeriodoPorVendedor: this.idPeriodo,
    };
    this._escalaVendedorPorPeriodoRestService
      .obtenerEscalaVendedorPorPeriodoPorNombre(datos)
      .subscribe(r => {
          this.loading = false;
          this.values = r[0];
          this.totalRecords = r[1];
        },
        error => {
          console.error(error);
          this._toasterServicePrivate.pop(toastErrorCargarDatos);
        },
      );
  }

  seteoEstadoSeleccionado(value) {
    this._cargandoService.habilitarCargando();
    this.optionalParams = {registroActual: undefined};
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {
      periodosPorVendedor: this.idPeriodo,
      habilitado: estadoSeleccionado,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      ['periodosPorVendedor', 'escalaVendedor'],
      this.tipoBusqueda,
    );
    this._cargandoService.deshabilitarCargando();
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const escalaPeridoVendedorEnArreglo = this.values.find(
      escalaPeridoVendedor => registro.id === escalaPeridoVendedor.id,
    );
    const indiceEscalaPeridoVendedor = this.values.indexOf(
      escalaPeridoVendedorEnArreglo,
    );
    this._escalaVendedorPorPeriodoRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indiceEscalaPeridoVendedor].habilitado = habilitado
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
}
