import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { CodigoPaisInterface } from '../../interfaces/codigo-pais.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CodigoPaisRestService extends PrincipalRestService<
  CodigoPaisInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'codigo-pais';
  }
}
