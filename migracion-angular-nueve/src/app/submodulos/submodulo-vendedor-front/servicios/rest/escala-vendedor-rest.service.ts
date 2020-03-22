import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { EscalaVendedorInterface } from '../../interfaces/escala-vendedor-interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EscalaVendedorRestService extends PrincipalRestService<
  EscalaVendedorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'escala-vendedor';
  }
}
