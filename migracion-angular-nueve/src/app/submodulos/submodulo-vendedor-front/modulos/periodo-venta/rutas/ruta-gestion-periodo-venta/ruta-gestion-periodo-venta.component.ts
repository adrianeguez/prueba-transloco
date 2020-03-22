import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {CargandoService, EmitirMigaPanService, ModalConfirmacionComponent} from 'man-lab-ng';
import {CrearEditarPeriodoVentaComponent} from '../../modales/crear-editar-periodo-venta/crear-editar-periodo-venta.component';
import {RUTAS_PERIODO_VENTA} from '../definicion-rutas/rutas-periodo-venta';
import {PeriodoVentaInterface} from '../../../../interfaces/periodo-venta-interface';
import {PeriodoVentaRestService} from '../../../../servicios/rest/periodo-venta-rest.service';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {EmpresaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/empresa-rest.service';
import {ModalPeriodoVentaMigrarComponent} from '../../modales/modal-periodo-venta-migrar/modal-periodo-venta-migrar.component';
import {ESTADOS_PERIODO} from '../../../../constantes/estados-periodo';
import * as moment from 'moment';
import {generarToasterErrorConMensaje} from '../../../../constantes/mensajes-toast';

@Component({
  selector: 'ml-ruta-gestion-periodo-venta',
  templateUrl: './ruta-gestion-periodo-venta.component.html',
  styleUrls: ['./ruta-gestion-periodo-venta.component.scss'],
})
export class RutaGestionPeriodoVentaComponent
  extends RutaConMigasDePanTablaBusqueda<PeriodoVentaInterface,
    PeriodoVentaRestService,
    ToasterService>
  implements OnInit {
  idEmpresa: number;
  nombrePapa: string;
  periodoAcerrar: any;
  rows = NUMERO_FILAS_TABLAS;
  estados = ESTADOS_PERIODO;
  columnas = [
    {field: 'nombre', header: 'Periodo'},
    {field: 'fechaInicio', header: 'Fecha inicio'},
    {field: 'fechaFin', header: 'Fecha fin'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
    protected _periodoVentaRestService: PeriodoVentaRestService,
    private readonly _empresaRestService: EmpresaRestService,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _periodoVentaRestService,
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
        this.idEmpresa = +parametros.idEmpresa;
        this._empresaRestService.findOne(this.idEmpresa).subscribe(
          r => {
            this.nombrePapa = r.razonSocial;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_PERIODO_VENTA.rutaGestionPeriodoVenta(true, false, [
          this.idEmpresa,
        ]);
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_PERIODO_VENTA.rutaGestionPeriodoVenta(false, true, [
            this.idEmpresa,
          ]),
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
      : {empresa: this.idEmpresa};
    this.queryParams.skip = event.first;
    this.llamarDatos(
      event.first,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
    );
    this.loading = false;
  }

  buscarPorNombrePeriodo(busqueda: string) {
    this.optionalParams = {registroActual: undefined};
    const where = [
      {
        nombre: `Like(\"%25${busqueda}%25\")`,
        empresa: this.idEmpresa,
      },
    ];
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
  }

  escucharEstadoSeleccionado(value) {
    this.optionalParams = {registroActual: undefined};
    const estadoSeleccionado = value !== null ? value : undefined;
    const where = {
      empresa: this.idEmpresa,
      habilitado: estadoSeleccionado,
    };
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      where,
      undefined,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
  }

  abrirModalCrearPeriodoVenta() {
    const dialogRef = this.dialog.open(CrearEditarPeriodoVentaComponent, {
      width: '850px',
      data: {
        periodoVenta: undefined,
        idEmpresa: this.idEmpresa,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroCreado: PeriodoVentaInterface) => {
        if (registroCreado) {
          this.optionalParams = {registroActual: registroCreado.id};
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      });
  }

  abrirModalEditarPeriodoVenta(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarPeriodoVentaComponent, {
      width: '850px',
      data: {periodoVenta: registro},
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: PeriodoVentaInterface) => {
        if (registroEditado) {
          this.optionalParams = {registroActual: registroEditado.id};
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
      },
    );
  }

  buscarPorFechas(consulta) {
    const fechaInicioTemporal = moment(consulta.fechaInicioCruda).subtract(2, 'days');
    const  fechaInicio = fechaInicioTemporal.format('YYYY-MM-DD').toString();
    const fechaFinTemporal = moment(consulta.fechaFinalizacionCruda).add(1, 'days');
    const  fechaFin = fechaFinTemporal.format('YYYY-MM-DD').toString();
    const query = {
      fechaInicio: `MoreThan("${fechaInicio}")`,
      fechaFin: `LessThan("${fechaFin}")`,
      empresa: this.idEmpresa,
    };
    this.optionalParams = {registroActual: undefined};
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      query,
      undefined,
      undefined,
      this.queryParams.order,
      undefined,
      this.tipoBusqueda,
    );
  }


  abrirModalConfirmacionCambioPeriodo(registro) {
    const indiceRegistroCerrar = this.values.indexOf(registro);
    this.periodoAcerrar = registro;
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '1000px',
      data: {
        mensaje: '¿ Seguro que desea cerrar el periodo ?',
        titulo: 'Cierre de periodo',
        nombreBotonTrue: 'Aceptar',
        nombreBotonFalse: 'Cancelar',
      },
    });

    const respuestaModel$ = dialogRef.afterClosed();
    respuestaModel$.subscribe(r => {
      r ? this.migrarPeriodo(indiceRegistroCerrar) : null;
    });
  }

  migrarPeriodo(indiceRegistroCerrar) {
    const dialogRef = this.dialog.open(ModalPeriodoVentaMigrarComponent, {
      width: '850px',
      data: {
        periodoAcerrar: this.periodoAcerrar,
        empresa: this.idEmpresa,
      },
    });
    dialogRef.afterClosed().subscribe(
      (periodos: any) => {
        if (periodos) {
          this._toasterServicePrivate.pop(
            'success',
            'Success',
            'Periodo cerrado correctamente'
          );
          const indiceRegistroMigrar = this.values.findIndex(periodo => periodo.id === periodos.periodoMigrar.id);
          this.optionalParams = {registroActual: periodos.registroEditado.id};
          this.values[indiceRegistroMigrar].habilitado = 1;
          this.values[indiceRegistroCerrar].habilitado = 2;
          this.optionalParams.registroActual = periodos.registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(generarToasterErrorConMensaje('Error migrar'));
      },
    );
  }
}

