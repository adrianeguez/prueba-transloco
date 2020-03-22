import {Injectable} from '@angular/core';
import {VentaCabeceraCreateDto} from './venta-cabecera-create-dto';
import {VentaCabeceraUpdateDto} from './venta-cabecera-update-dto';
import {VentaCabeceraEntity} from './venta-cabecera-entity';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {VentaCabeceraEntityInterface} from './interfaces/venta-cabecera-entity.interface';
import {MovimientoCabeceraInterface} from '../../../interfaces/movimientos/pedido-compra-interface';
import {ArticuloEntity} from '../articulo/articulo.entity';
import {DatosClientesInterface} from '../../../componentes/clientes/clientes/clientes.component';
import * as moment from 'moment';
import {ToasterService} from 'angular2-toaster';
import {PedidoDetalleInterface} from '../../../interfaces/pedido-detalle.interface';
import {VentaDetalleRestSqljsService} from '../venta-detalle/venta-detalle-rest-sqljs.service';
import {DescuentoVentaRestSqljsService} from '../descuento-venta/descuento-venta-rest-sqljs.service';
import {VentaDetalleEntity} from '../venta-detalle/venta-detalle-entity';
import {VentaDetalleEntityInterface} from '../venta-detalle/interfaces/venta-detalle-entity.interface';
import {ValorUnitarioInterface} from '../../../interfaces/valor-unitario.interface';
import {DescuentoVentaEntityInterface} from '../descuento-venta/interfaces/descuento-venta-entity.interface';
import {DescuentoInterface} from '../../../interfaces/descuento.interface';
import {DescuentoVentaEntity} from '../descuento-venta/descuento-venta-entity';
import {VentaAEntregarInterface} from '../../cargar-ventas.service';
import {environment} from '../../../../../../environments/environment';
import {ArticuloPorEmpresaEntityInterface} from '../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class VentaCabeceraRestSqljsService extends PrincipalRestSqljsService<VentaCabeceraEntity | VentaCabeceraEntityInterface,
  VentaCabeceraCreateDto,
  VentaCabeceraUpdateDto> {
  constructor(
    private readonly _http: HttpClient,
    private readonly _toasterService: ToasterService,
    private readonly _ventaDetalleRestSqljsService: VentaDetalleRestSqljsService,
    private readonly _descuentoVentaRestSqljsService: DescuentoVentaRestSqljsService
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'venta-cabecera';
    this.entidad = VentaCabeceraEntity;

  }

  guardarVentaOffline( ventasAGuardar: VentaAEntregarInterface[]) {
    return this._http.post(
      `${environment.url}:${environment.port}/venta-cabecera/guardar-cabecera-off`,
      ventasAGuardar,
    );
  }

  async guardarCabecera(cabecera: MovimientoCabeceraInterface) {
    try {
      const cabeceraACrear: VentaCabeceraEntity = this.setearCabecera({...cabecera});
      if (cabecera.id) {
        cabeceraACrear.id = cabecera.id;
      }
      return  await this.repository().save({...cabeceraACrear});
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al crear la cabcecera del pedido');
      console.error({
        error: e,
        mensaje: 'Error creando cabeceras movimiento'
      });
    }
  }

  setearCabecera(cabecera: MovimientoCabeceraInterface) {
    return {
      idOperarioOVendedor: cabecera.idOperarioOVendedor,
      idEdificio: cabecera.idEdificio,
      idBodegaOrigen: cabecera.idBodegaOrigen,
      tipoMovimiento: cabecera.tipoMovimiento as string,
      comentario: cabecera.datosCabecera ? (cabecera.datosCabecera as DatosClientesInterface).comentario : '',
      observacion: cabecera.datosCabecera ? (cabecera.datosCabecera as DatosClientesInterface).observacion : '',
      fecha: moment().format('YYYY-MM-DD'),
      estado: 'EN',
      documento: cabecera.informacionTributaria.documento,
      telefono: cabecera.informacionTributaria.telefono,
      nombre: cabecera.informacionTributaria.razonSocial,
      direccion: cabecera.informacionTributaria.telefono,
      correo: cabecera.informacionTributaria.correo,
      prioridad: false,
      seEnvio: false,
      idClienteProveedor: cabecera.idClienteOProveedor,
      estadoVenta: cabecera.estadoVenta,
    };
  }
}
