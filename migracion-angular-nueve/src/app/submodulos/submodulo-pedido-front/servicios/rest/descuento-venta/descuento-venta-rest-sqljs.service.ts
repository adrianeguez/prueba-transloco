import {Injectable} from '@angular/core';
import {DescuentoVentaCreateDto} from './descuento-venta-create-dto';
import {DescuentoVentaUpdateDto} from './descuento-venta-update-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment.prod';
import {PrincipalRestSqljsService} from '@manticore-labs/ng-api';
import {DescuentoVentaEntity} from './descuento-venta-entity';
import {VentaDetalleEntity} from '../venta-detalle/venta-detalle-entity';
import {ToasterService} from 'angular2-toaster';
import {DescuentoVentaEntityInterface} from './interfaces/descuento-venta-entity.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
// tslint:disable-next-line:max-line-length
export class DescuentoVentaRestSqljsService extends PrincipalRestSqljsService<DescuentoVentaEntity, DescuentoVentaCreateDto, DescuentoVentaUpdateDto> {
  constructor(
    private readonly _http: HttpClient,
    private readonly _toasterService: ToasterService,
    ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'descuento-venta';
    this.entidad = DescuentoVentaEntity;
  }

  async guardarDescuento(descuentos) {
    try {
      return await this.repository().save(descuentos);
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error al crear  descuento de la venta');
      console.error({
        error: e,
        mensaje: 'Error creando descuento de la venta'
      });
    }
  }

  async getAll (consulta = {}) {
    try {
      return await this.repository().findAndCount(consulta);
    } catch (e) {
      this._toasterService.pop('error', 'error', 'error traer registros');
      console.error({
        error: e,
        mensaje: 'Error al obtener regitros'
      });
    }
  }
}
