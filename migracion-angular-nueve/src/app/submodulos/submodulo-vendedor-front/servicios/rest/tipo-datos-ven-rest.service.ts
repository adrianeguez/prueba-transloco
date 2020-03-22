import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {TipoDatosVenInterface} from '../../interfaces/tipo-datos-ven';
@Injectable({
  providedIn: 'root',
})
export class TipoDatosVenRestService extends PrincipalRestService<
  TipoDatosVenInterface
  > {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tipo-datos-vendedor';
  }
}
