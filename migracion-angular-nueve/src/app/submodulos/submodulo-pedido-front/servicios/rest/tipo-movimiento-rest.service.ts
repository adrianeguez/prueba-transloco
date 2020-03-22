import { TipoMovimientoInterface } from '../../interfaces/tipo-movimiento.interface';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';

@Injectable()
export class TipoMovimientoRestService extends PrincipalRestService<
  TipoMovimientoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tipo-movimiento';
  }
}
