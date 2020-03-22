import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { TipoVendedorInterface } from '../../interfaces/tipo-vendedor-interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoVendedorRestService extends PrincipalRestService<
  TipoVendedorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tipo-vendedor';
  }
}
