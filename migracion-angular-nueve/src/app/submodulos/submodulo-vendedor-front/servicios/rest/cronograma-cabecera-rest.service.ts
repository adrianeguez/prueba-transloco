import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CronogramaVendedorCabeceraInterface } from '../../interfaces/cronograma-vendedor-cabecera-interface';

@Injectable({
  providedIn: 'root',
})
export class CronogramaCabeceraRestService extends PrincipalRestService<
  CronogramaVendedorCabeceraInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'cronograma-cabecera';
  }
}
