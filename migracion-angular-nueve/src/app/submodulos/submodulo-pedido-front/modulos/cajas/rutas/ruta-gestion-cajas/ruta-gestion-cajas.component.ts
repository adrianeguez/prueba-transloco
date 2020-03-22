import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {PuntoEmisionOperarioInterface} from '../../../../interfaces/cajas/punto-emision-operario.interface';
import {PuntoEmisionOperarioRestService} from '../../../../servicios/rest/punto-emision-operario-rest.service';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {CargandoService, DatosFilterFechaInterface, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_CAJAS} from '../definicion-rutas/rutas-cajas';
import {EstadoPuntoEmisionOperario} from '../../../../enums/estado-punto-emision-operario';
import {ARREGLO_ESTADO_PUNTO_EMISION_OPERARIO} from '../../../../constantes/arreglo-estado-punto-emision-operario';
import {CajasService} from '../../../../servicios/rest/cajas.service';
import {toastErrorConexionServidor, ToastErrorTrayendoDatos} from '../../../../../../constantes/mensajes-toaster';
import { MatDialog } from '@angular/material/dialog';
import {
  ModalSeleccionarEstablecimientoComponent
  // tslint:disable-next-line: max-line-length
} from '../../../../componentes/modales/modal-seleccionar-establecimiento/modal-seleccionar-establecimiento/modal-seleccionar-establecimiento.component';
import {
  ModalSeleccionarOperarioComponent
} from '../../../../componentes/modales/modal-seleccionar-operario/modal-seleccionar-operario/modal-seleccionar-operario.component';
import {
  ModalCrearPtoEmiOpeComponent
} from '../../../../componentes/modales/modal-crear-pto-emi-ope/modal-crear-pto-emi-ope/modal-crear-pto-emi-ope.component';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {
  ModalIngresarKardexCajaComponent
} from '../../../../componentes/modales/modal-ingresar-kardex-caja/modal-ingresar-kardex-caja/modal-ingresar-kardex-caja.component';
import {IngresarKardexCaja} from '../../../../componentes/formularios/formulario-ingresar-kardex-caja/ingresar-kardex-caja';

@Component({
  selector: 'mlab-ruta-gestion-cajas',
  templateUrl: './ruta-gestion-cajas.component.html',
  styleUrls: ['./ruta-gestion-cajas.component.scss']
})
export class RutaGestionCajasComponent
  extends RutaConMigasDePanTablaBusqueda <PuntoEmisionOperarioInterface,
    PuntoEmisionOperarioRestService,
    ToasterService> implements OnInit {
  camposABuscar = [];

  rows = NUMERO_FILAS_TABLAS;

  columnas = [
    {field: 'estado', header: 'Estado', width: '10%'},
    {field: 'fechaHoraInicio', header: 'Fecha/Hora', width: '10%'},
    {field: 'novedadInicio', header: 'Novedades', width: '20%'},
    {field: 'valorInicia', header: 'Valores', width: '20%'},
    {field: 'operario', header: 'Trabajadores', width: '20%'},
    {field: 'id', header: 'Acciones', width: '20%'},
  ];

  estadosPuntoEmisionOperario = ARREGLO_ESTADO_PUNTO_EMISION_OPERARIO;

  estadoFiltrado = EstadoPuntoEmisionOperario.abierto;

  fechaInicioFiltro: string;
  fechaFinFiltro: string;

  establecimientoSeleccionado;

  operarioSeleccionado;

  administrador;

  configuracionPuntoEmisionOperario;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _activatedRoute: ActivatedRoute,
    protected readonly _puntoEmisionOperarioRestService: PuntoEmisionOperarioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    protected _cargandoService: CargandoService,
    private readonly _cajasService: CajasService,
    private readonly _auth0: Auth0Service,
    public matDialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _puntoEmisionOperarioRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
    this.queryParams.relations = ['operario', 'administradorEstablecimiento'];
    this.queryParams.where = {
      estado: this.estadoFiltrado,
      administradorEstablecimiento: `In([${this._auth0.empresaSeleccionada.administradorEn.map((r) => r.id)}])`,

    };
    this.queryParams.tipoBusqueda = 'findAll';
  }

  ngOnInit() {
    this.administrador = this._auth0.empresaSeleccionada.administradorEn.map(o => o.id)[0];
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(params => {

      this.ruta = RUTAS_CAJAS.rutaGestionCajas(true, false, []);
      const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
        RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
        RUTAS_CAJAS.rutaGestionCajas(false, true, []),
      ];
      this.establecerMigas(rutas);
      this.escucharCambiosEnQueryParams();
      this.escucharCambiosEnParametros();
      this._cargandoService.deshabilitarCargando();
    });
  }

  mostrarHoraYMinuto(fechaString: string) {
    if (fechaString) {
      const fecha = new Date(fechaString);
      return fecha.getHours() + ':' + fecha.getMinutes();
    } else {
      return '';
    }
  }

  obtenerTitulo(estado: 'CRE' | 'ABI' | 'CUA' | 'CER') {
    switch (estado) {
      case 'ABI':
        return 'Abierto';
      case 'CER':
        return 'Cerrado';
      case 'CRE':
        return 'Creado';
      case 'CUA':
        return 'Cuadrado';
      default:
        return estado;
    }
  }

  fechasSeleccionada(fechas: DatosFilterFechaInterface) {
    this.fechaInicioFiltro = fechas.fechaInicioCruda;
    this.fechaFinFiltro = fechas.fechaFinalizacionCruda;
    this.cargarDatos();
  }

  cargarDatos(event?: any): void {
    this.queryParams.tipoBusqueda = 'findAll';
    this.loading = true;
    if (this.queryParams.tipoBusqueda === 'findAll') {

      this.queryParams.where.estado = this.estadoFiltrado;

      if (this.fechaInicioFiltro && this.fechaFinFiltro) {
        this.queryParams.where.fechaHoraInicio = `Between(\"${this.fechaInicioFiltro},${this.fechaFinFiltro}\")`;
      }

      this.llamarDatos(
        this.queryParams.skip,
        this.queryParams.where,
        this.queryParams.camposABuscar,
        this.optionalParams,
        this.queryParams.order,
        this.queryParams.relations);
    } else {
      console.error({
        error: 400,
        mensaje: 'Error, no existe otro tipo de busqueda en esta pantalla'
      });
    }
  }

  seleccionarEstablecimientos(seleccionarEstablecimiento?: boolean) {
    if (seleccionarEstablecimiento) {
      this.obtenerEstablecimientos();
    } else {
      if (this.establecimientoSeleccionado) {
        this._toasterServicePrivate.pop('info', `Buscando en establecimiento: ` +
          `${this.establecimientoSeleccionado.nombre} - ${this.establecimientoSeleccionado.codigo} - ` +
          `${this.establecimientoSeleccionado.edificio.nombre}`);
        this.buscarOperarios();
      } else {
        this.obtenerEstablecimientos();
      }
    }

  }

  obtenerEstablecimientos() {
    this._cargandoService.habilitarCargando();
    this._cajasService
      .obtenerEstablecimientosPorAdministrador(this._auth0.empresaSeleccionada.administradorEn.map(o => o.id))
      .subscribe(
        (respuesta) => {
          this._cargandoService.deshabilitarCargando();
          console.log(respuesta);
          this.abrirModalSeleccionOperarios(respuesta[0].map(r => r.establecimiento));
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error: error,
            mensaje: 'Error consultando datos para seleccionar establecimiento'
          });
          this._toasterService.pop(ToastErrorTrayendoDatos);
        }
      );
  }

  abrirModalSeleccionOperarios(establecimientos: any[]) {
    if (establecimientos.length > 0) {
      const dialogRef = this.matDialog.open(ModalSeleccionarEstablecimientoComponent, {
        data: {
          establecimientos
        }
      });
      const resultadoModal$ = dialogRef.afterClosed();

      resultadoModal$.subscribe((establecimiento) => {
          if (establecimiento) {
            this.establecimientoSeleccionado = establecimiento;
            this.buscarOperarios();
          }
        },
        error => {
          console.log(error);
        });
    } else {
      this._toasterService.pop('warn', 'Lo sentimos', 'No tiene establecimientos disponibles');
    }

  }

  buscarOperarios() {
    const operariosParaAsignar$ = this._cajasService
      .obtenerOperariosParaAsignar(this.establecimientoSeleccionado.id);

    operariosParaAsignar$
      .subscribe(
        (operarios) => {
          console.log(operarios);
          this.seleccionarOperario(operarios[0]);
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error: error,
            mensaje: 'Error consultando datos para asignar operarios'
          });
          this.establecimientoSeleccionado = undefined;
          this._toasterService.pop(
            'error',
            'Revise si tiene operarios en este establecimiento o inténtalo más tarde.'
          );
        }
      );
  }

  seleccionarOperario(operarios: any[]) {
    if (operarios.length > 0) {
      const dialogRef = this.matDialog.open(ModalSeleccionarOperarioComponent, {
        width: '600px',
        data: {
          operarios,
          establecimiento: this.establecimientoSeleccionado
        }
      });
      const resultadoModal$ = dialogRef.afterClosed();

      resultadoModal$.subscribe((respuesta) => {
          if (respuesta) {
            if (respuesta.operario) {
              this.operarioSeleccionado = respuesta.operario;
              this.crearPuntoEmisionOpeario();
            }
            if (respuesta.cambiarEstablecimiento) {
              this.seleccionarEstablecimientos(true);
            }
          }
        },
        error => {
          console.log(error);
        });
    } else {
      this._toasterService.pop('warn', 'Lo sentimos', 'No tiene operarios disponibles');
    }
  }

  crearPuntoEmisionOpeario() {
    const dialogRef = this.matDialog.open(ModalCrearPtoEmiOpeComponent, {
      width: '600px',
      data: {
        operario: this.operarioSeleccionado,
        establecimiento: this.establecimientoSeleccionado,
        administrador: this.administrador,
      }
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe((respuesta) => {
        if (respuesta) {
          const consulta = {
            where: {
              id: respuesta.id,
            },
            relations: ['operario', 'administradorEstablecimiento'],
          };
          this._cargandoService.habilitarCargando();
          this._puntoEmisionOperarioRestService
            .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`)
            .subscribe(
              (data) => {
                this._cargandoService.deshabilitarCargando();
                this.values.unshift(data[0][0]);
              },
              (error) => {
                console.error({
                  error,
                  mensaje: 'Error buscando punto emision operario'
                });
                this._cargandoService.deshabilitarCargando();
                this._toasterService.pop(toastErrorConexionServidor);
              }
            );
        }
      },
      error => {
        console.log(error);
      });
  }


  abrirModalAnadirKardexCaja(registro) {
    if (registro) {
      this.establecerRegistroActual(registro.id);
    }
    const dialogRef = this.matDialog.open(ModalIngresarKardexCajaComponent, {
      width: '700px',
      data: {
        puntoEmisionOperario: registro.id
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: IngresarKardexCaja) => {
      if (registroCreado) {
      }
    });
  }

  aceptarCaja(registro) {
    this._cargandoService.habilitarCargando();
    this._puntoEmisionOperarioRestService
      .updateOne(registro.id, {estado: 'CER'})
      .subscribe(
        (data) => {
          const indice = this.values.findIndex(r => r.id === registro.id);
          this.values[indice].estado = 'CER';
          this._cargandoService.deshabilitarCargando();
        },
        (error) => {
          console.error({
            error,
            mensaje: 'Error actualizando caja',
          });
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
        }
      );
  }

  visitarCaja(registro) {
    const url = RUTAS_CAJAS.rutaCaja(true, false, [registro.id]);
    this._router.navigate(url);
  }

}

