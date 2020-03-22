import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { MovimientoInterface } from '../../interfaces/movimiento.interface';

@Injectable({
  providedIn: 'root',
})
export class MovimientoRestService extends PrincipalRestService<
  MovimientoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'movimiento';
  }
}
