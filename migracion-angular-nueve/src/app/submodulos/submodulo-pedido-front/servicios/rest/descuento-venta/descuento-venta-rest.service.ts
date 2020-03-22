import { Injectable } from '@angular/core';
import { DescuentoVentaCreateDto } from './descuento-venta-create-dto';
import { DescuentoVentaUpdateDto } from './descuento-venta-update-dto';
import { DescuentoVenta } from './descuento-venta';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';

@Injectable()
export class DescuentoVentaRestService extends PrincipalRestSqljsService<
  DescuentoVenta,
  DescuentoVentaCreateDto,
  DescuentoVentaUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'descuento-venta';
    this.entidad = DescuentoVenta;
  }
}
