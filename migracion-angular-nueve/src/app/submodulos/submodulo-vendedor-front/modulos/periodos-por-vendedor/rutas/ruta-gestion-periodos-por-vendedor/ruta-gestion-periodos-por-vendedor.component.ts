import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../enums/estados';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {TAMANIO_MODAL_SELECT} from '../../../../constantes/tamanios-componentes';
import {PeriodosPorVendedorInterface} from '../../../../interfaces/periodos-por-vendedor-interface';
import {PeriodosPorVendedorRestService} from '../../../../servicios/rest/periodos-por-vendedor-rest.service';
import {RUTAS_DATOS_VENDEDOR} from '../../../datos-vendedor/rutas/definicion-rutas/rutas-datos-vendedor';
import {AsignarEscalaVendedorComponent} from '../../modales/asignar-escala-vendedor/asignar-escala-vendedor.component';
import {RUTAS_PERIODOS_POR_VENDEDOR} from '../definicion-rutas/rutas-periodos-por-vendedor';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {ESTADOS_PERIODO} from '../../../../constantes/estados-periodo';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-ruta-gestion-periodos-por-vendedor',
  templateUrl: './ruta-gestion-periodos-por-vendedor.component.html',
  styleUrls: ['./ruta-gestion-periodos-por-vendedor.component.scss'],
})
export class RutaGestionPeriodosPorVendedorComponent
  extends RutaConMigasDePanTablaBusqueda<PeriodosPorVendedorInterface,
    PeriodosPorVendedorRestService,
    ToasterService>
  implements OnInit {
  nombrePadre: string;
  idEmpresa: number;
  idVendedor: number;
  estados = ESTADOS_PERIODO;
  columnas = [
    {field: 'periodoVenta', header: 'Periodo'},
    {field: 'periodoVenta', header: 'Fecha inicio'},
    {field: 'periodoVenta', header: 'Fecha fin'},
    {field: 'ventasTotales', header: 'Ventas totales'},
    {field: 'periodoVenta', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    private readonly _datosVendedorRestService: DatosVendedorRestService,
    private readonly _periodosPorVendedorRestService: PeriodosPorVendedorRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _periodosPorVendedorRestService,
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
        this._datosVendedorRestService.findOne(this.idVendedor).subscribe(
          respuesta => {
            this.nombrePadre = respuesta.nombreVendedor;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.ruta = RUTAS_PERIODOS_POR_VENDEDOR.rutaGestionPeriodosPorVendedor(
          true,
          false,
          [this.idEmpresa, this.idVendedor],
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
        ];

        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      }
    );
    this._cargandoService.deshabilitarCargando();
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : {datosVendedor: this.idVendedor};
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

  buscarPorNombre(busqueda: string) {
    const valorBusqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    if (valorBusqueda === '') {
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        {
          datosVendedor: this.idVendedor,
        },
        undefined,
        undefined,
        this.queryParams.relations,
      );
    } else {
      this.busqueda = valorBusqueda;
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        {campo: 'nombre', valor: `%25${this.busqueda}%25`, like: true},
      ];
      this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
    }
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    const busqueda = {
      camposABuscar: [],
      relations: [
        {
          key: 'periodoVenta',
          entidad: 'periodo_venta',
          query: this.queryParams.camposABuscar,
        },
        {
          key: 'datosVendedor',
          entidad: 'datos_vendedor',
          query: [{campo: 'id', valor: this.idVendedor}],
        },
      ],
    };
    this._periodosPorVendedorRestService
      .findWhereOr('criterioBusqueda=' + JSON.stringify(busqueda))
      .subscribe(
        r => {
          this.values = r[0];
          this.loading = false;
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        },
      );
  }

  abrirModalAsignarEscalaVendedor(registro) {
    const dialogRef = this.dialog.open(AsignarEscalaVendedorComponent, {
      width: TAMANIO_MODAL_SELECT,
      data: {
        registro: registro,
        idEmpresa: this.idEmpresa,
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  irAGestionModuloHijo(
    idPeriodo: number,
    moduloHijo: string,
    gestionHijo: string,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'vendedor-modulo',
      this.idVendedor,
      'periodo-vendedor-modulo',
      idPeriodo,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta, {
      queryParams: {
        order: JSON.stringify(this.queryParams.order),
        skip: 0,
        take: NUMERO_FILAS_TABLAS,
        where: JSON.stringify({periodoPorVendedor: idPeriodo}),
        // relations: JSON.stringify(['periodosPorVendedor']),
      },
    });
  }
}
