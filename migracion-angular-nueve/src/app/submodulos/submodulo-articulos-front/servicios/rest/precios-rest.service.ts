import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { PreciosInterface } from '../../interfaces/precios.interface';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PreciosRestService extends PrincipalRestService<PreciosInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'precios';
  }

  buscarActualizarPrecioEsPrincipal(precio) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'actualizar-es-pricipal-precio';
    const respuesta = this._http.post(url, precio);
    return respuesta;
  }

  busarCrearYActualizarPrecioEsPrincipal(precioCrear) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'buscar-crear-actualizar-es-principal';
    const respuesta = this._http.post(url, precioCrear);
    return respuesta;
  }
}
