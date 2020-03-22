import {Component, OnInit} from '@angular/core';
import {MigaDePanInterface, RutaConMigasDePan} from '@manticore-labs/ng-api';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../../../submodulo-empresa-front/modulos/empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_PEDIDOS} from '../definicion-rutas/rutas-pedidos';
import {CompraCabeceraRestService} from '../../../../servicios/rest/compra-cabecera/compra-cabecera-rest.service';
import {CompraCabeceraInterface} from '../../../../servicios/rest/compra-cabecera/interfaces/compra-cabecera-interface';
import {COLUMNAS_COMPRA_DETALLE, COLUMNAS_COMPRA_DEVOLUCION_PROVEEDORES} from '../../../../constantes/columnas-tablas';
import {PedidoDetalleInterface} from '../../../../interfaces/pedido-detalle.interface';
import {MovimientoDetalleInterface} from '../../../../interfaces/movimientos/movimiento-detalle.interface';
import {
  CompraDetalleInterface, DescuentosCompraDetalleInterface
} from '../../../../servicios/rest/compra-detalle/interfaces/compra-detalle.interface';
import {CompraDetalleRestService} from '../../../../servicios/rest/compra-detalle/compra-detalle-rest.service';
import {ToasterService} from 'angular2-toaster';
import {toastErrorConexionServidor} from '../../../../../../constantes/mensajes-toaster';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'ml-ruta-detalle-pedido-compra',
  templateUrl: './ruta-detalle-pedido-compra.component.html',
  styleUrls: ['./ruta-detalle-pedido-compra.component.scss']
})
export class RutaDetallePedidoCompraComponent extends RutaConMigasDePan implements OnInit {

  idEmpresa: number;

  idCompra: number;

  pedidoCompra: CompraCabeceraInterface;

  detallePedidoCompra: PedidoDetalleInterface[];

  columnasCompraDetalle = COLUMNAS_COMPRA_DETALLE;

  columnasCompra = COLUMNAS_COMPRA_DEVOLUCION_PROVEEDORES;

  pedidoGuardado: boolean;

  crearDetalle: boolean;

  detalleCreado: boolean;

  articuloAgregado: PedidoDetalleInterface;

  arregloArticulosDetalle: PedidoDetalleInterface[];

  constructor(
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _cargandoService: CargandoService,
    private readonly _compraCabeceraRestService: CompraCabeceraRestService,
    private readonly _compraDetalleRestService: CompraDetalleRestService,
    private readonly _toasterService: ToasterService
  ) {
    super(_emitirMigaPanService);
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(r => {
      this.idEmpresa = r.idEmpresa;
      this.idCompra = r.idPedido;
      const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
        RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
        RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
        RUTAS_PEDIDOS.rutaListarPedidos(false, true, [this.idEmpresa]),
        RUTAS_PEDIDOS.rutaDetalleCompra(false, true, [this.idCompra])
      ];
      this.establecerMigas(rutas);
      this.mostrarCabeceraPedido(this.idCompra);
    }, error => {
      console.error(error);
      this._cargandoService.deshabilitarCargando();
    });
  }

  mostrarCabeceraPedido(idCompra: number, creoUnoReciente = false) {
    const consulta = {
      where: {
        id: idCompra
      },
      relations: ['compraDetalles', 'compraDetalles.compraDescuentos', 'bodega', 'empresaProveedor']
    };
    this._cargandoService.habilitarCargando();
    this._compraCabeceraRestService
      .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`)
      .subscribe(
        detalleCompra => {
          this.pedidoCompra = detalleCompra[0][0];
          this.arregloArticulosDetalle = this.pedidoCompra.compraDetalles;
          // seteando si el pedido esta guardado o no
          if (this.pedidoCompra.estatus === 'CR') {
            this.pedidoGuardado = false;
          } else {
            this.pedidoGuardado = true;
          }
          // seteando si el detalle ha sido creado o no
          if (this.arregloArticulosDetalle.length > 0) {
            this.detalleCreado = true;
          } else {
            this.detalleCreado = false;
          }
          if (creoUnoReciente) {
            this.crearDetalle = false;
            this._toasterService.pop(
              'info',
              'Éxito',
              'Los artículos se han añadido al detalle correctamente'
            );
          }
          this._cargandoService.deshabilitarCargando();
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error cargando los detalles',
          });
        }
      );
  }

  crearDetallesAEnviar() {
    return this.arregloArticulosDetalle
      .map(
        (articulo) => {
          const descuentos = articulo
            .descuentos
            .map(
              descuento => {
                const descuentoMapeado = {
                  ...descuento
                };
                if (descuento.valor > 0) {
                  descuentoMapeado.porcentaje = (descuento.valor / descuento.base) * 100;
                } else {
                  descuentoMapeado.valor = descuento.base * (descuento.porcentaje / 100);
                }
                return descuentoMapeado;
              });
          return {
            codigo: articulo.codigo,
            cantidad: +articulo.cantidad,
            cantidadPromocion: +articulo.cantidadPromocion,
            valorUnitario: +articulo.valorUnitario,
            descuentos: descuentos,
            compraCabecera: this.pedidoCompra.id
          };
        }
      );
  }

  guardarDetalle() {
    const respuestaCabecera = this.pedidoCompra;
    const detallesAEnviar = this.crearDetallesAEnviar();
    this._cargandoService.habilitarCargando();
    this._compraDetalleRestService
      .guardarDetalleCompra(<any>detallesAEnviar)
      .subscribe(
        (respuesta) => {
          this._cargandoService.deshabilitarCargando();
          this.mostrarCabeceraPedido(
            respuestaCabecera.id,
            true
          );
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error: error,
            mensaje: 'Error creando detalle de movimiento'
          });
          this._toasterService.pop(toastErrorConexionServidor);
        });
  }

  guardarPedido(idPedido: number) {
    this._cargandoService.habilitarCargando();
    this._compraDetalleRestService
      .guardarPedido(idPedido)
      .subscribe(
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
          this._toasterService.pop(toastErrorConexionServidor);
          this._cargandoService.deshabilitarCargando();
        });
  }

  recibirArticulos(articulo) {
    console.log(articulo);
    // this.crearDetalle = true;
    // this.detalleCreado = false;
    return this.articuloAgregado = articulo;
  }

  recibirArregloArticulos(arregloArticulos: any[]) {
    const tieneArticulosInvalidos = arregloArticulos.some(a => a.valido === false);
    if (arregloArticulos.length === 0 || tieneArticulosInvalidos) {
      this.crearDetalle = false;
      this.detalleCreado = false;
    } else {
      this.arregloArticulosDetalle = arregloArticulos.filter(a => !a.id);
      if (this.arregloArticulosDetalle.length > 0) {
        this.crearDetalle = true;
        this.detalleCreado = false;
      } else {
        this.crearDetalle = false;
        this.detalleCreado = true;
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

  obtenerDetallesComprasPorCabecera(id: number) {
    const consulta = {
      where: {
        id: id
      },
      relations: ['compraDetalles', 'compraDetalles.compraDescuentos', 'bodega', 'empresaProveedor']
    };
    return this._compraCabeceraRestService
      .findAll(`criterioBusqueda=${JSON.stringify(consulta)}`);
  }

  verificarArticuloDetalle(arregloDetalle: string[], articulo: PedidoDetalleInterface) {
    return arregloDetalle.some(codigoArticulo => codigoArticulo === articulo.codigo);
  }

}
