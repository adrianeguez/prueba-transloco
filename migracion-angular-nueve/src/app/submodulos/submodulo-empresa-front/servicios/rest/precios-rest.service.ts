import { environment } from './../../../../../environments/environment';
import { Injectable, Inject } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { PreciosInterface } from '../../interfaces/precios.interface';

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
      'actualizar-es-principal-precio';
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
