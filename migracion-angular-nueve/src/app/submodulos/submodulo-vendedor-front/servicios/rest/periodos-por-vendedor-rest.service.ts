import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { PeriodosPorVendedorInterface } from '../../interfaces/periodos-por-vendedor-interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeriodosPorVendedorRestService extends PrincipalRestService<
  PeriodosPorVendedorInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'periodos-por-vendedor';
  }

  buscarYCrearPeriodoVendedor(datos) {
    const url = `${this.url}:${this.port}/${this.segmento}/buscar-crear-periodo-vendedor`;
    const respuesta = this._http.post(url, datos);
    return respuesta;
  }
}
