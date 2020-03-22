import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { environment } from './../../../../../environments/environment';
import { DetalleAdicionalInterface } from './../../interfaces/detalle-adicional.interface';

@Injectable({
  providedIn: 'root',
})
export class DetalleAdicionalRestService extends PrincipalRestService<
  DetalleAdicionalInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'detalle-adicional-articulo';
  }
}
