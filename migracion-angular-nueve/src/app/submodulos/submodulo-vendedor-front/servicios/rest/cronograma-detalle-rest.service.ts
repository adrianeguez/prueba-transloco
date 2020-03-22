import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { CronogramaVendedorInterface } from '../../interfaces/cronograma-vendedor-interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CronogramaDetalleRestService extends PrincipalRestService<
  CronogramaVendedorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'cronograma-detalle';
  }
}
