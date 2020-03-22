import {Injectable} from '@angular/core';
import {VentaDetalleCreateDto} from './venta-detalle-create-dto';
import {VentaDetalleUpdateDto} from './venta-detalle-update-dto';
import {VentaDetalleEntity} from './venta-detalle-entity';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment.prod';
import {MovimientoCabeceraInterface} from '../../../interfaces/movimientos/pedido-compra-interface';
import {VentaCabeceraEntity} from '../venta-cabecera/venta-cabecera-entity';
import {DatosClientesInterface} from '../../../componentes/clientes/clientes/clientes.component';
import * as moment from 'moment';
import {ToasterService} from 'angular2-toaster';
import {VentaDetalleEntityInterface} from './interfaces/venta-detalle-entity.interface';
import {DescuentoInterface} from '../../../interfaces/descuento.interface';
import {DescuentoVentaEntityInterface} from '../descuento-venta/interfaces/descuento-venta-entity.interface';
import {ValorUnitarioInterface} from '../../../interfaces/valor-unitario.interface';
import {DescuentoVentaRestSqljsService} from '../descuento-venta/descuento-venta-rest-sqljs.service';
import {ArticuloPorEmpresaEntityInterface} from '../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';
import {PedidoDetalleInterface} from '../../../interfaces/pedido-detalle.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
// tslint:disable-next-line:max-line-length
export class VentaDetalleRestSqljsService extends PrincipalRestSqljsService<VentaDetalleEntity, VentaDetalleCreateDto, VentaDetalleUpdateDto> {
  constructor(
    private readonly _http: HttpClient,
    private readonly _toasterService: ToasterService,
    private readonly _descuentoVentaRestSqljsService: DescuentoVentaRestSqljsService
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'venta-detalle';
    this.entidad = VentaDetalleEntity;
  }

  async guardarDetalle(detalles: VentaDetalleEntity[]) {
    try {
      return await Promise.all(
        detalles.map(async detalleACrearOEditar => {
          const detalleCreado =  await this.repository().save({...detalleACrearOEditar});
          return await this.repository().findOne(detalleCreado.id, {relations: ['descuentos']});
        })
      );
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al crear el detalle de la venta');
      console.error({
        error: e,
        mensaje: 'Error creando detalles de la venta'
      });
    }
  }

  async guardarDetalleDescuentos(idCabeceraVenta: number, detallesAGuardar: PedidoDetalleInterface[]) {
    const detallesACrear: VentaDetalleEntityInterface[] = detallesAGuardar.map( (detalleAGuardar: PedidoDetalleInterface) => {
      const detalleACrear: VentaDetalleEntityInterface = {...this.setearDetalle({...detalleAGuardar})};
      detalleACrear.ventaCabecera = idCabeceraVenta;
      return detalleACrear;
    });
    const detallesCreados = await this.guardarDetalle([...detallesACrear]);
    return detallesCreados;
  }

  setearDetalle(detalleCompra: PedidoDetalleInterface) {
    const valorUnitario: ValorUnitarioInterface = detalleCompra.valorUnitario as ValorUnitarioInterface;
    const detalleACrear: VentaDetalleEntityInterface = {
      codigo: detalleCompra.articuloEmpresa.articulo.codigo.toString(),
      nombre: detalleCompra.articuloEmpresa.articulo.nombre,
      idArticulo: detalleCompra.articuloEmpresa.articulo.id,
      cantidad: +detalleCompra.cantidad,
      cantidadPromocion: +detalleCompra.cantidadPromocion,
      cantidadPendiente: detalleCompra.cantidadPendiente,
      cantidadTotal: +detalleCompra.cantidad + +detalleCompra.cantidadPromocion,
      cantidadEntregada: +detalleCompra.cantidad + +detalleCompra.cantidadPromocion,
      cantidadDadaBaja: detalleCompra.cantidadDadaBaja,
      cantidadPedida: detalleCompra.cantidadPedida,
      descuento: detalleCompra.descuento,
      descuentoPorcentual: detalleCompra.descuentoPorcentual,
      descuentosPorcentuales: detalleCompra.descuentosPorcentuales,
      descuentoValor: detalleCompra.descuentoValor,
      descuentoPromocion: detalleCompra.descuentoPromocion,
      subtotal: detalleCompra.subtotal,
      totalBruto: detalleCompra.totalBruto,
      totalDescuentos: detalleCompra.totalDescuentos,
      valorUnitario: valorUnitario.valorUnitario,
      idArticuloEmpresa: detalleCompra.articuloEmpresa.id,
      // articuloPorEmpresa: detalleCompra.articuloEmpresa,
    };
    if (detalleCompra.id) {
      detalleACrear.id = detalleCompra.id;
    }
    return detalleACrear;
  }
}
