import { Injectable } from '@angular/core';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {VentaCabeceraRestSqljsService} from './rest/venta-cabecera/venta-cabecera-rest-sqljs.service';
import {VentaDetalleRestSqljsService} from './rest/venta-detalle/venta-detalle-rest-sqljs.service';
import {DescuentoVentaRestSqljsService} from './rest/descuento-venta/descuento-venta-rest-sqljs.service';
import {MovimientoCabeceraInterface} from '../interfaces/movimientos/pedido-compra-interface';
import {Auth0Service} from '../../submodulo-front-comun/servicios/auth0/auth0.service';
import {DescuentoVentaEntityInterface} from './rest/descuento-venta/interfaces/descuento-venta-entity.interface';
import {environment} from '../../../../environments/environment';
import {VentaCabeceraEntityInterface} from './rest/venta-cabecera/interfaces/venta-cabecera-entity.interface';

@Injectable({
  providedIn: 'root'
})
export class CargarVentasService {

  seEstaCargandoVentas;
  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _ventaCabeceraRestSqljsService: VentaCabeceraRestSqljsService,
    private readonly _auth0Service: Auth0Service,
    private readonly _ventaDetalleRestSqljsService: VentaDetalleRestSqljsService,
    private readonly _descuentoVentaRestSqljsService: DescuentoVentaRestSqljsService
  ) {
    this.seEstaCargandoVentas = localStorage.getItem('estaCargandoVentas');
  }

  async cargarPedidosVenta() {
    const estaCargandoVentas = JSON.parse(localStorage.getItem('estaCargandoVentas'));
    const seSeleccionoEmpresa = this._auth0Service.empresaSeleccionada && this._auth0Service.empresaSeleccionada.empresa;
    const estaBorramdoBase = JSON.parse(localStorage.getItem('estaBorramdoBase'));
    if (!estaCargandoVentas && seSeleccionoEmpresa && !estaBorramdoBase) {
      try {
        localStorage.setItem('estaCargandoVentas', '1');
        this.seEstaCargandoVentas = 1;
        setTimeout( async () => {
          const ventasGuardadas = await this._ventaCabeceraRestSqljsService.repository().find(
            {
              where: {
                seEnvio: false,
                estadoVenta: 'cerrado'
              },
              relations: ['ventasDetalle', 'ventasDetalle.descuentos']
            }
          );
          const arregloVentasACargar =  await this.setearVentas(ventasGuardadas);
          console.log(JSON.stringify(arregloVentasACargar));
          if (arregloVentasACargar && arregloVentasACargar.length > 0) {
            this._ventaCabeceraRestSqljsService.guardarVentaOffline(arregloVentasACargar)
              .subscribe( async (arregloIdsVentasConError: number[]) => {
                const existenVentasConError = arregloIdsVentasConError && arregloIdsVentasConError.length > 0;
                arregloVentasACargar.map( async ventaCargada => {
                  const indiceVentaError = arregloIdsVentasConError.indexOf(ventaCargada.id);
                  const esVentaSinError = indiceVentaError === -1;
                  if (esVentaSinError) {
                    try {
                      await this._ventaCabeceraRestSqljsService.repository().update(ventaCargada.id, { seEnvio: true});
                      if (ventaCargada.ventasDetalle) {
                        ventaCargada.ventasDetalle.map( async detalle => {
                          if (detalle.descuentos) {
                            detalle.descuentos.map(async descuento => {
                              await this._descuentoVentaRestSqljsService.repository().delete(descuento.id);
                            });
                          }
                          await this._ventaDetalleRestSqljsService.repository().delete(detalle.id);
                        });
                      }
                      await this._ventaCabeceraRestSqljsService.repository().delete(ventaCargada.id);
                      localStorage.setItem('estaCargandoVentas', '0');
                      localStorage.setItem('cierreForzadoVentas', '0');
                    } catch (e) {
                      localStorage.setItem('estaCargandoVentas', '0');
                      localStorage.setItem('cierreForzadoVentas', '0');
                      console.error({error: e, mensaje: 'Error al eliminar ventas'});
                    }
                  }
                });
                localStorage.setItem('estaCargandoVentas', '0');
                localStorage.setItem('cierreForzadoVentas', '0');
              }, error => {
                localStorage.setItem('estaCargandoVentas', '0');
                localStorage.setItem('cierreForzadoVentas', '0');
                console.error({error, mensaje: 'Error al cargar ventas'});
              });
          } else {
            localStorage.setItem('estaCargandoVentas', '0');
            localStorage.setItem('cierreForzadoVentas', '0');
          }
        }, 2000);
      } catch (e) {
        localStorage.setItem('estaCargandoVentas', '0');
        localStorage.setItem('cierreForzadoVentas', '0');
        console.error({e, mensaje: 'Error al cargar ventas'});
      }
    }
  }

  async setearVentas(ventasGuardadas: VentaCabeceraEntityInterface[]) {
    const pedidosVentaACargar = Promise.all(
      ventasGuardadas.map( async ventaGuardada => {
        const ventaACargar: VentaAEntregarInterface = {};
        ventaACargar.id = ventaGuardada.id;
        ventaACargar.tipoMovimiento = ventaGuardada.tipoMovimiento;
        ventaACargar.idOperarioOVendedor = ventaGuardada.idOperarioOVendedor;
        ventaACargar.idBodegaOrigen = ventaGuardada.idBodegaOrigen;
        ventaACargar.estado = ventaGuardada.estado;
        let datosCabecera: DatosCabeceraVentaInterface = {};
        if (ventaGuardada.idClienteProveedor) {
          datosCabecera = {
            idClienteOProveedor: ventaGuardada.idClienteProveedor,
          };
        } else {
          datosCabecera = {
            prioridad: false,
            documentoCliente: +ventaGuardada.documento,
            telefonoCliente: ventaGuardada.telefono,
            direccionCliente: ventaGuardada.direccion,
            nombreCliente: ventaGuardada.nombre,
            correoCliente: ventaGuardada.correo,
          };
        }
        ventaACargar.datosCabecera = datosCabecera;
        ventaACargar.ventasDetalle = ventaGuardada.ventasDetalle.map( ventaDetalle => {
          const detalle: VentaDetalleInterface = {
            id: ventaDetalle.id,
            createdAt: ventaDetalle.createdAt,
            updatedAt: ventaDetalle.updatedAt,
            codigo: ventaDetalle.codigo,
            nombre: ventaDetalle.nombre,
            idArticulo: ventaDetalle.idArticulo,
            cantidad: ventaDetalle.cantidad,
            cantidadPromocion: ventaDetalle.cantidadPromocion,
            cantidadTotal: ventaDetalle.cantidadTotal,
            cantidadPendiente: ventaDetalle.cantidadPendiente,
            cantidadEntregada: ventaDetalle.cantidadEntregada,
            cantidadDadaBaja: ventaDetalle.cantidadDadaBaja,
            valorUnitario: ventaDetalle.valorUnitario,
            descuentos: ventaDetalle.descuentos,
          };
          return detalle;
        });
        return ventaACargar;
      })
    );
    return pedidosVentaACargar;
  }
}
export interface VentaAEntregarInterface {
  id?: number;
  tipoMovimiento?: string;
  idOperarioOVendedor?: number;
  idBodegaOrigen?: number;
  estado?: string;
  datosCabecera?: DatosCabeceraVentaInterface;
  ventasDetalle?: VentaDetalleInterface[];
}
export interface DatosCabeceraVentaInterface {
  prioridad?: boolean;
  documentoCliente?: number;
  telefonoCliente?: string;
  direccionCliente?: string;
  nombreCliente?: string;
  correoCliente?: string;
  idClienteOProveedor?: number;
}
export interface VentaDetalleInterface {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  codigo?: string;
  nombre?: string;
  idArticulo?: number;
  cantidad?: number;
  cantidadPromocion?: number;
  cantidadTotal?: number;
  cantidadPendiente?: number;
  cantidadEntregada?: number;
  cantidadDadaBaja?: number;
  valorUnitario?: number;
  descuentos?: DescuentoVentaEntityInterface[];
}
