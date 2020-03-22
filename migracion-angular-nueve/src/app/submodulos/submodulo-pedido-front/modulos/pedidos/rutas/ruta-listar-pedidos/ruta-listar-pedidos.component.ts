import {Component, OnInit, ViewChild} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_PEDIDOS} from '../definicion-rutas/rutas-pedidos';
import {SelectMovimientoInterface} from '../../../../interfaces/select-movimiento.interface';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {ActivatedRoute, Router} from '@angular/router';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {IngresoEgresoCabeceraRestService} from '../../../../servicios/rest/ingreso-egreso-cabecera/ingreso-egreso-cabecera-rest.service';
import {
  IngresoEgresoCabeceraInterface
} from '../../../../servicios/rest/ingreso-egreso-cabecera/interfaces/ingreso-egreso-cabecera.interface';
import {
  TransferenciaCabeceraInterface
} from '../../../../servicios/rest/transferencia-cabecera/interfaces/transferencia-cabecera.interface';
import {CompraCabeceraInterface} from '../../../../servicios/rest/compra-cabecera/interfaces/compra-cabecera-interface';
import {TransferenciaCabeceraRestService} from '../../../../servicios/rest/transferencia-cabecera/transferencia-cabecera-rest.service';
import {CompraCabeceraRestService} from '../../../../servicios/rest/compra-cabecera/compra-cabecera-rest.service';
import {
  COLUMNAS_LISTAR_PEDIDOS,
  COLUMNAS_LISTAR_PEDIDOS_COMPRA,
  COLUMNAS_LISTAR_PEDIDOS_TRANSFERECIA
} from '../../../../constantes/columnas-tablas';
import {VentaCabeceraRestService} from '../../../../servicios/rest/venta-cabecera/venta-cabecera-rest.service';
import {ToasterService} from 'angular2-toaster';
import {toastErrorCargarDatos} from '../../../../../../constantes/mensajes-toaster';

@Component({
  selector: 'ml-ruta-listar-pedidos',
  templateUrl: './ruta-listar-pedidos.component.html',
  styleUrls: ['./ruta-listar-pedidos.component.scss']
})
export class RutaListarPedidosComponent extends RutaConMigasDePan implements OnInit {

  seEscogioMovimiento: boolean;

  idEmpresa: number;

  totalRegistros: number;

  codigoMovimiento: string;

  rutaGeneral: string;

  movimiento: SelectMovimientoInterface;

  pedidosEncontrados:
    IngresoEgresoCabeceraInterface[] |
    TransferenciaCabeceraInterface[] |
    CompraCabeceraInterface[] = [];

  rows = NUMERO_FILAS_TABLAS;

  skip = 0;

  loading = false;

  columnas;

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _cargandoService: CargandoService,
    private readonly _ingresoEgresoCabeceraRestService: IngresoEgresoCabeceraRestService,
    private readonly _transferenciaCabeceraRestService: TransferenciaCabeceraRestService,
    private readonly _compraCabeceraRestService: CompraCabeceraRestService,
    private readonly _ventaCabeceraRestService: VentaCabeceraRestService,
    private readonly _toasterService: ToasterService
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(r => {
      this.idEmpresa = +r.idEmpresa;
      const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
        RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
        RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
        RUTAS_PEDIDOS.rutaListarPedidos(false, true),
      ];
      this.establecerMigas(rutas);
      this.rutaGeneral = `empresa-modulo/${this.idEmpresa}/pedidos-modulo/gestion-listar-pedidos`;
      this._cargandoService.deshabilitarCargando();
    }, error => {
      console.error(error);
      this._cargandoService.deshabilitarCargando();
    });
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    // this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  setearPedidos(pedido: [
    IngresoEgresoCabeceraInterface[] |
    TransferenciaCabeceraInterface[] |
    CompraCabeceraInterface[], number]
  ) {
    this.pedidosEncontrados = pedido[0];
    this.totalRegistros = pedido[1];
  }

  recibirMovimientoSeleccionado(evento) {
    this.movimiento = evento;
    this.seEscogioMovimiento = true;
    this._cargandoService.habilitarCargando();
    this.setearDatosTabla(this.movimiento.codigo);
    if (this.movimiento.codigo === '01' || this.movimiento.codigo === '05') {
      this.columnas = COLUMNAS_LISTAR_PEDIDOS;
    }
    if (this.movimiento.codigo === '10') {
      this.columnas = COLUMNAS_LISTAR_PEDIDOS_TRANSFERECIA;
    }
    if (this.movimiento.codigo === '11') {
      this.columnas = COLUMNAS_LISTAR_PEDIDOS_COMPRA;
    }
    if (this.movimiento.codigo === '22') {
      this.columnas = COLUMNAS_LISTAR_PEDIDOS;
    }
  }

  buscarPedido(buscarPedido: string) {
    let pedidoEncontrado$;
    if (this.codigoMovimiento === '01') {
      if (buscarPedido === '') {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            numeroDocumentoMovimiento: `Like(\"%25${buscarPedido.trim()}%25\")`,
            tipoMovimiento: this.codigoMovimiento,
            idEmpresa: this.idEmpresa
          },
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._ingresoEgresoCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    if (this.codigoMovimiento === '05') {
      if (buscarPedido === '') {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            numeroDocumentoMovimiento: `Like(\"%25${buscarPedido.trim()}%25\")`,
            tipoMovimiento: this.codigoMovimiento,
            idEmpresa: this.idEmpresa
          },
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._ingresoEgresoCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    if (this.codigoMovimiento === '10') {
      if (buscarPedido === '') {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            numeroDocumentoMovimiento: `Like(\"%25${buscarPedido.trim()}%25\")`,
            idEmpresa: this.idEmpresa
          },
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._transferenciaCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    if (this.codigoMovimiento === '11') {
      if (buscarPedido === '') {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            numeroDocumentoMovimiento: `Like(\"%25${buscarPedido.trim()}%25\")`,
            idEmpresa: this.idEmpresa
          },
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._compraCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    if (this.codigoMovimiento === '22') {
      if (buscarPedido === '') {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            numeroDocumentoMovimiento: `Like(\"%25${buscarPedido.trim()}%25\")`,
            idEmpresa: this.idEmpresa
          },
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._ventaCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    this._cargandoService.habilitarCargando();
    pedidoEncontrado$
      .subscribe((respuesta) => {
        this._cargandoService.deshabilitarCargando();
        this.pedidosEncontrados = respuesta[0];
      }, error => {
        this._cargandoService.deshabilitarCargando();
        console.error({
          error,
          mensaje: 'Error buscando pedidos',
        });
        this._toasterService.pop(toastErrorCargarDatos);
      });
  }

  setearDatosTabla(codigoMovimiento: string) {
    let pedidos$;
    this.codigoMovimiento = codigoMovimiento;
    if (codigoMovimiento === '01') {
      const consulta = {
        where: {
          tipoMovimiento: codigoMovimiento,
          idEmpresa: this.idEmpresa
        },
        relations: ['bodega'],
        skip: 0,
        take: NUMERO_FILAS_TABLAS
      };
      pedidos$ = this._ingresoEgresoCabeceraRestService
        .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    }

    if (codigoMovimiento === '05') {
      const consulta = {
        where: {
          tipoMovimiento: codigoMovimiento,
          idEmpresa: this.idEmpresa
        },
        relations: ['bodega'],
        skip: 0,
        take: NUMERO_FILAS_TABLAS
      };
      pedidos$ = this._ingresoEgresoCabeceraRestService
        .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    }

    if (codigoMovimiento === '10') {
      const consulta = {
        where: {
          idEmpresa: this.idEmpresa
        },
        relations: ['bodega'],
        skip: 0,
        take: NUMERO_FILAS_TABLAS
      };
      pedidos$ = this._transferenciaCabeceraRestService
        .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    }

    if (codigoMovimiento === '11') {
      const consulta = {
        where: {
          idEmpresa: this.idEmpresa
        },
        relations: ['bodega', 'empresaProveedor'],
        skip: 0,
        take: NUMERO_FILAS_TABLAS
      };
      pedidos$ = this._compraCabeceraRestService
        .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    }

    if (codigoMovimiento === '22') {
      const consulta = {
        where: {
          idEmpresa: this.idEmpresa
        },
        skip: 0,
        take: NUMERO_FILAS_TABLAS
      };
      pedidos$ = this._ventaCabeceraRestService
        .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
    }

    pedidos$.subscribe((
      pedidos: [IngresoEgresoCabeceraInterface[] |
        TransferenciaCabeceraInterface[] |
        CompraCabeceraInterface[], number]
    ) => {
      this.pedidosEncontrados = pedidos[0];
      this.totalRegistros = pedidos[1];
      this._cargandoService.deshabilitarCargando();
    }, error => {
      console.error(error);
      this._cargandoService.deshabilitarCargando();
    });
  }

  filtrarPorEstado(estado) {
    let pedidoEncontrado$;
    if (this.codigoMovimiento === '01') {
      if (estado === null) {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            tipoMovimiento: this.codigoMovimiento,
            idEmpresa: this.idEmpresa,
            estatus: estado.acronimo
          },
          relations: ['bodega'],
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._ingresoEgresoCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    if (this.codigoMovimiento === '05') {
      if (estado === null) {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            tipoMovimiento: this.codigoMovimiento,
            idEmpresa: this.idEmpresa,
            estatus: estado.acronimo
          },
          relations: ['bodega'],
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._ingresoEgresoCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    if (this.codigoMovimiento === '10') {
      if (estado === null) {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            idEmpresa: this.idEmpresa,
            estatus: estado.acronimo
          },
          relations: ['bodega'],
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._transferenciaCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    if (this.codigoMovimiento === '11') {
      if (estado === null) {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            idEmpresa: this.idEmpresa,
            estatus: estado.acronimo
          },
          relations: ['bodega', 'empresaProveedor'],
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._compraCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    if (this.codigoMovimiento === '22') {
      if (estado === null) {
        this.setearDatosTabla(this.codigoMovimiento);
      } else {
        const consulta = {
          where: {
            idEmpresa: this.idEmpresa,
            estatus: estado.acronimo
          },
          skip: 0,
          take: NUMERO_FILAS_TABLAS
        };
        pedidoEncontrado$ = this._ventaCabeceraRestService
          .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
      }
    }
    this._cargandoService.habilitarCargando();
    pedidoEncontrado$
      .subscribe((respuesta) => {
        this._cargandoService.deshabilitarCargando();
        this.pedidosEncontrados = respuesta[0];
      }, error => {
        this._cargandoService.deshabilitarCargando();
        console.error({
          error,
          mensaje: 'Error cargando por estado'
        });
        this._toasterService.pop(toastErrorCargarDatos);
      });
  }

  verPedido(pedido) {
    let rutaADirigir;
    if (pedido.tipoMovimiento === '01' || pedido.tipoMovimiento === '05') {
      rutaADirigir = [this.rutaGeneral, 'detalle-pedido-ingreso-egreso', `${pedido.id}`];
    }
    if (pedido.tipoMovimiento === '10') {
      rutaADirigir = [this.rutaGeneral, 'detalle-pedido-transferencia', `${pedido.id}`];
    }
    if (pedido.tipoMovimiento === '11') {
      rutaADirigir = [this.rutaGeneral, 'detalle-pedido-compra', `${pedido.id}`];
    }
    this._router.navigate(rutaADirigir);
  }

  irANuevoPedido() {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'pedidos-modulo',
      'gestion-crear-pedido',
    ];
    this._router.navigate(ruta);
  }
}
