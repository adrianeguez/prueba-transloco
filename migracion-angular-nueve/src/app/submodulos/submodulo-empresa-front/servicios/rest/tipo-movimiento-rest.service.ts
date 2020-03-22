import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { TipoMovimientoInterface } from '../../interfaces/tipo-movimiento.interface';

@Injectable({
  providedIn: 'root',
})
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
