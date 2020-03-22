import { Injectable } from '@angular/core';
import { VentaDetalleCreateDto } from './venta-detalle-create-dto';
import { VentaDetalleUpdateDto } from './venta-detalle-update-dto';
import { VentaDetalle } from './venta-detalle';
import { PrincipalRestSqljsService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable()
export class VentaDetalleRestService extends PrincipalRestSqljsService<
  VentaDetalle,
  VentaDetalleCreateDto,
  VentaDetalleUpdateDto
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'venta-detalle';
    this.entidad = VentaDetalle;
  }
}
