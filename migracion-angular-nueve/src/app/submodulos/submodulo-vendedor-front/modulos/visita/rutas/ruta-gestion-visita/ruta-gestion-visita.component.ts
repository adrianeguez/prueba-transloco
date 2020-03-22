import {Component, OnInit} from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {LogroVisitaInterface} from '../../../../interfaces/logro-visita-interface';
import {LogroVisitaRestService} from '../../../../servicios/rest/logro-visita-rest.service';
import {ToasterService} from 'angular2-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {VisitaRestService} from '../../../../servicios/rest/visita-rest.service';
import {DatosVendedorRestService} from '../../../../servicios/rest/datos-vendedor-rest.service';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_DATOS_VENDEDOR} from '../../../datos-vendedor/rutas/definicion-rutas/rutas-datos-vendedor';
import {RUTAS_VISITAS} from '../definicion-rutas/rutas-visita';
import {ToastErrorTrayendoDatos} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-ruta-gestion-visita',
  templateUrl: './ruta-gestion-visita.component.html',
  styleUrls: ['./ruta-gestion-visita.component.scss'],
})
export class RutaGestionVisitaComponent
  extends RutaConMigasDePanTablaBusqueda<LogroVisitaInterface,
    LogroVisitaRestService,
    ToasterService>
  implements OnInit {
  nombrePadre: string;
  rows = NUMERO_FILAS_TABLAS;
  idEmpresa: number;
  idVendedor: number;
  columnas = [
    {field: 'tipoLogroVisita', header: 'Tipo logro'},
    {field: 'tipoLogroVisita', header: 'Descripción'},
    {field: 'visita', header: 'Fecha'},
    {field: 'visita', header: 'Hora empieza'},
    {field: 'visita', header: 'Hora termina'},
    {field: 'razon', header: 'Razón'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    private readonly _logroVisitaRestService: LogroVisitaRestService,
    private readonly _visitaRestService: VisitaRestService,
    private readonly _datosVendedor: DatosVendedorRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _logroVisitaRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
    this.queryParams.relations = [
      'visita',
      'visita.vendeRutaCli',
      'visita.vendeRutaCli.datosVendedor',
      'tipoLogroVisita',
    ];
    this.queryParams.tipoBusqueda = 'custom';
    this._activatedRoute.queryParams.subscribe(queryParam => {
      if (queryParam !== {}) {
        const camposBuscar = JSON.parse(queryParam.camposABuscar);
        const valorBusqueda = camposBuscar[0].busqueda;
        this.busqueda = valorBusqueda;
        this.queryParams.camposABuscar = camposBuscar;
      }
    });
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      params => {
        this.idEmpresa = params.idEmpresa;
        this.idVendedor = params.idVendedor;
        this._datosVendedor.findOne(this.idVendedor).subscribe(
          respuesta => {
            this._cargandoService.deshabilitarCargando();
            this.nombrePadre = respuesta.nombreVendedor;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error(error);
          },
        );
        this.ruta = RUTAS_VISITAS.rutaGestionVisita(true, false, [
          this.idEmpresa,
          this.idVendedor,
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_DATOS_VENDEDOR.rutaGestionDatosVendedor(false, true, [
            this.idEmpresa,
          ]),
          RUTAS_VISITAS.rutaGestionVisita(false, true, [
            this.idEmpresa,
            this.idVendedor,
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
    this.queryParams.tipoBusqueda = 'custom';
    this.loading = true;
    if (this.queryParams.tipoBusqueda === 'custom') {
      this.queryParams.skip = event.first;
      const query = {
        idVendedor: this.idVendedor,
        busqueda: this.busqueda ? this.busqueda : '',
        porFechas: false,
        skip: this.queryParams.skip,
        take: NUMERO_FILAS_TABLAS,
      };
      this.tipoBusqueda = 'custom';
      // tslint:disable-next-line:max-line-length
      this.llamarDatos(
        this.queryParams.skip,
        query,
        this.queryParams.camposABuscar,
        undefined,
        this.queryParams.order,
        undefined,
        this.tipoBusqueda,
      );
      this.loading = false;
    }
  }

  buscarVisitaLogroTipo(busqueda) {
    this.busqueda = busqueda;
    this.queryParams.camposABuscar = [
      {busqueda},
    ];
    const query = {
      idVendedor: this.idVendedor,
      busqueda,
      porFechas: false,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this.llamarDatos(
      this.queryParams.skip,
      query,
      this.queryParams.camposABuscar,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
  }

  protected busquedaPersonalizada(): void {
    this._logroVisitaRestService.buscarVisitaLogroTipo(this.queryParams.where).subscribe(
      r => {
        this._cargandoService.deshabilitarCargando();
        this.values = r[0];
        this.totalRecords = r[1];
        this.first = 0;
        this.loading = false;
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error({
          error: error,
          mensaje: 'Error consultando datos',
        });
        this._toasterService.pop(ToastErrorTrayendoDatos);
      },
    );
  }

  buscarPorFechas(event) {
    this.queryParams.camposABuscar = [
      {
        fechaInicio: event.fechaInicioCruda,
        fechaFin: event.fechaFinalizacionCruda,
      },
    ];
    const query = {
      idVendedor: this.idVendedor,
      fechaInicio: event.fechaInicioCruda,
      fechaFin: event.fechaFinalizacionCruda,
      porFechas: true,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this.tipoBusqueda = 'custom';
    // tslint:disable-next-line:max-line-length
    this.llamarDatos(
      this.queryParams.skip,
      query,
      this.queryParams.camposABuscar,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
  }
}
