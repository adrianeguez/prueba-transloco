import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {PedidoDetalleInterface} from '../../../interfaces/pedido-detalle.interface';
import {FormaCalculoInterface} from '../../../interfaces/forma-calculo.interface';
import {FORMA_CALCULO} from '../../../constantes/forma-calculo';
import {
  MASK_NUMEROS_DECIMALES,
  MASK_NUMERO_PORCENTUAL,
  MASK_NUMEROS_ENTEROS, MASK_DINERO
} from '../../../constantes/mascaras';
import {EmpresaProveedoresInterface} from '../../../../submodulo-empresa-front/interfaces/empresa-proveedores.interface';
import {quitarMascaraNumero} from '../../../funciones/mascaras/quitar-mascara-numero';
import {
  ModalDarBajaCantidadComponent
} from '../../modales/modal-dar-baja-cantidad/modal-dar-baja-cantidad/modal-dar-baja-cantidad.component';
import {
  ModalEntregarCantidadComponent
} from '../../modales/modal-entregar-cantidad/modal-entregar-cantidad/modal-entregar-cantidad.component';
import {ModalDescuentosComponent} from '../../modales/modal-descuentos/modal-descuentos/modal-descuentos.component';
import {DescuentoInterface} from '../../../interfaces/descuento.interface';
import {ArticulosRestService} from '../../../../submodulo-articulos-front/servicios/rest/articulos-rest.service';
import {PreciosInterface} from '../../../../submodulo-articulos-front/interfaces/precios.interface';
import {ModalArticuloEmpresaComponent} from '../../modales/modal-articulo-empresa/modal-articulo-empresa/modal-articulo-empresa.component';
import {ArticuloEmpresaInterface} from '../../../interfaces/articulo-empresa.interface';
import {IngresoEgresoDetalleRestService} from '../../../servicios/rest/ingreso-egreso-detalle/ingreso-egreso-detalle-rest.service';
import {IngresoEgresoDetalleInterface} from '../../../servicios/rest/ingreso-egreso-detalle/interfaces/ingreso-egreso-detalle.interface';
import {ArticuloPorBodegaRestService} from '../../../servicios/rest/articulo-por-bodega/articulo-por-bodega-rest.service';
import {ValorUnitarioInterface} from '../../../interfaces/valor-unitario.interface';
import {TransferenciaDetalleRestService} from '../../../servicios/rest/transferencia-detalle/transferencia-detalle-rest.service';
import {CompraDetalleRestService} from '../../../servicios/rest/compra-detalle/compra-detalle-rest.service';
// tslint:disable-next-line:max-line-length
import {ModalListaDescuentosArticuloComponent} from '../../modales/modal-lista-descuentos-articulo/modal-lista-descuentos-articulo/modal-lista-descuentos-articulo.component';
import {PrecioRestSqljsService} from '../../../servicios/rest/precio/precio-rest-sqljs.service';
import {quitarMascaraPrecio} from '../../../funciones/mascaras/quitar-mascara-precio';
import {VentaDetalleRestSqljsService} from '../../../servicios/rest/venta-detalle/venta-detalle-rest-sqljs.service';
import {VentaDetalleEntity} from '../../../servicios/rest/venta-detalle/venta-detalle-entity';
import {DescuentoVentaRestSqljsService} from '../../../servicios/rest/descuento-venta/descuento-venta-rest-sqljs.service';
import {CargandoService, ModalConfirmacionComponent} from 'man-lab-ng';
import {toastErrorEliminar, toastExitoEliminar} from '../../../../../constantes/mensajes-toaster';
import {ordenarObjeto} from '../../../../submodulo-inventario-front/funciones/ordenar-objeto';
import {EmitirCantidadBodegaArticulo} from '../../stock-articulo/interfaces/emitir-cantidad-bodega-articulo';

@Component({
  selector: 'ml-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent implements OnInit {


  @Input()
  idProveedor: number;


  @Input() proveedorRecibido: EmpresaProveedoresInterface;

  @Input() ingresoEgreso: Array<object>;

  @Input() compraDevolucionProveedores: Array<object>;

  @Input() facturaDevolucionClientes: Array<object>;

  @Input() transferenciaBodegas: Array<object>;

  @Input() pedidoCompra: Array<object>;

  @Input() articulosEnDetalle: Array<any>;

  @Input() esVenta: boolean;

  @Input() pedidoGuardado: boolean;

  @Input() detalleCreado: boolean;

  @Input() idEmpresa: number;

  @Input() idBodega: number;

  @Input() idBodegaDestino: number;

  @Output() enviarTotalBrutoArticulo: EventEmitter<number> = new EventEmitter();

  @Output() enviarArticulos: EventEmitter<object> = new EventEmitter();

  @Output() enviarArregloArticulos: EventEmitter<Array<PedidoDetalleInterface>> = new EventEmitter();

  @Input() valores: Array<PedidoDetalleInterface | any> = [];

  @Input() idCabeceraVenta: number;

  articuloAgregado: PedidoDetalleInterface;

  formasCalculo: FormaCalculoInterface[];

  formaCalculoSeleccionada: FormaCalculoInterface;

  valoresUnitarios: ValorUnitarioInterface[];

  ingresoValoresRequeridos: boolean;

  columnas: Array<object>;

  mascaraPorcentajes = {
    ...MASK_NUMERO_PORCENTUAL,
    allowNegative: false,
  };

  mascaraNumerica = {
    ...MASK_NUMEROS_ENTEROS,
    allowNegative: false,
  };

  mascaraDinero = {
    ...MASK_DINERO,
    allowNegative: false,
  };

  constructor(
    private readonly _articuloService: ArticulosRestService,
    private readonly _ingresoEgresoDetalleRestService: IngresoEgresoDetalleRestService,
    private readonly _transferenciaDetalleRestService: TransferenciaDetalleRestService,
    private readonly _compraDetalleRestService: CompraDetalleRestService,
    private readonly _articuloPorBodega: ArticuloPorBodegaRestService,
    protected _toasterServicePrivate: ToasterService,
    public matDialog: MatDialog,
    private readonly _ventaDetalleRestSqljsService: VentaDetalleRestSqljsService,
    private readonly _descuentoVentaRestSqljsService: DescuentoVentaRestSqljsService,
    private readonly _cargandoService: CargandoService,
  ) {
    this.formasCalculo = FORMA_CALCULO;
    this.valoresUnitarios = [
      {valorUnitario: 5},
      {valorUnitario: 10}
    ];
  }

  ngOnInit() {
    if (this.ingresoEgreso) {
      this.columnas = this.ingresoEgreso;
    }
    if (this.compraDevolucionProveedores) {
      this.columnas = this.compraDevolucionProveedores;
    }
    if (this.facturaDevolucionClientes) {
      this.columnas = this.facturaDevolucionClientes;
    }
    if (this.transferenciaBodegas) {
      this.columnas = this.transferenciaBodegas;
    }
    if (this.pedidoCompra) {
      this.columnas = this.pedidoCompra;
    }
  }

  abrirModalArticulo() {
    const ventanaModal = this.matDialog.open(ModalArticuloEmpresaComponent, {
      width: '800px',
      data: {
        idEmpresa: this.idEmpresa,
        idBodega: this.idBodega,
        esVenta: this.esVenta,
        articulosEnTabla: this.valores,
        idBodegaDestino: this.idBodegaDestino,
        idProveedor: this.idProveedor
      }
    });

    const $respuestaModal = ventanaModal.afterClosed();

    $respuestaModal.subscribe(async (articuloSeleccionado: ArticuloEmpresaInterface) => {
      if (articuloSeleccionado) {
        this.articuloAgregado = {
          cantidad: 0,
          valido: false,
          articuloEmpresa: articuloSeleccionado,
          codigo: articuloSeleccionado.articulo.codigo.toString(),
          nombreArticulo: articuloSeleccionado.articulo.nombre,
          cantidadPromocion: 0,
          valorUnitario: 0,
          descuentoPorcentual: 0,
          descuento: 0,
          descuentos: [],
          descuentosPorcentuales: 0,
          totalDescuentos: 0,
          totalBruto: 0,
          descuentoValor: 0,
          descuentoPromocion: 0,
          subtotal: 0,
          formaCalculo: this.elegirFormaCalculo(),
          cantidadPedida: 0,
          cantidadPendiente: 0,
          cantidadDadaBaja: 0,
          cantidadEntregada: 0
        };
        if (this.ingresoEgreso || this.transferenciaBodegas) {
          this.setearPrecios(this.articuloAgregado);
        }
        const nuevoArticuloDetalle = [...this.valores];
        nuevoArticuloDetalle.unshift(this.articuloAgregado);
        this.valores = nuevoArticuloDetalle;
        if (this.esVenta && this.idCabeceraVenta) {
          const detalleACrear = {
            ventaCabecera: this.idCabeceraVenta,
            idArticuloEmpresa: articuloSeleccionado.id
          };
          try {
            const detalleCreado = await this._ventaDetalleRestSqljsService.repository().save(detalleACrear);
            if (detalleCreado && detalleCreado.id) {
              this.articuloAgregado.id = detalleCreado.id;
            }
          } catch (e) {
            console.error(e);
          }
        }
        this.enviarArregloArticulos.emit(this.valores);
        this.enviarArticulos.emit(this.articuloAgregado);
      }
    }, error => {
      console.error('Error', error);
    });
  }

  abrirModalCantidadDarBaja(articulo: PedidoDetalleInterface) {
    const ventanaModal = this.matDialog.open(ModalDarBajaCantidadComponent, {
      width: '400px',
      data: {
        cantidadADarDeBaja: articulo.cantidadPendiente,
      },
    });
    const resultadoModal$ = ventanaModal.componentInstance.enviarCantidadIngresada;
    resultadoModal$.subscribe((valorIngresado: number) => {
      articulo.cantidadDadaBaja = valorIngresado;
      this.calcularCantidades(articulo);
    }, error => {
      console.error(error);
    });
  }

  abrirModalCantidadEntregada(articulo: PedidoDetalleInterface) {
    const ventanaModal = this.matDialog.open(ModalEntregarCantidadComponent, {
      width: '400px',
      data: {
        cantidadAEntregar: articulo.cantidadPendiente
      }
    });
    const resultadoModal$ = ventanaModal.componentInstance.enviarCantidadIngresada;
    resultadoModal$.subscribe((valorIngresado: number) => {
      articulo.cantidadEntregada = valorIngresado;
      this.calcularCantidades(articulo);
    }, error => {
      console.error(error);
    });
  }

  abrirModalListaDescuentosArticulo(detalleCompra: PedidoDetalleInterface) {
    const indiceRegistro = this.valores.indexOf(detalleCompra);
    const ventanaModal = this.matDialog.open(ModalListaDescuentosArticuloComponent, {
      width: '1200px',
      data: {
        detalleCompra: {...detalleCompra}
      }
    });

    const resultadoModal$ = ventanaModal.afterClosed();
    resultadoModal$.subscribe((descuentosArticulo: DescuentoInterface[]) => {
      if (descuentosArticulo) {
        this.valores[indiceRegistro].descuentos = descuentosArticulo;
        this.calcularValoresVenta(this.valores[indiceRegistro], this.valores[indiceRegistro].descuentos);
        this.enviarArregloArticulos.emit(this.valores);
      }
    });
  }


  buscarPrecioArticulo(codigoArticulo) {
    return this._articuloPorBodega
      .findAll(
        `criterioBusqueda={
          "where": {
            "codigoArticulo": "${codigoArticulo}"
          }
        }`);
  }

  elegirFormaCalculo() {
    if (this.formaCalculoSeleccionada === undefined) {
      return (this.formaCalculoSeleccionada = {
        formaCalculo: 'Valor unitario',
      });
    } else {
      return this.formaCalculoSeleccionada;
    }
  }

  elegirValorUnitario(valorUnitario: ValorUnitarioInterface) {
    if (valorUnitario === undefined) {
      return valorUnitario = {valorUnitario: 0};
    } else {
      return valorUnitario;
    }
  }

  enviarBaseArticulo(arregloDescuentos: Array<DescuentoInterface>) {
    const longitudArreglo = arregloDescuentos.length;
    let base;
    if (longitudArreglo > 0) {
      base = arregloDescuentos[longitudArreglo - 1].base;
      return base;
    } else {
      base = 0;
      return base;
    }
  }

  efectuarCalculos(evento) {
    if (this.compraDevolucionProveedores) {
      const arregloDatos = evento.data;
      if (arregloDatos) {
        arregloDatos
          .forEach(
            (articulo) => {
              const articuloYaCreado = articulo.id;
              if (!articuloYaCreado) {
                articulo = this.calcularArticulosLocales(articulo, evento.field);
              }
            }
          );
      } else {
        console.log('No hay datos que calcular');
      }
    }
    if (this.ingresoEgreso) {
      const arregloDatos = evento.data;
      if (arregloDatos) {
        arregloDatos
          .forEach(
            (articulo) => {
              const articuloYaCreado = articulo.id;
              if (!articuloYaCreado) {
                articulo = this.calcularArticulosLocales(articulo, evento.field);
              }
            }
          );
      } else {
        console.log('No hay datos que calcular');
      }
    }
    if (this.transferenciaBodegas) {
      const arregloDatos = evento.data;
      if (arregloDatos) {
        arregloDatos
          .forEach(
            (articulo) => {
              const articuloYaCreado = articulo.id;
              if (!articuloYaCreado) {
                articulo = this.calcularArticulosLocales(articulo, evento.field);
              }
            }
          );
      } else {
        console.log('No hay datos que calcular');
      }
    }
    if (this.esVenta) {
      evento.data.map((articulo) => {
        this.calcularValoresVenta(articulo, articulo.descuentos);
        this.enviarArregloArticulos.emit(this.valores);
      });
    }
  }

  calcularArticulosLocales(articulo: PedidoDetalleInterface,
                           nombreCampo: 'cantidadPromocion' | 'formaCalculo'
                             | 'valorUnitario' | 'descuentoPorcentual') {

    if (this.compraDevolucionProveedores) {
      articulo.valido = false;
      this.enviarArregloArticulos.emit(this.valores);
      this.enviarArticulos.emit(this.articuloAgregado);
      if (articulo.formaCalculo) {
        // Calculos para compras con valor unitario
        if (articulo.formaCalculo.formaCalculo === 'Valor unitario') {
          const existeCantidadYValorUnitario = articulo.cantidad && articulo.valorUnitario;
          if (existeCantidadYValorUnitario) {
            const tienenValoresMayoresACero = articulo.valorUnitario > 0 && articulo.cantidad > 0;
            if (tienenValoresMayoresACero) {
              if (nombreCampo === 'formaCalculo') {
                articulo.descuentos = [];
                articulo.descuento = 0;
                articulo.descuentoPorcentual = 0;
                articulo.valorUnitario = 0;
                articulo.cantidadPromocion = 0;
              }
              // Calculo subtotal en valor unitario
              const valorUnitario = quitarMascaraPrecio(articulo.valorUnitario);
              articulo.subtotal = +articulo.cantidad * +valorUnitario;
              this.calcularDescuentos(articulo, nombreCampo);
              articulo.valido = true;
              this.enviarArregloArticulos.emit(this.valores);
              this.enviarArticulos.emit(this.articuloAgregado);
            } else {
              articulo.subtotal = 0;
              articulo.valido = false;
            }
          } else {
            articulo.subtotal = 0;
            articulo.valido = false;
          }
        }
        // Calculos para compras con subtotal
        if (articulo.formaCalculo.formaCalculo === 'Subtotal') {
          if (articulo.cantidad && articulo.subtotal) {
            if (articulo.cantidad > 0 && articulo.subtotal > 0) {
              if (nombreCampo === 'formaCalculo') {
                articulo.descuentos = [];
                articulo.descuento = 0;
                articulo.descuentoPorcentual = 0;
                articulo.valorUnitario = 0;
                articulo.cantidadPromocion = 0;
              }
              // Calculo del subtotal
              const subtotal = quitarMascaraPrecio(articulo.subtotal);
              articulo.valorUnitario = (subtotal / +articulo.cantidad);
              articulo.valido = true;
              this.enviarArregloArticulos.emit(this.valores);
              this.enviarArticulos.emit(this.articuloAgregado);
            } else {
              articulo.valorUnitario = 0;
              articulo.descuentos = [];
              articulo.descuento = 0;
              articulo.descuentoPorcentual = 0;
              articulo.cantidadPromocion = 0;
            }
          } else {
            articulo.valorUnitario = 0;
            articulo.descuentos = [];
            articulo.descuento = 0;
            articulo.descuentoPorcentual = 0;
            articulo.cantidadPromocion = 0;
          }
        }
      }
    }
    if (this.ingresoEgreso) {
      articulo.valido = false;
      this.enviarArregloArticulos.emit(this.valores);
      this.enviarArticulos.emit(this.articuloAgregado);
      if (articulo.cantidad) {
        articulo.subtotal = +articulo.cantidad * +articulo.valorUnitario;
        if (articulo.cantidad > 0) {
          articulo.valido = true;
          this.enviarArregloArticulos.emit(this.valores);
          this.enviarArticulos.emit(this.articuloAgregado);
        } else {
          articulo.valido = false;
        }
      }
    }
    if (this.transferenciaBodegas) {
      articulo.valido = false;
      this.enviarArregloArticulos.emit(this.valores);
      this.enviarArticulos.emit(this.articuloAgregado);
      if (articulo.cantidad) {
        articulo.subtotal = +articulo.cantidad * +articulo.valorUnitario;
        if (articulo.cantidad > 0) {
          if (+articulo.cantidadBodegaOrigen && +articulo.cantidadBodegaDestino) {
            const esValido = articulo.cantidad <= articulo.cantidadBodegaOrigen;
            if (esValido) {
              articulo.valido = true;
            } else {
              articulo.valido = false;
              this._toasterServicePrivate.pop(
                'warning',
                'Cuidado',
                'No tiene suficiente cantidad en bodega origen'
              );
            }
            this.enviarArregloArticulos.emit(this.valores);
            this.enviarArticulos.emit(this.articuloAgregado);
          } else {
            articulo.valido = true;
            this.enviarArregloArticulos.emit(this.valores);
            this.enviarArticulos.emit(this.articuloAgregado);
          }
        } else {
          articulo.valido = false;
        }
      }
    }
    return articulo;
  }

  calcularValoresVenta(detalleCompra, descuentosArticulo) {
    const base = (detalleCompra.valorUnitario.valorUnitario * (+detalleCompra.cantidad + +detalleCompra.cantidadPromocion));
    detalleCompra.descuentos = this.calcularValoresDescuento(descuentosArticulo, base);
    detalleCompra.totalDescuentos = this.calcularTotalDescuento(detalleCompra);
    detalleCompra.totalBruto = this.calcularTotalBruto(detalleCompra);
    detalleCompra.descuentoValor = this.calcularTotalValoresDescuento(detalleCompra.descuentos);
    detalleCompra.descuentoPromocion = this.calcularDescuentoPromocion(detalleCompra);
    detalleCompra.subtotal = detalleCompra.totalBruto - detalleCompra.totalDescuentos;
  }

  calcularDescuentoPromocion(detalleCompra: PedidoDetalleInterface) {
    const valorUnitario: ValorUnitarioInterface = detalleCompra.valorUnitario as ValorUnitarioInterface;
    return valorUnitario.valorUnitario * +detalleCompra.cantidadPromocion;
  }

  calcularTotalBruto(detalleCompra: PedidoDetalleInterface) {
    const valorUnitario: ValorUnitarioInterface = detalleCompra.valorUnitario as ValorUnitarioInterface;
    const cantidadTotal = +detalleCompra.cantidad + +detalleCompra.cantidadPromocion;
    return +cantidadTotal * valorUnitario.valorUnitario;
  }

  calcularTotalDescuento(detalleCompra: PedidoDetalleInterface) {
    const cantidadPromocion = this.calcularDescuentoPromocion(detalleCompra);
    const sumaValoresDescuento = this.calcularTotalValoresDescuento(detalleCompra.descuentos);
    return cantidadPromocion + sumaValoresDescuento;
  }

  calcularTotalValoresDescuento(descuentos: DescuentoInterface[]) {
    return descuentos.reduce((acumulador, descuento) => {
      const resultado = acumulador + +descuento.valor;
      return resultado;
    }, 0);
  }

  calcularValoresDescuento(descuentos: DescuentoInterface[], base) {
    const arregloReverse = [...descuentos.reverse()];
    const arregloReverse2 = arregloReverse.map((descuentoArticulo, indice) => {
      const descuentoArticuloAnterior = arregloReverse[indice - 1];
      if (descuentoArticuloAnterior) {
        descuentoArticulo.base = descuentoArticuloAnterior.base - descuentoArticuloAnterior.valor;
      } else {
        descuentoArticulo.base = base;
      }
      descuentoArticulo.valor = ((descuentoArticulo.base) * (descuentoArticulo.descuentoPorcentual / 100));
      return descuentoArticulo;
    });
    return arregloReverse2.reverse();
  }

  darBajaPedido() {
    this.valores.map(articulo => {
      articulo.cantidadDadaBaja =
        +articulo.cantidadPendiente + +articulo.cantidadDadaBaja;
      return this.calcularCantidades(articulo);
    });
  }

  entregarPedido() {
    this.valores.map(articulo => {
      articulo.cantidadEntregada =
        +articulo.cantidadPendiente + +articulo.cantidadEntregada;
      return this.calcularCantidades(articulo);
    });
  }

  calcularCantidades(articulo: PedidoDetalleInterface) {
    articulo.cantidadPedida = +articulo.cantidad + +articulo.cantidadPromocion;
    articulo.cantidadPendiente =
      +articulo.cantidadPedida -
      +articulo.cantidadDadaBaja -
      +articulo.cantidadEntregada;
    return articulo;
  }

  calcularValoresFactura(articulo: PedidoDetalleInterface, valorUnitario: ValorUnitarioInterface) {
    articulo.totalBruto = (+articulo.cantidad + +articulo.cantidadPromocion) * +valorUnitario.valorUnitario;
    // articulo.descuentosPorcentuales = +articulo.descuentosPorcentuales / 100;
    // articulo.descuentos = +articulo.descuentos / 100;
    articulo.descuentoPromocion = +articulo.cantidadPromocion * +valorUnitario.valorUnitario;
    articulo.totalDescuentos = +articulo.totalBruto * (+articulo.descuentosPorcentuales / 100 + +articulo.descuentos);
    articulo.descuentoValor = +articulo.totalBruto * (+articulo.descuentosPorcentuales / 100 + +articulo.descuentos);
    articulo.subtotal = +articulo.totalBruto - +articulo.descuentoValor;
    return articulo;
  }

  encerarValoresArticulo(articulo: PedidoDetalleInterface) {
    articulo.valorUnitario = 0;
    articulo.descuentoPorcentual = 0;
    articulo.descuento = 0;
    articulo.subtotal = 0;
  }

  setearIdArticulos(arregloDetalle, arregloArticulos) {
    arregloDetalle
      .forEach((articuloEnDetalle: IngresoEgresoDetalleInterface) => arregloArticulos
        .forEach((articuloEnTabla: PedidoDetalleInterface) => {
          if (articuloEnTabla.codigo.toString() === articuloEnDetalle.codigo.toString()) {
            articuloEnTabla.id = articuloEnDetalle.id;
          }
        }));
    return arregloArticulos;
  }

  setearCodigosArticulos(detalle) {
    detalle.map(codigoArticulo => codigoArticulo.codigo);
  }

  setearPrecios(articulo: PedidoDetalleInterface) {
    this.buscarPrecioArticulo(articulo.articuloEmpresa.articulo.codigo)
      .subscribe((precioArticulo) => {
        articulo.valorUnitario = precioArticulo[0][0].inventarioFinalCostoUnitario;
      });
    return articulo;
  }

  verificarArticuloDetalle(arregloDetalle: string[], articulo: PedidoDetalleInterface) {
    return arregloDetalle.some(codigoArticulo => codigoArticulo === articulo.codigo);
  }

  eliminarRegistro(articulo, indice) {
    const dialogRef = this.matDialog
      .open(ModalConfirmacionComponent, {
        width: '800px',
        data: {
          mensaje: '¿Está seguro que desea eliminar este registro?',
          titulo: 'Eliminar artículo',
          nombreBotonTrue: 'eliminar',
          nombreBotonFalse: 'cancelar',
        },
      });
    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$
      .subscribe(
        (respuesta: PreciosInterface) => {
          if (respuesta) {
            this.eliminarArticulo(articulo, indice);
          }
        });
  }

  async eliminarArticulo(articulo: PedidoDetalleInterface, indice: number) {
    if (this.compraDevolucionProveedores) {
      const esBackend = articulo.id;
      if (esBackend) {
        this._cargandoService.habilitarCargando();
        this._compraDetalleRestService
          .deleteOne(articulo.id)
          .subscribe(
            () => {
              this._cargandoService.deshabilitarCargando();
              this.valores.splice(indice, 1);
              this.enviarArregloArticulos.emit(this.valores);
              this.enviarArticulos.emit(this.articuloAgregado);
            },
            (error) => {
              console.error({
                error,
                data: articulo,
                mensaje: 'Error eliminando compra detalle',
              });
              this._cargandoService.deshabilitarCargando();
            }
          );
      } else {
        this.valores.splice(indice, 1);
        this.enviarArregloArticulos.emit(this.valores);
        this.enviarArticulos.emit(this.articuloAgregado);
      }
    }
    if (this.ingresoEgreso) {
      const esBackend = articulo.id;
      if (esBackend) {
        this._cargandoService.habilitarCargando();
        this._ingresoEgresoDetalleRestService
          .deleteOne(articulo.id)
          .subscribe(
            () => {
              this._cargandoService.deshabilitarCargando();
              this.valores.splice(indice, 1);
              this.enviarArregloArticulos.emit(this.valores);
              this.enviarArticulos.emit(this.articuloAgregado);
            },
            (error) => {
              console.error({
                error,
                data: articulo,
                mensaje: 'Error eliminando compra detalle',
              });
              this._cargandoService.deshabilitarCargando();
            }
          );
      } else {
        this.valores.splice(indice, 1);
        this.enviarArregloArticulos.emit(this.valores);
        this.enviarArticulos.emit(this.articuloAgregado);
      }
    }
    if (this.transferenciaBodegas) {
      const esBackend = articulo.id;
      if (esBackend) {
        this._cargandoService.habilitarCargando();
        this._transferenciaDetalleRestService
          .deleteOne(articulo.id)
          .subscribe(
            () => {
              this._cargandoService.deshabilitarCargando();
              this.valores.splice(indice, 1);
              this.enviarArregloArticulos.emit(this.valores);
              this.enviarArticulos.emit(this.articuloAgregado);
            },
            (error) => {
              console.error({
                error,
                data: articulo,
                mensaje: 'Error eliminando compra detalle',
              });
              this._cargandoService.deshabilitarCargando();
            }
          );
      } else {
        this.valores.splice(indice, 1);
        this.enviarArregloArticulos.emit(this.valores);
        this.enviarArticulos.emit(this.articuloAgregado);
      }
    }
    if (this.esVenta) {
      if (articulo.id) {
        try {
          if ( articulo.descuentos) {
            articulo.descuentos.map(async descuento => {
              await this._descuentoVentaRestSqljsService.repository().delete(descuento.id);
            });
          }
          await this._ventaDetalleRestSqljsService.repository().delete(articulo.id);
          this.valores.splice(indice, 1);
          this.enviarArregloArticulos.emit(this.valores);
        } catch (e) {
          console.error(e);
          this._toasterServicePrivate.pop('error', 'Error', 'Error al quiar articulo');
        }
      }
    }
    // if (this.articulosEnDetalle === undefined) {
    //   const detalleAEliminar = {...this.valores[indice]};
    //   this.valores.splice(indice, 1);
    //   if (this.esVenta && detalleAEliminar.id) {
    //     try {
    //       if (detalleAEliminar.descuentos) {
    //         detalleAEliminar.descuentos.map(async descuento => {
    //           await this._descuentoVentaRestSqljsService.repository().delete(descuento.id);
    //         });
    //       }
    //       await this._ventaDetalleRestSqljsService.repository().delete(detalleAEliminar.id);
    //     } catch (e) {
    //       console.error(e);
    //       this._toasterServicePrivate.pop('error', 'Error', 'Error al quiar articulo');
    //     }
    //   }
    //   this.enviarArregloArticulos.emit(this.valores);
    //   return this.valores;
    // }
    // const arregloCodigosDetalle = this.articulosEnDetalle.map(codigoArticulo => codigoArticulo.codigo);
    // let articuloEliminado$;
    // if (this.ingresoEgreso) {
    //   if (this.verificarArticuloDetalle(arregloCodigosDetalle, articulo)) {
    //     this.setearIdArticulos(this.articulosEnDetalle, this.valores);
    //     articuloEliminado$ = this._ingresoEgresoDetalleRestService.deleteOne(articulo.id);
    //   } else {
    //     this.valores.splice(indice, 1);
    //     this.enviarArregloArticulos.emit(this.valores);
    //     return this.valores;
    //   }
    // }
    // if (this.transferenciaBodegas) {
    //   if (this.verificarArticuloDetalle(arregloCodigosDetalle, articulo)) {
    //     this.setearIdArticulos(this.articulosEnDetalle, this.valores);
    //     articuloEliminado$ = this._transferenciaDetalleRestService.deleteOne(articulo.id);
    //   } else {
    //     this.valores.splice(indice, 1);
    //     this.enviarArregloArticulos.emit(this.valores);
    //     return this.valores;
    //   }
    // }
    // if (this.compraDevolucionProveedores) {
    //   if (this.verificarArticuloDetalle(arregloCodigosDetalle, articulo)) {
    //     this.setearIdArticulos(this.articulosEnDetalle, this.valores);
    //     articuloEliminado$ = this._compraDetalleRestService.deleteOne(articulo.id);
    //   } else {
    //     this.valores.splice(indice, 1);
    //     this.enviarArregloArticulos.emit(this.valores);
    //     return this.valores;
    //   }
    // }
    // articuloEliminado$.subscribe((respuesta) => {
    //   console.log('Se eliminó el artículo del detalle?', respuesta);
    //   this.valores.splice(indice, 1);
    //   this.enviarArregloArticulos.emit(this.valores);
    //   return this.valores;
    // }, error => {
    //   console.error({
    //     error: error,
    //     mensaje: 'Error eliminando el artículo del detalle'
    //   });
    // });
  }

  habilitarDescuento(articulo) {
    if (this.compraDevolucionProveedores) {
      if (articulo.formaCalculo) {
        if (articulo.formaCalculo.formaCalculo === 'Valor unitario') {
          return true;
        }
        if (articulo.formaCalculo.formaCalculo === 'Subtotal') {
          return false;
        }
      }
    }
  }

  habilitarDescuentoPorcentual(articulo) {
    if (this.compraDevolucionProveedores) {
      if (articulo.formaCalculo) {
        if (articulo.formaCalculo.formaCalculo === 'Valor unitario') {
          return true;
        }
        if (articulo.formaCalculo.formaCalculo === 'Subtotal') {
          return false;
        }
      }
    }
  }

  habilitarValorUnitario(articulo) {
    if (this.compraDevolucionProveedores) {
      if (articulo.formaCalculo) {
        if (articulo.formaCalculo.formaCalculo === 'Valor unitario') {
          return true;
        }
        if (articulo.formaCalculo.formaCalculo === 'Subtotal') {
          return false;
        }
      }
    } else {
      if (this.esVenta) {
        return true;
      }
    }
    // return
    // rowData['formaCalculo']?.formaCalculo !== 'Valor unitario' || ingresoEgreso || transferenciaBodegas || rowData['estatus'] === 'CR' || detalleCreado || pedidoGuardado; else ingresarValorUnitario
  }

  habilitarCantidad(articulo) {
    if (this.compraDevolucionProveedores) {
      if (articulo.formaCalculo.formaCalculo === 'Valor unitario') {
        return true;
      }
      if (articulo.formaCalculo.formaCalculo === 'Subtotal') {
        return false;
      }
    }
    // this.ingresarCantidad
    // return articulo.formaCalculo === 'Sin forma de cálculo' || articulo.estatus === 'CR' || this.detalleCreado || this.pedidoGuardado;
  }

  estaValidoCantidad(articulo) {
    if (this.compraDevolucionProveedores) {
      if (articulo.cantidad > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (this.ingresoEgreso) {
      if (articulo.cantidad > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (this.transferenciaBodegas) {
      if (articulo.cantidad > 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  habilitarCantidadPromocion(articulo) {
    if (this.compraDevolucionProveedores) {
      if (articulo.formaCalculo) {
        if (articulo.formaCalculo.formaCalculo === 'Valor unitario') {
          return true;
        }
        if (articulo.formaCalculo.formaCalculo === 'Subtotal') {
          return false;
        }
      }
    } else {
      if (this.enviarArregloArticulos) {
        return true;
      }
    }
  }

  calcularDescuentos(articulo,
                     nombreCampo: 'cantidadPromocion' | 'formaCalculo' |
                       'valorUnitario' | 'descuentoPorcentual' | 'descuento') {

    if (this.compraDevolucionProveedores) {
      let errorDescuentoPorcentual = false;
      let errorDescuentoValor = false;
      if (+articulo.descuentoPorcentual > 0 || +articulo.descuento > 0) {
        const descuento = {
          orden: 1,
          razon: 'Descuento compra',
          porcentaje: 0,
          valor: 0,
          base: +articulo.subtotal,
        };
        if (nombreCampo === 'descuentoPorcentual' || nombreCampo === 'descuento' || nombreCampo === 'cantidadPromocion') {
          // Cambio uno de los dos descuentos
          if (nombreCampo === 'descuentoPorcentual') {
            if (+articulo.descuentoPorcentual !== 0) {
              descuento.porcentaje = +articulo.descuentoPorcentual;
              if (+descuento.porcentaje > 99.9999) {
                errorDescuentoPorcentual = true;
              } else {
                articulo.descuentos = [];
                articulo.descuentos.push(descuento);
                articulo.descuento = 0;
              }
            }
          }
          if (nombreCampo === 'descuento') {
            if (articulo.descuento !== 0) {
              descuento.valor = +articulo.descuento;
              if (+descuento.valor >= +articulo.subtotal) {
                errorDescuentoValor = true;
              } else {
                articulo.descuentos = [];
                articulo.descuentos.push(descuento);
                articulo.descuentoPorcentual = 0;
              }
            }
          }
        } else {
          // Solo cambio la base, no los descuentos
          articulo.descuentos[0].base = articulo.subtotal;
        }
        // No cumple con validaciones en descuento porcentual o valor
        if (errorDescuentoPorcentual || errorDescuentoValor) {
          articulo.valido = false;
          let mensaje = '';
          if (errorDescuentoPorcentual) {
            mensaje += 'No puede tener un descuento mayor o igual al 100%';
            articulo.descuentoPorcentual = 0;
          }
          if (errorDescuentoValor) {
            mensaje += `No puede tener un descuento mayor o igual a $${articulo.subtotal}`;
            articulo.descuento = 0;
          }
          this._toasterServicePrivate.pop('warning', 'Cuidado', mensaje);
        } else {
          this.calcularDescuentosDeArreglo(articulo);
        }
      }
    }
  }

  calcularDescuentosDeArreglo(articulo) {
    if (this.compraDevolucionProveedores) {
      articulo.descuentos = ordenarObjeto(
        articulo.descuentos,
        'orden'
      );
      if (articulo.descuentos) {
        const subtotalConDescuentos = articulo
          .descuentos
          .reduce(
            (valorInicial, descuento: DescuentoInterface) => {
              if (valorInicial === 0) {
                valorInicial = +descuento.base;
              }
              if (descuento.porcentaje > 0) {
                return valorInicial - (+descuento.base * (+descuento.porcentaje / 100));
              }
              if (descuento.valor > 0) {
                return (descuento.base - descuento.valor);
              }
            }, 0
          );
        articulo.subtotal = subtotalConDescuentos;
      }
    }
  }

  calcularDescuentoDeBackend(articulo: PedidoDetalleInterface, esPorcentaje = false) {
    if (this.compraDevolucionProveedores) {
      if (articulo.compraDescuentos) {
        const descuentoTotal = articulo.compraDescuentos.reduce((vI, d) => vI + +d.valor, 0);
        if (esPorcentaje) {
          if (descuentoTotal > 0) {
            return descuentoTotal / (+articulo.cantidad * +articulo.valorUnitario) * 100;
          } else {
            return 0;
          }
        } else {
          return descuentoTotal;
        }
      } else {
        return 0;
      }
    }
  }

  calcularDescuentoPromocionCreado(articulo: PedidoDetalleInterface) {
    return +articulo.cantidadPromocion * +articulo.valorUnitario;
  }

  cambioCantidadBodegaDestino(articulo: PedidoDetalleInterface,
                              respuestaCantidadBodega: EmitirCantidadBodegaArticulo) {
    if (this.transferenciaBodegas) {
      if (respuestaCantidadBodega.esDestino) {
        articulo.cantidadBodegaDestino = respuestaCantidadBodega.cantidad;
      } else {
        articulo.cantidadBodegaOrigen = respuestaCantidadBodega.cantidad;
      }
    }
  }
}
