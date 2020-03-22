import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { TarifaInterface } from '../../interfaces/tarifa.interface';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TarifaRestService extends PrincipalRestService<TarifaInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tarifa';
  }

  buscarActualizarTarifaEstado(tarifa) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'actualizar-tarifa';
    const respuesta = this._http.post(url, tarifa);
    return respuesta;
  }

  busarCrearYActualizarTarifas(tarifaCrear) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'buscar-crear-actualizar-todos';
    const respuesta = this._http.post(url, tarifaCrear);
    return respuesta;
  }
}
