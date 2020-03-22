import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePanTablaBusqueda} from '@manticore-labs/ng-api';
import {ToasterService} from 'angular2-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {CajasService} from '../../../../servicios/rest/cajas.service';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {MatDialog} from '@angular/material';
import {KardexCaja} from '../../../../interfaces/cajas/kardex-caja';
import {KardexCajaRestService} from '../../../../servicios/rest/kardex-caja-rest.service';
import {RUTAS_CAJAS} from '../definicion-rutas/rutas-cajas';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {PuntoEmisionOperarioRestService, RespuestaTengoCajaActiva} from '../../../../servicios/rest/punto-emision-operario-rest.service';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';
import {PuntoEmisionOperarioInterface} from '../../../../interfaces/cajas/punto-emision-operario.interface';
import {IngresarKardexCaja} from '../../../../componentes/formularios/formulario-ingresar-kardex-caja/ingresar-kardex-caja';
import {
  ModalCuadrarCajaComponent
} from '../../../../componentes/modales/modal-cuadrar-caja/modal-cuadrar-caja/modal-cuadrar-caja.component';

@Component({
  selector: 'app-ruta-mi-caja',
  templateUrl: './ruta-mi-caja.component.html',
  styleUrls: ['./ruta-mi-caja.component.scss']
})
export class RutaMiCajaComponent extends RutaConMigasDePanTablaBusqueda <KardexCaja,
  KardexCajaRestService,
  ToasterService> implements OnInit {
  camposABuscar = [];

  rows = NUMERO_FILAS_TABLAS;

  columnas = [
    {field: 'valor', header: 'Valor', width: '20%'},
    {field: 'operacionSuma', header: 'Suma / Resta', width: '20%'},
    {field: 'razon', header: 'Razón', width: '20%'},
    {field: 'createdAt', header: 'Fecha de creación', width: '20%'},
  ];
  tieneCajaActiva = false;
  datosCaja: RespuestaTengoCajaActiva;
  datosPuntoEmisionOperario: PuntoEmisionOperarioInterface;

  esOperario = false;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _activatedRoute: ActivatedRoute,
    protected readonly _kardexCajaRestService: KardexCajaRestService,
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
      _kardexCajaRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
    this.queryParams.relations = [];
    this.queryParams.where = {
      puntoEmisionOperario: undefined,
    };
    this.queryParams.tipoBusqueda = 'findAll';
  }

  ngOnInit() {
    this.verificarSiTengoCajasActivas();
  }

  verificarSiTengoCajasActivas() {
    this._cargandoService.habilitarCargando();
    this._puntoEmisionOperarioRestService
      .tengoCajaActiva()
      .subscribe(
        (datos) => {
          if (datos.id === null) {
            const idOperarioPuntoEmision: string = this._activatedRoute.snapshot.params.idPuntoEmisionOperario;
            if (idOperarioPuntoEmision) {
              this.queryParams.where.puntoEmisionOperario = +idOperarioPuntoEmision;
              this.cargarCajaCabecera(+idOperarioPuntoEmision);
            } else {
              this._cargandoService.deshabilitarCargando();
              this._toasterServicePrivate.pop('info', 'Información', 'No tiene cajas activas');
            }
          } else {
            this.esOperario = true;
            this.datosCaja = datos;
            this.queryParams.where.puntoEmisionOperario = this.datosCaja.id;
            this.cargarCajaCabecera();
          }
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error cargando informacion de caja'
          });
          this._toasterServicePrivate.pop(toastErrorConexionServidor);
        }
      );
  }

  cargarCajaCabecera(idPuntoEmision?: number) {
    const consulta = {
      where: {
        id: idPuntoEmision ? idPuntoEmision : this.datosCaja.id,
      },
      relations: ['operario', 'puntoEmision'],
    };
    this._cargandoService.habilitarCargando();
    this._puntoEmisionOperarioRestService
      .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`)
      .subscribe(
        (registros) => {
          this.datosPuntoEmisionOperario = registros[0][0];
          this.empezarLogicaDeTabla();
        },
        (error) => {
          console.error({
            error,
            mensaje: 'No se pudo encontrar la caja',
          });
          this._toasterService.pop('error', 'Error', 'No se pudo encontrar la caja');
          this._cargandoService.deshabilitarCargando();
        }
      );
  }

  empezarLogicaDeTabla() {
    this._activatedRoute
      .params
      .subscribe(params => {
        if (this.esOperario) {
          this.ruta = RUTAS_CAJAS.rutaMiCaja(true, false, []);
          const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_CAJAS.rutaMiCaja(false, true, []),
          ];
          this.establecerMigas(rutas);
        } else {
          this.ruta = RUTAS_CAJAS.rutaMiCaja(true, false, []);
          const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_CAJAS.rutaGestionCajas(false, true, []),
            RUTAS_CAJAS.rutaCaja(false, true, [this.datosPuntoEmisionOperario.id]),
          ];
          this.establecerMigas(rutas);
        }


        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
        this.tieneCajaActiva = true;
      });
  }

  aceptarCaja() {
    this._cargandoService.habilitarCargando();
    this._puntoEmisionOperarioRestService
      .updateOne(this.datosCaja.id, {estado: 'ABI'})
      .subscribe(
        (data) => {
          this.datosPuntoEmisionOperario.estado = 'ABI';
          this._cargandoService.deshabilitarCargando();
        },
        (error) => {
          console.error({
            error,
            mensaje: 'Error actualizando estado de cabecera',
          });
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
        }
      );
  }

  cuadrarCaja() {
    const dialogRef = this.matDialog.open(ModalCuadrarCajaComponent, {
      width: '700px',
      data: {
        puntoEmisionOperario: this.datosCaja.id,
      },
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado) => {
      this.datosPuntoEmisionOperario.estado = 'CUA';
    });
  }


  gestionarVentas() {
    const ruta = [
      'cajas', 'mi-caja' , 'gestion-ventas'
    ];
    this._router.navigate(ruta);
  }
}
