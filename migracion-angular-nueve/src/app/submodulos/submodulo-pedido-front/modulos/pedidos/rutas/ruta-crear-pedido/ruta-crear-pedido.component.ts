import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_PEDIDOS} from '../definicion-rutas/rutas-pedidos';
import {ActivatedRoute, Router} from '@angular/router';
import {QueryParamsMovimientos} from '../../../../interfaces/query-params-movimientos';
import {
  ModalListaMovimientoComponent
} from '../../../../componentes/modales/modal-lista-movimiento/modal-lista-movimiento/modal-lista-movimiento.component';
import {MatDialog} from '@angular/material';
import {MovimientoRestService} from '../../../../servicios/rest/movimiento-rest.service';
import {ToasterService} from 'angular2-toaster';
import {flatMap, map} from 'rxjs/operators';
import {BodegaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/bodega-rest.service';
import {ToastErrorTrayendoDatos} from '../../../../../../constantes/mensajes-toaster';
import {MovimientoInterface} from '../../../../interfaces/movimiento.interface';
import {InformacionTributariaInterface} from '../../../../../submodulo-empresa-front/interfaces/informacion-tributaria.interface';
import {InformacionTributariaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/informacion-tributaria-rest.service';
import {FindManyOptions} from 'typeorm';
import {BodegaInterface} from '../../../../../submodulo-empresa-front/interfaces/bodega.interface';
import {
  ModalIngresarCabeceraMovimientoComprasComponent
  // tslint:disable-next-line: max-line-length
} from '../../../../componentes/modales/modal-ingresar-cabecera-movimiento-compras/modal-ingresar-cabecera-movimiento-compras/modal-ingresar-cabecera-movimiento-compras.component';
import {
  DatosCompraInterface,
  DatosPedidoCompraInterface
} from '../../../../componentes/compra/compra/compra.component';
import {
  ModalIngresarCabeceraMovimientoClientesComponent
  // tslint:disable-next-line: max-line-length
} from '../../../../componentes/modales/modal-ingresar-cabecera-movimiento-clientes/modal-ingresar-cabecera-movimiento-clientes/modal-ingresar-cabecera-movimiento-clientes.component';
import {DatosClientesInterface} from '../../../../componentes/clientes/clientes/clientes.component';
import {DatosAjustesInterface} from '../../../../componentes/ajustes/ajustes/ajustes.component';
import {
  ModalIngresarCabeceraMovimientoAjustesComponent
  // tslint:disable-next-line: max-line-length
} from '../../../../componentes/modales/modal-ingresar-cabecera-movimiento-ajustes/modal-ingresar-cabecera-movimiento-ajustes/modal-ingresar-cabecera-movimiento-ajustes.component';
import {
  ModalIngresarCabeceraMovimientoTransferenciasComponent
  // tslint:disable-next-line: max-line-length
} from '../../../../componentes/modales/modal-ingresar-cabecera-movimiento-transferencias/modal-ingresar-cabecera-movimiento-transferencias/modal-ingresar-cabecera-movimiento-transferencias.component';
import {
  ModalListaBodegasComponent
} from '../../../../../submodulo-empresa-front/componentes/modales/modal-lista-bodegas/modal-lista-bodegas/modal-lista-bodegas.component';
import {DatosTransferenciaInterface} from '../../../../componentes/transferencia/transferencia/transferencia.component';
import {MovimientoCabeceraInterface} from '../../../../interfaces/movimientos/pedido-compra-interface';
import {VentaCabeceraRestService} from '../../../../servicios/rest/venta-cabecera/venta-cabecera-rest.service';
import {CompraCabeceraRestService} from '../../../../servicios/rest/compra-cabecera/compra-cabecera-rest.service';
import {TransferenciaCabeceraRestService} from '../../../../servicios/rest/transferencia-cabecera/transferencia-cabecera-rest.service';
import {IngresoEgresoCabeceraRestService} from '../../../../servicios/rest/ingreso-egreso-cabecera/ingreso-egreso-cabecera-rest.service';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {
  COLUMNAS_COMPRA_DEVOLUCION_PROVEEDORES,
  COLUMNAS_FACTURA_DEVOLUCION_CLIENTES,
  COLUMNAS_INGRESO_EGRESO, COLUMNAS_PEDIDOS_COMPRA, COLUMNAS_TRANSFERENCIAS_BODEGA
} from '../../../../constantes/columnas-tablas';
import {IngresoEgresoDetalleRestService} from '../../../../servicios/rest/ingreso-egreso-detalle/ingreso-egreso-detalle-rest.service';
import {IngresoEgresoDetalleInterface} from '../../../../servicios/rest/ingreso-egreso-detalle/interfaces/ingreso-egreso-detalle.interface';
import {PedidoDetalleInterface} from '../../../../interfaces/pedido-detalle.interface';
import {TransferenciaDetalleRestService} from '../../../../servicios/rest/transferencia-detalle/transferencia-detalle-rest.service';
import {TransferenciaDetalleInterface} from '../../../../servicios/rest/transferencia-detalle/interfaces/transferencia-detalle.interface';
import {MovimientoDetalleInterface} from '../../../../interfaces/movimientos/movimiento-detalle.interface';
import {
  CompraDetalleInterface, DescuentosCompraDetalleInterface,
  PedidoCompraDetalleInterface
} from '../../../../servicios/rest/compra-detalle/interfaces/compra-detalle.interface';
import {CompraDetalleRestService} from '../../../../servicios/rest/compra-detalle/compra-detalle-rest.service';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {
  ModalBuscarClienteComponent
} from '../../../../componentes/modales/modal-buscar-cliente/modal-buscar-cliente/modal-buscar-cliente.component';
import {
  ModalBuscarProveedorComponent
} from '../../../../componentes/modales/modal-buscar-proveedor/modal-buscar-proveedor/modal-buscar-proveedor.component';
import {EmpresaProveedorInterface} from '../../../../servicios/rest/empresa-proveedores/interfaces/empresa-proveedor.interface';
import {EmpresaProveedorRestService} from '../../../../servicios/rest/empresa-proveedores/empresa-proveedor-rest.service';

@Component({
  selector: 'mlab-ruta-crear-pedido',
  templateUrl: './ruta-crear-pedido.component.html',
  styleUrls: ['./ruta-crear-pedido.component.scss']
})
export class RutaCrearPedidoComponent extends RutaConMigasDePan implements OnInit {

  seleccionarTipoYBodega = true;
  queryParams: QueryParamsMovimientos = {
    bodegaDestino: undefined,
    bodegaOrigen: undefined,
    tipoMovimiento: undefined,
    clienteOProveedor: undefined,
    tipoMovimientoNombre: undefined
  };

  cabecera: {
    movimiento: MovimientoInterface | any,
    informacionTributaria?: InformacionTributariaInterface | any,
    bodega: BodegaInterface | any,
    proveedor?: EmpresaProveedorInterface | any;
    cabeceraIngreso?: number,
    cabeceraEgreso?: number,
    cabeceraTransferencia?: number,
    cabeceraCompra?: number
  };

  datosCabeceraCompra: DatosCompraInterface;

  datosCabeceraPedidoCompra: DatosPedidoCompraInterface;

  datosCabeceraCliente: DatosClientesInterface;

  datosCabeceraAjustes: DatosAjustesInterface;

  datosCabeceraTransferencia: DatosTransferenciaInterface;

  crearDatosCabecera: boolean;

  crearDetalle: boolean;

  detalleCreado: boolean;

  pedidoGuardado: boolean;

  esPedido: boolean;

  esCompraVenta: boolean;

  resultadoCabecera: any;

  idEmpresa: number;

  idBodega: number;

  idBodegaDestino: number;

  tipoMovimiento: string;

  ruta: string[];

  articuloAgregado: PedidoDetalleInterface;

  arregloArticulosDetalle: PedidoDetalleInterface[];

  ingresoEgreso = COLUMNAS_INGRESO_EGRESO;

  compraDevolucionProveedores = COLUMNAS_COMPRA_DEVOLUCION_PROVEEDORES;

  facturaDevolucionClientes = COLUMNAS_FACTURA_DEVOLUCION_CLIENTES;

  transferenciaBodegas = COLUMNAS_TRANSFERENCIAS_BODEGA;

  pedidoCompra = COLUMNAS_PEDIDOS_COMPRA;

  constructor(protected _emitirMigaPanService: EmitirMigaPanService,
              private readonly _activatedRoute: ActivatedRoute,
              public matDialog: MatDialog,
              private readonly _router: Router,
              private readonly _movimientoRestService: MovimientoRestService,
              private readonly _bodegaRestService: BodegaRestService,
              private readonly _toasterService: ToasterService,
              private readonly _cargandoService: CargandoService,
              private readonly _informacionTributariaRestService: InformacionTributariaRestService,
              private readonly _auth0Service: Auth0Service,
              private readonly _ventaCabeceraRestService: VentaCabeceraRestService,
              private readonly _compraCabeceraRestService: CompraCabeceraRestService,
              private readonly _transferenciaCabeceraRestService: TransferenciaCabeceraRestService,
              private readonly _ingresoEgresoCabeceraRestService: IngresoEgresoCabeceraRestService,
              private readonly _ingresoEgresoDetalleRestService: IngresoEgresoDetalleRestService,
              private readonly _transferenciaDetalleRestService: TransferenciaDetalleRestService,
              private readonly _compraDetalleRestService: CompraDetalleRestService,
              private readonly _empresaProveedorRestService: EmpresaProveedorRestService
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
        RUTAS_PEDIDOS.rutaCrearPedido(false, true, [this.idEmpresa]),
      ];
      this.establecerMigas(rutas);
      this.escucharCambiosQueryParams();
      this.ruta = [`empresa-modulo/${this.idEmpresa}/pedidos-modulo/gestion-crear-pedido`];
      this._cargandoService.deshabilitarCargando();
    }, error => {
      console.error(error);
      this._cargandoService.deshabilitarCargando();
    });
  }

  escucharCambiosQueryParams() {
    this._activatedRoute
      .queryParams
      .subscribe(
        (queryParams: QueryParamsMovimientos) => {
          this.queryParams = {
            ...queryParams
          };
          this.idBodega = +queryParams.bodegaOrigen;
          const tieneDatosMinimos = queryParams.tipoMovimiento && queryParams.bodegaOrigen && queryParams.clienteOProveedor;
          if (tieneDatosMinimos) {
            this.cargarMovimientoBodegaYClienteOProveedor(
              +queryParams.tipoMovimiento,
              +queryParams.bodegaOrigen,
              queryParams.clienteOProveedor
            );
          }
        }
      );
  }

  cargarMovimientoBodegaYClienteOProveedor(idMovimiento: number, idBodega: number, cedulaRucPasaporte?: string) {
    this._cargandoService.habilitarCargando();
    const consultaMovimiento: FindManyOptions<MovimientoInterface> = {
      where: {
        id: idMovimiento
      },
      relations: ['tipoMovimiento']
    };
    let bodegaMovimientoProveedor$;
    bodegaMovimientoProveedor$ = this._movimientoRestService
      .findAll('criterioBusqueda=' + JSON.stringify(consultaMovimiento))
      .pipe(
        flatMap(
          (movimientoRespuesta) => {
            const movimiento = movimientoRespuesta[0][0];
            return this._bodegaRestService
              .findOne(idBodega)
              .pipe(
                map(
                  (bodega) => {
                    return {
                      bodega,
                      movimiento,
                    };
                  }
                )
              );
          }
        ),
        flatMap(
          (respuesta) => {
            const consulta = {
              busqueda: cedulaRucPasaporte,
              idEmpresa: this.idEmpresa,
              camposABuscar: ['ruc', 'razonSocial']
            };
            return this._empresaProveedorRestService
              .obtenerEmpresasProveedoresPorRazonSocialRuc(consulta)
              .pipe(
                map(
                  (proveedor) => {
                    const info = proveedor[0][0];
                    return {
                      ...respuesta,
                      proveedor: info,
                    };
                  }
                )
              );
          }
        )
        /*flatMap(
          (respuesta) => {
            const consulta: FindManyOptions<InformacionTributariaInterface> = {
              where: {
                documento: cedulaRucPasaporte,
              },
              relations: ['empresa']
            };
            return this._informacionTributariaRestService
              .findAll('criterioBusqueda=' + JSON.stringify(consulta))
              .pipe(
                map(
                  (informacionTributaria) => {
                    const info = informacionTributaria[0][0];
                    return {
                      ...respuesta,
                      informacionTributaria: info,
                    };
                  }
                )
              );
          }
        ),*/
      );
    bodegaMovimientoProveedor$.subscribe(
      (bodegaMovimientoProveedor) => {
        this._cargandoService.deshabilitarCargando();
        this.cabecera = bodegaMovimientoProveedor;
      },
      (error) => {
        this._cargandoService.deshabilitarCargando();
        console.error({
          mensaje: 'Error cargando movimientos',
          error
        });
        this._toasterService.pop(ToastErrorTrayendoDatos);
      }
    );
  }

  abrirModalSeleccionarTipoMovimiento() {
    const dialogRef = this.matDialog
      .open(ModalListaMovimientoComponent, {
        width: '600px',
        data: {
          empresaId: this._auth0Service.empresaSeleccionada.empresa.id,
        }
      });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe((movimientoSeleccionado: MovimientoInterface) => {
        if (movimientoSeleccionado) {
          if (movimientoSeleccionado.nombre === 'Venta') {
            this._toasterService.pop('warn', 'Lo sentimos', 'No puede vender aquí');
          } else {
            this.tipoMovimiento = movimientoSeleccionado.tipoMovimiento.nombre;
            console.log('tipo mov?', this.tipoMovimiento);
            this.queryParams.tipoMovimiento = movimientoSeleccionado.codigo.toString();
            // const url = RUTAS_PEDIDOS.rutaCrearPedido(false, true).ruta;

            this.datosCabeceraTransferencia = undefined;
            this.datosCabeceraAjustes = undefined;
            this.datosCabeceraCliente = undefined;
            this.datosCabeceraCompra = undefined;

            this._router.navigate(this.ruta, {
              queryParams: {
                ...this.queryParams,
                tipoMovimiento: movimientoSeleccionado.id
              }
            });
          }
          // const urlRouter = this._router.url;
          // const indiceQueryParams = urlRouter.indexOf('?');
          // const url: string = urlRouter.substring(0, indiceQueryParams === -1 ? urlRouter.length : indiceQueryParams);
          // this._router.navigateByUrl(url + '?');
        }
      },
      error => {
        console.log(error);
      });
  }

  abrirModalSeleccionarBodega() {
    const dialogRef = this.matDialog.open(ModalListaBodegasComponent, {
      width: '900px',
      data: {
        idEmpresa: this.idEmpresa
      }
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe((bodegaSeleccionado: BodegaInterface) => {
        if (bodegaSeleccionado) {
          this.queryParams.bodegaOrigen = bodegaSeleccionado.id.toString();
          if (this.tipoMovimiento !== 'Compras') {
            this._router.navigate(this.ruta, {
              queryParams: {
                ...this.queryParams,
                bodegaOrigen: bodegaSeleccionado.id,
                clienteOProveedor: this.idEmpresa
              }
            });
            this.idBodega = +this.queryParams.bodegaOrigen;
          } else {
            this._router.navigate(this.ruta, {
              queryParams: {
                ...this.queryParams,
                bodegaOrigen: bodegaSeleccionado.id
              }
            });
            this.idBodega = +this.queryParams.bodegaOrigen;
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  abrirModalCliente() {
    const dialogRef = this.matDialog.open(ModalBuscarClienteComponent, {
      width: '600px',
      data: {esVenta: false}
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((informacionTributaria: InformacionTributariaInterface) => {
      if (informacionTributaria) {
        this.queryParams.clienteOProveedor = informacionTributaria.documento;
        this._router.navigate(this.ruta, {
          queryParams: {
            ...this.queryParams,
            clienteOProveedor: informacionTributaria.documento
          }
        });
      }
    });
  }

  abrirModalProveedor() {
    const dialogRef = this.matDialog.open(ModalBuscarProveedorComponent, {
      width: '600px',
      data: {idEmpresa: this.idEmpresa}
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((respuesta: EmpresaProveedorInterface) => {
      if (respuesta) {
        console.log('Respuesta modal proveedor?', respuesta);
        this.queryParams.clienteOProveedor = respuesta.empresaProveedor.ruc;
        this._router.navigate(this.ruta, {
          queryParams: {
            ...this.queryParams,
            clienteOProveedor: respuesta.empresaProveedor.ruc
          }
        });
      }
    });
  }

  seleccionoInformacionTributaria(informacionTributaria: InformacionTributariaInterface) {
    // const url = RUTAS_PEDIDOS.rutaCrearPedido(false, true).ruta;
    this._router.navigate(this.ruta, {
      queryParams: {
        ...this.queryParams,
        clienteOProveedor: informacionTributaria.documento
      }
    });
  }

  abrirModalIngresarCabeceraMovimientoCompras() {
    const dialogRef = this.matDialog.open(ModalIngresarCabeceraMovimientoComprasComponent, {
      width: '600px',
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe((datosCompra: DatosCompraInterface) => {
        if (datosCompra) {
          this.datosCabeceraCompra = datosCompra;
          this.datosCabeceraCompra.numeroAutorizacion = String(datosCompra.numeroAutorizacion);
          this.datosCabeceraCompra.facturaElectronica = +datosCompra.facturaElectronica;
          /*if (datosCompra.esPedido === 'si') {
            this.esPedido = true;
            this.datosCabeceraPedidoCompra = datosCompra.pedido;
            this.datosCabeceraPedidoCompra.prioridad = Boolean(datosCompra.pedido.prioridad);
          }
          if (datosCompra.esPedido === 'no') {
            this.esPedido = false;
            this.datosCabeceraCompra = datosCompra.compra;
            this.datosCabeceraCompra.numeroAutorizacion = Number(datosCompra.compra.numeroAutorizacion);
            this.datosCabeceraCompra.facturaElectronica = Boolean(datosCompra.compra.facturaElectronica);
            this.datosCabeceraCompra.prioridad = Boolean(datosCompra.pedido.prioridad);
          }*/
          console.log('Se seleccióno?', datosCompra);
        }
      },
      error => {
        console.log(error);
      });
  }

  abrirModalIngresarCabeceraMovimientoClientes() {
    const dialogRef = this.matDialog.open(ModalIngresarCabeceraMovimientoClientesComponent, {
      width: '600px'
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe((datosCliente: DatosClientesInterface) => {
        if (datosCliente) {
          this.datosCabeceraCliente = datosCliente;
          console.log('datos cli?', datosCliente);
        }
      },
      error => {
        console.log(error);
      });
  }

  abrirModalIngresarCabeceraMovimientoAjustes() {
    console.log('this.datosCabeceraAjustes', this.datosCabeceraAjustes);
    this.datosCabeceraAjustes = undefined;
    const tipoAjuste = this.cabecera.movimiento.nombre === 'Ingreso por ajuste'
      ? 'ingreso' : 'egreso';
    const dialogRef = this.matDialog.open(ModalIngresarCabeceraMovimientoAjustesComponent, {
      width: '600px',
      data: {
        tipoAjuste,
        empresaId: this._auth0Service.empresaSeleccionada.empresa.id,
      }
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe((datosAjustes: DatosAjustesInterface) => {
        if (datosAjustes) {
          this.datosCabeceraAjustes = datosAjustes;
          console.log('datos ajustes?', datosAjustes);
        }
      },
      error => {
        console.log(error);
      });
  }

  abrirModalIngresarCabeceraMovimientoTransferencia() {
    const dialogRef = this.matDialog.open(ModalIngresarCabeceraMovimientoTransferenciasComponent, {
      width: '600px',
      data: {
        bodegaOrigen: this.cabecera.bodega,
        idEmpresa: this.idEmpresa
      }
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe((datosTransferencia: DatosTransferenciaInterface) => {
        if (datosTransferencia) {
          this.datosCabeceraTransferencia = datosTransferencia;
          this.idBodegaDestino = this.datosCabeceraTransferencia.idBodegaDestino.id;
        }
      },
      error => {
        console.log(error);
      });
  }

  guardarCabecera() {
    const cabeceraMovimiento: MovimientoCabeceraInterface = {
      tipoMovimiento: this.cabecera.movimiento.codigo,
      idBodegaOrigen: this.cabecera.bodega.id,
    };
    console.log('this.cabecera.movimiento', this.cabecera.movimiento);
    let crearCabecera$;
    switch (this.cabecera.movimiento.tipoMovimiento.nombre) {
      case 'Compras':
        if (this.cabecera.movimiento.codigo === '11') {
          if (this.datosCabeceraCompra) {
            cabeceraMovimiento.idOperarioOVendedor = 1;
            cabeceraMovimiento.datosCabecera = this.datosCabeceraCompra;
            cabeceraMovimiento.datosCabecera.idClienteOProveedor = this.cabecera.proveedor.empresaProveedor.id;
            crearCabecera$ = this._compraCabeceraRestService.guardarCabeceraCompra(cabeceraMovimiento);
            /*if (this.cabecera.informacionTributaria.empresa !== null) {
              cabeceraMovimiento.idOperarioOVendedor = 1;
              cabeceraMovimiento.datosCabecera = this.datosCabeceraCompra;
              cabeceraMovimiento.datosCabecera.idClienteOProveedor = this.cabecera.proveedor.empresaProveedor.id;
              crearCabecera$ = this._compraCabeceraRestService.guardarCabeceraCompra(cabeceraMovimiento);
            } else {
              this._toasterService.pop(
                'warning',
                'CUIDADO',
                'El proveedor seleccionado no posee artículos'
              );
              this._cargandoService.deshabilitarCargando();
            }*/
          }
          if (this.datosCabeceraPedidoCompra) {
            cabeceraMovimiento.idOperarioOVendedor = 1;
            cabeceraMovimiento.datosCabecera = this.datosCabeceraPedidoCompra;
            cabeceraMovimiento.datosCabecera.idClienteOProveedor = this.cabecera.proveedor.empresaProveedor.id;
            crearCabecera$ = this._compraCabeceraRestService.guardarCabeceraPedidoCompra(cabeceraMovimiento);
          }
        }
        break;
      case 'Clientes':
        cabeceraMovimiento.datosCabecera = this.datosCabeceraCliente;
        crearCabecera$ = this._ventaCabeceraRestService.guardarCabecera(cabeceraMovimiento);
        break;
      case 'Transferencias':
        cabeceraMovimiento.idOperarioOVendedor = 1;
        cabeceraMovimiento.datosCabecera = this.datosCabeceraTransferencia;
        cabeceraMovimiento.datosCabecera.idBodegaDestino = this.datosCabeceraTransferencia.idBodegaDestino.id;
        crearCabecera$ = this._transferenciaCabeceraRestService.guardarCabecera(cabeceraMovimiento);
        break;
      case 'Ajustes':
        cabeceraMovimiento.idOperarioOVendedor = 1;
        cabeceraMovimiento.datosCabecera = this.datosCabeceraAjustes;
        crearCabecera$ = this._ingresoEgresoCabeceraRestService.guardarCabecera(cabeceraMovimiento);
        break;
      default:
        console.error({
          error: 400,
          mensaje: 'No existe ese tipo de movimiento'
        });
    }

    this._cargandoService.habilitarCargando();
    crearCabecera$
      .subscribe(
        (respuesta) => {
          if (this.datosCabeceraAjustes) {
            const url = RUTAS_PEDIDOS.rutaDetalleIngresoEgreso(
              true,
              false,
              [this.idEmpresa, respuesta.id]
            );
            this._router.navigate(url);
          }
          if (this.datosCabeceraCompra) {
            const url = RUTAS_PEDIDOS.rutaDetalleCompra(
              true,
              false,
              [this.idEmpresa, respuesta.id]
            );
            this._router.navigate(url);
          }
          if (this.datosCabeceraTransferencia) {
            const url = RUTAS_PEDIDOS.rutaDetalleTransferencia(
              true,
              false,
              [this.idEmpresa, respuesta.id]
            );
            this._router.navigate(url);
          }
          this._cargandoService.deshabilitarCargando();
        },
        (error) => {
          console.error({
            error: error,
            mensaje: 'Error creando cabeceras movimiento'
          });
          this._cargandoService.deshabilitarCargando();
        }
      );
  }

  guardarDetalle(respuestaCabecera: any) {
    const detalleMovimiento: MovimientoDetalleInterface = {
      codigo: this.articuloAgregado.articuloEmpresa.articulo.codigo,
      cantidad: this.articuloAgregado.cantidad,
      cantidadPromocion: this.articuloAgregado.cantidadPromocion
    };
    let crearDetalle$;
    if (respuestaCabecera.tipoMovimiento === '01' || respuestaCabecera.tipoMovimiento === '05') {
      const articulosEnDetalle: IngresoEgresoDetalleInterface[] = [];
      detalleMovimiento.ingresoEgresoCabecera = respuestaCabecera.id;
      if (detalleMovimiento.cantidad > 0) {
        articulosEnDetalle.unshift(detalleMovimiento);
        crearDetalle$ = this._ingresoEgresoDetalleRestService.guardarDetalle(articulosEnDetalle);
        this._cargandoService.habilitarCargando();
      } else if (detalleMovimiento.cantidad === 0) {
        this._toasterService.pop(
          'error',
          'ERROR',
          'El artículo debe tener una cantidad mayor a 0'
        );
      } else {
        this._toasterService.pop(
          'error',
          'ERROR',
          'No se ha ingresado un artículo'
        );
      }
    }
    if (respuestaCabecera.tipoMovimiento === '10') {
      const articulosEnDetalle: TransferenciaDetalleInterface[] = [];
      detalleMovimiento.transferenciaCabecera = respuestaCabecera.id;
      if (detalleMovimiento.cantidad > 0) {
        articulosEnDetalle.unshift(detalleMovimiento);
        crearDetalle$ = this._transferenciaDetalleRestService.guardarDetalle(articulosEnDetalle);
        this._cargandoService.habilitarCargando();
      } else if (detalleMovimiento.cantidad === 0) {
        this._toasterService.pop(
          'error',
          'ERROR',
          'El artículo debe tener una cantidad mayor a 0'
        );
      } else {
        this._toasterService.pop(
          'error',
          'ERROR',
          'No se ha ingresado un artículo'
        );
      }
    }
    if (respuestaCabecera.tipoMovimiento === '11') {
      const detalleMovimientoCompra: CompraDetalleInterface = {
        codigo: this.articuloAgregado.articuloEmpresa.articulo.codigo,
        cantidad: +this.articuloAgregado.cantidad,
        cantidadPromocion: +this.articuloAgregado.cantidadPromocion,
        valorUnitario: +this.articuloAgregado.valorUnitario,
        descuentos: []
      };
      if (this.esPedido) {
        const articulosEnDetalle: PedidoCompraDetalleInterface[] = [];
        detalleMovimiento.compraCabecera = respuestaCabecera.id;
        if (detalleMovimiento.cantidad > 0) {
          articulosEnDetalle.unshift(detalleMovimiento);
          crearDetalle$ = this._compraDetalleRestService.guardarDetallePedido(articulosEnDetalle);
          this._cargandoService.habilitarCargando();
        } else if (detalleMovimiento.cantidad === 0) {
          this._toasterService.pop(
            'error',
            'ERROR',
            'El artículo debe tener una cantidad mayor a 0'
          );
        } else {
          this._toasterService.pop(
            'error',
            'ERROR',
            'No se ha ingresado un artículo'
          );
        }
      }
      if (!this.esPedido) {
        const articulosEnDetalle: CompraDetalleInterface[] = [];
        let descuento: DescuentosCompraDetalleInterface;
        detalleMovimientoCompra.compraCabecera = respuestaCabecera.id;
        console.log('Detalle a guardar?', detalleMovimientoCompra);
        descuento = this.setearDescuentosCompra(this.articuloAgregado);
        console.log('Descuento?', descuento);
        if (detalleMovimientoCompra.cantidad > 0 && detalleMovimientoCompra.valorUnitario > 0) {
          if (descuento.valor > 0 || descuento.porcentaje > 0) {
            detalleMovimientoCompra.descuentos.unshift(descuento);
          }
          articulosEnDetalle.unshift(detalleMovimientoCompra);
          crearDetalle$ = this._compraDetalleRestService.guardarDetalleCompra(articulosEnDetalle);
          this._cargandoService.habilitarCargando();
        } else if (detalleMovimientoCompra.cantidad === 0) {
          this._toasterService.pop(
            'error',
            'ERROR',
            'El artículo debe tener una cantidad mayor a 0'
          );
        } else if (detalleMovimientoCompra.valorUnitario === 0) {
          this._toasterService.pop(
            'error',
            'ERROR',
            'El valor unitario debe tener un valor mayor a 0'
          );
        } else {
          this._toasterService.pop(
            'error',
            'ERROR',
            'No se ha ingresado un artículo'
          );
        }
      }
    }

    crearDetalle$.subscribe(
      (respuesta) => {
        this.detalleCreado = true;
        this.pedidoGuardado = false;
        this._toasterService.pop(
          'success',
          'EXITO',
          'El artículo se ha añadido al detalle correctamente'
        );
        // const url = RUTAS_PEDIDOS.rutaCrearPedido(false, true).ruta;
        /* this._router.navigate(this.ruta, {
          queryParams: {
            cabecera: respuesta.id
          }
        });*/
        if (respuesta[0].tipoMovimiento === '01' || respuesta[0].tipoMovimiento === '05') {
          this.obtenerDetallesIngresEgresoPorCabecera(respuestaCabecera.id).subscribe((cabecera) => {
            cabecera[0].forEach((detalleEnCabecera) => {
              this.arregloArticulosDetalle = detalleEnCabecera.ingresoEgresoDetalles;
            });
          });
          this.crearDetalle = false;
        }
        if (respuesta[0].tipoMovimiento === '10') {
          this.obtenerDetallesTransferenciaPorCabecera(respuestaCabecera.id).subscribe((cabecera) => {
            cabecera[0].forEach((detalleEnCabecera) => {
              this.arregloArticulosDetalle = detalleEnCabecera.transferenciaDetalles;
            });
          });
          this.crearDetalle = false;
        }
        if (respuesta[0].tipoMovimiento === '11') {
          this.obtenerDetallesComprasPorCabecera(respuestaCabecera.id).subscribe((cabecera) => {
            cabecera[0].forEach((detalleEnCabecera) => {
              this.arregloArticulosDetalle = detalleEnCabecera.compraDetalles;
              console.log('compra detalles', this.arregloArticulosDetalle);
            });
          });
          this.crearDetalle = false;
        }
        console.log('Arreglo de detalles?', this.arregloArticulosDetalle);
        console.log('Respuesta detalle', respuesta);
        this._cargandoService.deshabilitarCargando();
      },
      (error) => {
        console.error({
          error: error,
          mensaje: 'Error creando detalle de movimiento'
        });
        this._cargandoService.deshabilitarCargando();
      });
  }

  guardarPedido(pedido: any) {
    let pedido$;
    if (pedido.tipoMovimiento === '01' || pedido.tipoMovimiento === '05') {
      pedido$ = this._ingresoEgresoDetalleRestService.guardarPedido(pedido.id);
    }
    if (pedido.tipoMovimiento === '10') {
      pedido$ = this._transferenciaDetalleRestService.guardarPedido(pedido.id);
    }
    if (pedido.tipoMovimiento === '11') {
      pedido$ = this._compraDetalleRestService.guardarPedido(pedido.id);
    }
    this._cargandoService.habilitarCargando();
    pedido$.subscribe(
      (respuesta) => {
        this.pedidoGuardado = true;
        this._toasterService.pop(
          'success',
          'EXITO',
          'El pedido se ha guardado exitosamente'
        );
        this._cargandoService.deshabilitarCargando();
      }, error => {
        console.error({
          error: error,
          mensaje: 'Error guardando el pedido'
        });
        this._cargandoService.deshabilitarCargando();
      });
  }

  recibirArticulos(articulo) {
    console.log('articulos recibidos?', articulo);
    this.crearDetalle = true;
    this.detalleCreado = false;
    return this.articuloAgregado = articulo;
  }

  verificarArticuloDetalle(arregloDetalle: string[], articulo: PedidoDetalleInterface) {
    return arregloDetalle.some(codigoArticulo => codigoArticulo === articulo.codigo);
  }

  recibirArregloArticulos(arregloArticulos) {
    const arregloCodigosDetalle = this.arregloArticulosDetalle.map(codigoArticulo => codigoArticulo.codigo);
    if (arregloArticulos.length === 0) {
      this.crearDetalle = false;
      this.detalleCreado = false;
    } else {
      if (this.verificarArticuloDetalle(arregloCodigosDetalle, arregloArticulos.slice(0, 1)[0])) {
        this.crearDetalle = false;
        this.detalleCreado = true;
      } else {
        this.crearDetalle = true;
        this.detalleCreado = false;
      }
    }
  }

  setearDescuentosCompra(articulo: PedidoDetalleInterface) {
    const descuento: DescuentosCompraDetalleInterface = {};
    if (articulo.descuento > 0 || articulo.descuentoPorcentual > 0) {
      descuento.base = articulo.subtotal;
      descuento.razon = 'Descuento compra a proveedores';
      descuento.orden = 1;
      descuento.porcentaje = articulo.descuentoPorcentual;
      descuento.valor = articulo.descuento;
    }
    return descuento;
  }

  obtenerDetallesIngresEgresoPorCabecera(id: number) {
    return this._ingresoEgresoCabeceraRestService
      .findAll(`criterioBusqueda={
        "where": {
          "id": ${id}
        },
        "relations": [
          "ingresoEgresoDetalles"
        ]
      }`);
  }

  obtenerDetallesTransferenciaPorCabecera(id: number) {
    return this._transferenciaCabeceraRestService
      .findAll(`criterioBusqueda={
        "where": {
          "id": ${id}
        },
        "relations": [
          "transferenciaDetalles"
        ]
      }`);
  }

  obtenerDetallesComprasPorCabecera(id: number) {
    return this._compraCabeceraRestService
      .findAll(`criterioBusqueda={
        "where": {
          "id": ${id}
        },
        "relations": [
          "compraDetalles"
        ]
      }`);
  }
}
