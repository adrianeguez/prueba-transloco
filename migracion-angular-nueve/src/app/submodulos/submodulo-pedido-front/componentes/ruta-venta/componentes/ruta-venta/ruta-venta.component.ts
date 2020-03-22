import {Component, OnInit, ViewChild} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ArticuloRestSqljsService} from '../../../../servicios/rest/articulo/articulo-rest-sqljs.service';
import {ArticuloPorEmpresaRestSqljsService} from '../../../../servicios/rest/articulo-por-empresa/articulo-por-empresa-rest-sqljs.service';
import {TarifaImpuestoRestSqljsService} from '../../../../servicios/rest/tarifa-impuesto/tarifa-impuesto-rest-sqljs.service';
import {PrecioRestSqljsService} from '../../../../servicios/rest/precio/precio-rest-sqljs.service';
import {HistorialImpuestoRestSqljsService} from '../../../../servicios/rest/historial-impuesto/historial-impuesto-rest-sqljs.service';
import {MovimientoInterface} from '../../../../interfaces/movimiento.interface';
import {InformacionTributariaInterface} from '../../../../../submodulo-empresa-front/interfaces/informacion-tributaria.interface';
import {BodegaInterface} from '../../../../../submodulo-empresa-front/interfaces/bodega.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {InformacionTributariaRestService} from '../../../../../submodulo-empresa-front/servicios/rest/informacion-tributaria-rest.service';
import {DatosClientesInterface} from '../../../clientes/clientes/clientes.component';
// tslint:disable-next-line:max-line-length
import {ModalIngresarCabeceraMovimientoClientesComponent} from '../../../modales/modal-ingresar-cabecera-movimiento-clientes/modal-ingresar-cabecera-movimiento-clientes/modal-ingresar-cabecera-movimiento-clientes.component';
import {MatDialog} from '@angular/material/dialog';
import {MovimientoCabeceraInterface} from '../../../../interfaces/movimientos/pedido-compra-interface';
import {Auth0Service} from '../../../../../submodulo-front-comun/servicios/auth0/auth0.service';
import {VentaCabeceraRestSqljsService} from '../../../../servicios/rest/venta-cabecera/venta-cabecera-rest-sqljs.service';
import {
  COLUMNAS_FACTURA_VENTA
} from '../../../../constantes/columnas-tablas';
import {TarifaImpuestoEntityInterface} from '../../../../servicios/rest/tarifa-impuesto/interfaces/tarifa-impuesto-entity.interface';
import {VentaDetalleRestSqljsService} from '../../../../servicios/rest/venta-detalle/venta-detalle-rest-sqljs.service';
import {DescuentoVentaRestSqljsService} from '../../../../servicios/rest/descuento-venta/descuento-venta-rest-sqljs.service';
import {CargarVentasService} from '../../../../servicios/cargar-ventas.service';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {PuntoEmisionOperarioRestService} from '../../../../servicios/rest/punto-emision-operario-rest.service';
import {VentaCabeceraEntityInterface} from '../../../../servicios/rest/venta-cabecera/interfaces/venta-cabecera-entity.interface';
import {VentaDetalleEntityInterface} from '../../../../servicios/rest/venta-detalle/interfaces/venta-detalle-entity.interface';
import {DescuentoVentaEntityInterface} from '../../../../servicios/rest/descuento-venta/interfaces/descuento-venta-entity.interface';
import {CargarArticulosPreciosImpuestosService} from '../../../../servicios/cargar-articulos-precios-impuestos.service';
import {EmpresaRestSqljsService} from '../../../../servicios/rest/empresa/empresa-rest-sqljs.service';
import {RUTAS_CAJAS} from '../../../../modulos/cajas/rutas/definicion-rutas/rutas-cajas';
import {map} from 'rxjs/operators';
import {RUTAS_PEDIDOS} from '../../../../modulos/pedidos/rutas/definicion-rutas/rutas-pedidos';
import {PedidoDetalleInterface} from '../../../../interfaces/pedido-detalle.interface';
import {ArticuloEntityInterface} from '../../../../servicios/rest/articulo/interfaces/articulo-entity.interface';

@Component({
  selector: 'app-ruta-venta',
  templateUrl: './ruta-venta.component.html',
  styleUrls: ['./ruta-venta.component.scss']
})
export class RutaVentaComponent extends RutaConMigasDePan implements OnInit {
  seCargaronDatos: boolean;

  cierreForzado: boolean;

  cabecera: {
    movimiento?: MovimientoInterface | any,
    informacionTributaria?: InformacionTributariaInterface | any,
    bodega?: BodegaInterface | any,
  };

  queryParams: QueryParamsMovimientoVenta = {
    idCabeceraCreada: undefined,
  };

  datosCabeceraCliente: DatosClientesInterface = {};

  crearDatosCabecera: boolean;

  facturaDevolucionClientes = COLUMNAS_FACTURA_VENTA;

  crearDetalle: boolean;

  arregloArticulosDetalle: PedidoDetalleInterface[] = [];

  subtotalNeto = 0;

  totalAPagar = 0;

  totalImpuestoFactura: ImpuestoDetalleArticuloInterface[] = [];

  idOperario: number;

  bodega: BodegaInterface;

  cabeceraCreada: VentaCabeceraEntityInterface;

  subtotales: Array< { etiqueta?: string, valor?: number}> = [];

  mostrarTablaDetalle: boolean;

  mostrarBotonCrearCabecera: boolean;

  idVenta: number;

  tieneCajaActiva: boolean;

  seSeleccionoEmpresa: boolean;
  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    public matDialog: MatDialog,
    private _articuloEmpresaRestSqljsService: ArticuloPorEmpresaRestSqljsService,
    private _articuloRestSqljsService: ArticuloRestSqljsService,
    private _tarifaImpuestoRestSqljsService: TarifaImpuestoRestSqljsService,
    private _precioRestSqljsService: PrecioRestSqljsService,
    private _historialRestSqljsService: HistorialImpuestoRestSqljsService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _cargandoService: CargandoService,
    private _toasterService: ToasterService,
    private readonly _informacionTributariaRestService: InformacionTributariaRestService,
    private readonly _auth0Service: Auth0Service,
    private readonly _ventaCabeceraRestSqljsService: VentaCabeceraRestSqljsService,
    private readonly _ventaDetalleRestSqljsService: VentaDetalleRestSqljsService,
    private readonly _descuentoVentaRestSqljsService: DescuentoVentaRestSqljsService,
    private readonly _cargarVentasService: CargarVentasService,
    protected readonly _puntoEmisionOperarioRestService: PuntoEmisionOperarioRestService,
    private readonly _cargarArticulosPreciosImpuestosService: CargarArticulosPreciosImpuestosService,
    private readonly _empresaRestSqljsService: EmpresaRestSqljsService,

  ) {
    super(_emitirMigaPanService);
    this.cabecera = {};
    this.cabecera.movimiento = {
      codigo: '22',
      nombre: 'Venta',
      tipoMovimiento: {
        nombre: 'Clientes'
      }
    };
  }

  async ngOnInit() {
    this._activatedRoute.params
      .subscribe(params => {
        this.idVenta = +params.idVenta;
        this._cargandoService.habilitarCargando();
        this._puntoEmisionOperarioRestService.tengoCajaActiva()
          .subscribe( respuesta => {
            this.idOperario = respuesta.operario.id;
            this.bodega = respuesta.puntoEmision.bodega;
            if ( !respuesta) {
              this._toasterService.pop('warning', 'Adevertencia', 'no hay caja activa');
              this.tieneCajaActiva = false;
            } else {
              this.tieneCajaActiva = true;
            }
          }, e => {
            this.tieneCajaActiva = false;
            this._toasterService.pop('warning', 'Adevertencia', 'no hay caja activa');
            console.error(e);
          });
        this.cierreForzado = JSON.parse(localStorage.getItem('cierreForzado'));
        let rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[];
        if (!this.idVenta) {
          rutas = [
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_PEDIDOS.rutaVentas(false, true),
          ];
        } else {
          rutas = [
            RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
            RUTAS_CAJAS.rutaMiCaja(false, true, []),
            RUTAS_CAJAS.rutaGestionVentas(false, true, []),
            RUTAS_CAJAS.rutaRegistroVenta(false, true, [this.idVenta]),
          ];
        }
        this.establecerMigas(rutas);
        this._cargarArticulosPreciosImpuestosService.cargarArticulosPreciosImpuestos().then( async() => {
          try {
            this.seSeleccionoEmpresa = true;
            this.escucharCambiosQueryParams();
            const seCargaronEmpresas = (await this._empresaRestSqljsService.getAll())[1] > 0;
            const seCargaronArticulos = (await this._articuloRestSqljsService.getAll())[1] > 0;
            const seCargaronArticulosPorEmpresa = (await this._articuloEmpresaRestSqljsService.getAll())[1] > 0;
            const seCargaronPrecios = (await this._precioRestSqljsService.getAll())[1] > 0;
            const seCargaronTarifaImpuesto = (await this._tarifaImpuestoRestSqljsService.getAll())[1] > 0;
            const seCargaronHistorialImpuesto = (await this._historialRestSqljsService.getAll())[1] > 0;
            // tslint:disable-next-line:max-line-length
            this.seCargaronDatos = seCargaronEmpresas && seCargaronArticulos && seCargaronArticulosPorEmpresa && seCargaronPrecios && seCargaronTarifaImpuesto && seCargaronHistorialImpuesto;
          } catch (e) {
            this._cargandoService.deshabilitarCargando();
            this.seSeleccionoEmpresa = false;
            console.error(e);
          }
        })
          .catch( (error) => {
            if (error.noSeSeleccionoEmpresa) {
              this._toasterService.pop('error', 'Error' , 'No se ha seleccionado la empresa');
            }
            console.error(error);
          });
      });
  }

  escucharCambiosQueryParams() {
    this._activatedRoute
      .queryParams
      .pipe(map( (queryParams: QueryParamsMovimientoVenta) => {
        return queryParams;
      }))
      .subscribe(
        (queryParams: QueryParamsMovimientoVenta) => {
          this._activatedRoute
            .params
            .subscribe(params => {
              this.queryParams = {
                ...queryParams
              };
              this.idVenta = +params.idVenta;
              if ( this.idVenta) {
                this.cargarVentaCabecera(
                  this.idVenta
                );
              } else {
                if (this.queryParams.idCabeceraCreada) {
                  this.cargarVentaCabecera(
                    this.queryParams.idCabeceraCreada
                  );
                }
              }
              this.crearDatosCabecera = !!(this.cabecera.informacionTributaria);
            });
        }
      );
  }

  seleccionoInformacionTributaria(informacionTributaria: InformacionTributariaInterface) {
    this.cabecera.informacionTributaria = informacionTributaria;
    this.mostrarBotonCrearCabecera = true;
  }

  abrirModalIngresarCabeceraMovimientoClientes() {
    const dialogRef = this.matDialog.open(ModalIngresarCabeceraMovimientoClientesComponent, {
      width: '600px',
      data: {
        datosCliente: this.datosCabeceraCliente
      }
    });
    const resultadoModal$ = dialogRef.afterClosed();

    resultadoModal$.subscribe((datosCliente: DatosClientesInterface) => {
        if (datosCliente) {
          this.datosCabeceraCliente = datosCliente;
        }
      },
      e => {
        console.error(e);
      });
  }

  private async cargarVentaCabecera(idCabeceraCreada) {
    try {
      const cabeceraEncontrada = await this._ventaCabeceraRestSqljsService.repository().findOne(idCabeceraCreada, {
        relations:
          [ 'ventasDetalle', 'ventasDetalle.descuentos']
      });
      if (cabeceraEncontrada) {
        this.cabeceraCreada = cabeceraEncontrada;
        this.datosCabeceraCliente.observacion = cabeceraEncontrada.observacion;
        this.datosCabeceraCliente.comentario = cabeceraEncontrada.comentario;
        this.arregloArticulosDetalle = await this.setearDetallesACargar(this.cabeceraCreada.ventasDetalle);
        this.subtotalNeto = this.calcularSubtotalNeto();
        this.calcularImpuestos();
        this.totalAPagar = this.calcularTotalAPagar();
        this.seteaArregloSubtotales();
        this.mostrarTablaDetalle = true;
        this.crearDetalle = this.verificarDetallesCorrectos(this.arregloArticulosDetalle) && this.arregloArticulosDetalle.length > 0;
        if (this.cabeceraCreada.idClienteProveedor) {
          this._informacionTributariaRestService.findOne(this.cabeceraCreada.idClienteProveedor)
            .subscribe( respuesta => {
              this.cabecera.informacionTributaria = respuesta;
            }, error => {
              console.error(error);
              this._toasterService.pop('error', 'Error', 'Error al cargar informacion tributaria');
            });
        } else {
          this.cabecera.informacionTributaria.razonSocial = cabeceraEncontrada.nombre;
          this.cabecera.informacionTributaria.documento = cabeceraEncontrada.documento;
          this.cabecera.informacionTributaria.direccion = cabeceraEncontrada.direccion;
          this.cabecera.informacionTributaria.telefono = cabeceraEncontrada.telefono;
        }
      } else {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop('warning', 'Advertencia', 'Venta no encontrada');
      }
    } catch (e) {
      console.error(e);
    }
  }

  verificarDetallesCorrectos(detalles) {
    return detalles.every( detalle => {
      const seIngresoCantidad =  detalle.cantidad && +detalle.cantidad !== 0;
      const seIngresoValorUnitario =
        detalle.valorUnitario && detalle.valorUnitario.valorUnitario && detalle.valorUnitario.valorUnitario !== 0;
      return seIngresoCantidad && seIngresoValorUnitario;
    });
  }

  async recibirArticulo (detalles) {
    this.crearDetalle = this.verificarDetallesCorrectos(detalles) && detalles && detalles.length > 0;
    if (this.verificarDetallesCorrectos(detalles)) {
      try {
        const detallesCreado = await this._ventaDetalleRestSqljsService.guardarDetalleDescuentos(this.cabeceraCreada.id, detalles);
        this.arregloArticulosDetalle = await this.setearDetallesACargar(detallesCreado);
        this.subtotalNeto = this.calcularSubtotalNeto();
        this.calcularImpuestos();
        this.totalAPagar = this.calcularTotalAPagar();
        this.seteaArregloSubtotales();
      } catch (e) {
        console.error({
          error: e,
          mensaje: 'Error guardando detalle de la venta'
        });
      }
    }
  }

  seteaArregloSubtotales() {
    this.subtotales = [];
    this.subtotales.unshift({etiqueta: 'Subtotal Neto', valor: this.subtotalNeto});
    this.totalImpuestoFactura.forEach( (impuesto: ImpuestoDetalleArticuloInterface) => {
      const subtotal = {
        etiqueta: impuesto.nombreImpuesto + ' - ' + (impuesto.tarifa * 100) + ' %',
        valor: impuesto.valor
      };
      this.subtotales.push(subtotal);
    });
    this.subtotales.push({etiqueta: 'Total a pagar', valor: this.totalAPagar});
  }

  calcularSubtotalNeto() {
    return this.arregloArticulosDetalle.reduce( (acumulador, detalle) => {
      const resultado = acumulador + detalle.subtotal;
      return resultado;
    }, 0);
  }

  calcularTotalAPagar() {
    const totalImpuestos = this.totalImpuestoFactura.reduce( (acumulador, impuesto) => {
      const resultado = acumulador + impuesto.valor;
      return resultado;
    }, 0);
    return this.subtotalNeto + totalImpuestos;
  }

  async guardarCabeceraYDetalleVenta() {
    this._cargandoService.habilitarCargando();
    try {
      const cabeceraACrear = this.setearCabeceraAcrear();
      cabeceraACrear.estadoVenta = 'cerrado';
      this.cabeceraCreada = await this._ventaCabeceraRestSqljsService.guardarCabecera(cabeceraACrear);
      this.calcularImpuestos();
      this.encerarValores();
      const url = this.idVenta ? RUTAS_CAJAS.rutaGestionVentas(false, true).ruta :
        RUTAS_PEDIDOS.rutaVentas(false, true).ruta;
      this._router.navigate(url, {
        queryParams: {}
      });
      this.mostrarTablaDetalle = false;
      this._cargandoService.deshabilitarCargando();
    } catch (e) {
      console.error({
        error: e,
        mensaje: 'Error creando cabeceras movimiento'
      });
      this._cargandoService.deshabilitarCargando();
    }
  }

  encerarValores() {
    this.cabecera.informacionTributaria = null;
    this.datosCabeceraCliente = null;
    this.subtotalNeto = 0;
    this.totalAPagar = 0;
    this.arregloArticulosDetalle = [];
    this.totalImpuestoFactura = [];
    this.subtotales = [];
  }

  calcularImpuestos() {
    const impuestosTarifa = [];
    this.arregloArticulosDetalle.forEach(detalle => {
      const tarifasImpuestos = (detalle.articuloEmpresa.articulo as any).tarifaImpuesto as TarifaImpuestoEntityInterface[];
      tarifasImpuestos.forEach( tarifaImpuesto => {
        const historialImpuestosActivos = tarifaImpuesto.historialImpuesto.filter( (historialImpuestoRegistro) => {
          return historialImpuestoRegistro.habilitado;
        });
        historialImpuestosActivos.forEach(historialImpuesto => {
          const impuestoActivo: ImpuestoDetalleArticuloInterface = {
            codigo: historialImpuesto.codigoSriImpuesto,
            codigoPorcentaje: historialImpuesto.codigoSriTarifa,
            porcentaje: historialImpuesto.valorPorcentaje,
            baseImponible: detalle.subtotal,
            valor: detalle.subtotal * historialImpuesto.valorPorcentaje,
            nombreImpuesto: historialImpuesto.nombreImpuesto,
            nombreTarifa: historialImpuesto.nombreTarifa,
          };
          impuestosTarifa.push(impuestoActivo);
        });
      });
    });
    const arregloCodigosImpueto = this.eliminarElementosRepetidosArray(
      impuestosTarifa.map( impuesto => {
        return impuesto.codigoPorcentaje;
      })
    );
    const arregloImpuestosPorTarifa = arregloCodigosImpueto.map( codigoTarifa => {
      const arregloImpuestos = impuestosTarifa.filter( impuestoTarifa => {
        return impuestoTarifa.codigoPorcentaje === codigoTarifa;
      });
      return  arregloImpuestos;
    });
    this.totalImpuestoFactura = arregloImpuestosPorTarifa.map( impuestoTarifa => {
      const totalImpuesto = {
        codigo: impuestoTarifa[0].codigo,
        codigoPorcentaje: impuestoTarifa[0].codigoPorcentaje,
        tarifa: impuestoTarifa[0].porcentaje,
        baseImponible: this.sumarTotalImpuestos(impuestoTarifa, 'baseImponible'),
        valor: this.sumarTotalImpuestos(impuestoTarifa, 'valor'),
        nombreImpuesto: impuestoTarifa[0].nombreImpuesto,
        nombreTarifa: impuestoTarifa[0].nombreTarifa,
      };
      return totalImpuesto;
    });
  }

  sumarTotalImpuestos(impuestos: ImpuestoDetalleArticuloInterface[], campo) {
    return impuestos.reduce( (acumulador, impuesto) => {
      const resultado = acumulador + impuesto[campo];
      return resultado;
    }, 0);
  }

  eliminarElementosRepetidosArray(arreglo: any[]) {
    const hash = {};
    return arreglo.filter((elemento: any) => {
      const exists = !hash[elemento] || false;
      hash[elemento] = true;
      return exists;
    });
  }

  async crearCabecera() {
    this._cargandoService.habilitarCargando();
    try {
      const cabeceraACrear = this.setearCabeceraAcrear();
      cabeceraACrear.estadoVenta = 'abierto';
      this.cabeceraCreada = await this._ventaCabeceraRestSqljsService.guardarCabecera(cabeceraACrear);
      if (this.cabeceraCreada) {
        if (!this.idVenta) {
          const url = this.idVenta ? RUTAS_CAJAS.rutaRegistroVenta(false, true).ruta :
            RUTAS_PEDIDOS.rutaVentas(false, true).ruta;
          this._router.navigate(url, {
            queryParams: {
              ...this.queryParams,
              idCabeceraCreada: this.cabeceraCreada.id
            }
          });
        }
      }
      this.mostrarBotonCrearCabecera = false;
      this._cargandoService.deshabilitarCargando();
      this.mostrarTablaDetalle = !!this.cabeceraCreada;
    } catch (e) {
      console.error({
        error: e,
        mensaje: 'Error creando cabeceras movimiento'
      });
      this._cargandoService.deshabilitarCargando();
      this.mostrarTablaDetalle = false;
    }
  }

  async setearDetalleCompra(detalleVentaGuardado: VentaDetalleEntityInterface) {
    try {
      const articuloEmpresaEncontrado = await this.setearArticuloEmpresa(detalleVentaGuardado.idArticuloEmpresa);
      const articuloEncontrado = articuloEmpresaEncontrado.articulo;
      return {
        articuloEmpresa: articuloEmpresaEncontrado,
        nombreArticulo: (articuloEncontrado as ArticuloEntityInterface).nombre,
        codigo:  (articuloEncontrado as ArticuloEntityInterface).codigo,
        cantidad: detalleVentaGuardado.cantidad,
        cantidadDadaBaja: detalleVentaGuardado.cantidadDadaBaja,
        cantidadEntregada: detalleVentaGuardado.cantidadEntregada,
        cantidadPedida: detalleVentaGuardado.cantidadPedida,
        cantidadPendiente: detalleVentaGuardado.cantidadPendiente,
        descuento: detalleVentaGuardado.descuento,
        descuentoPorcentual: detalleVentaGuardado.descuentoPorcentual,
        descuentoPromocion: detalleVentaGuardado.descuentoPromocion,
        descuentoValor: detalleVentaGuardado.descuentoValor,
        descuentos: detalleVentaGuardado.descuentos ? this.setearDescuentosDetalleComopra(detalleVentaGuardado.descuentos) : [],
        descuentosPorcentuales: detalleVentaGuardado.descuentosPorcentuales,
        formaCalculo: {formaCalculo: 'Valor unitario'},
        cantidadPromocion: detalleVentaGuardado.cantidadPromocion,
        subtotal: detalleVentaGuardado.subtotal,
        totalBruto: detalleVentaGuardado.totalBruto,
        totalDescuentos: detalleVentaGuardado.totalDescuentos,
        valorUnitario: {valorUnitario: detalleVentaGuardado.valorUnitario},
        id: detalleVentaGuardado.id,
      };
    } catch (e) {
      console.error(e);
    }
  }

  async setearDetallesACargar(detallesCreado: VentaDetalleEntityInterface[]) {
    return await Promise.all(
      detallesCreado.map(async detalleCreado => {
        const detalleCompra = await this.setearDetalleCompra(detalleCreado);
        return detalleCompra.articuloEmpresa ? detalleCompra : null;
      })
        .filter(detalleCompra => {
          return detalleCompra;
        })
    );
  }

  setearCabeceraAcrear() {
    const cabeceraMovimiento: MovimientoCabeceraInterface = {
      idOperarioOVendedor: this.idOperario,
      idMovimiento: this.cabecera.movimiento.id,
      idBodegaOrigen: this.bodega.id,
      idClienteOProveedor: this.cabecera.informacionTributaria.id,
      tipoMovimiento: this.cabecera.movimiento.codigo,
      datosCabecera: this.datosCabeceraCliente,
      informacionTributaria: this.cabecera.informacionTributaria,
      estadoVenta: 'abierto',
    };
    if (this.cabeceraCreada) {
      cabeceraMovimiento.id = this.cabeceraCreada.id;
    }
    return cabeceraMovimiento;
  }

  async setearArticuloEmpresa(idArticuloEmpresa: number) {
    try {
      const consulta = {
        relations: ['empresa', 'articulo', 'articulo.tarifaImpuesto', 'articulo.tarifaImpuesto.historialImpuesto', 'precios']
      };
      const articuloEmpresaEncontrado = await this._articuloEmpresaRestSqljsService.repository().findOne(idArticuloEmpresa, consulta );
        const valoresUnitarios = articuloEmpresaEncontrado.precios.map( precio => {
          return { valorUnitario: precio.valor};
        });
      articuloEmpresaEncontrado.valoresUnitarios = valoresUnitarios;
      return articuloEmpresaEncontrado;
    } catch (e) {
      console.error(e);
    }
  }

  setearDescuentosDetalleComopra(descuentosGuardados: DescuentoVentaEntityInterface[]) {
    return descuentosGuardados.map( descuentoGuardado => {
      return {
        orden: descuentoGuardado.orden,
        motivo: descuentoGuardado.razon,
        descuentoPorcentual: descuentoGuardado.porcentaje,
        valor: descuentoGuardado.valor,
        base: descuentoGuardado.base,
        id: descuentoGuardado.id,
      };
    });
  }
}

export interface QueryParamsMovimientoVenta {
  idCabeceraCreada: number;
}

export interface ImpuestoDetalleArticuloInterface {
  codigo?: string;
  codigoPorcentaje?: string;
  porcentaje?: number;
  valor?: number;
  baseImponible?: number;
  nombreImpuesto?: string;
  nombreTarifa?: string;
  tarifa?: number;
}
