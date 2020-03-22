import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { TipoImpuestoInterface } from '../../interfaces/tipo-impuesto.interface';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoImpuestoRestService extends PrincipalRestService<
  TipoImpuestoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tipo-impuesto';
  }
}
