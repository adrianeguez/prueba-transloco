import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { CabeceraCarritoInterface } from '../../interfaces/cabecera-carrito.interface';

@Injectable({
  providedIn: 'root',
})
export class CabeceraCarritoRestService extends PrincipalRestService<
  CabeceraCarritoInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'carrito-cabecera';
  }
}
