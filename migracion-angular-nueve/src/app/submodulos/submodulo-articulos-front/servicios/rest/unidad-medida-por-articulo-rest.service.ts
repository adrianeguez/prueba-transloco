import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { UnidadMedidaPorArticuloInterface } from '../../interfaces/unidad-medida-por-articulo.interface';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnidadMedidaPorArticuloRestService extends PrincipalRestService<
  UnidadMedidaPorArticuloInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'unidad-medida-por-articulo';
  }

  // buscar-crear-unidad-medida-articulo
  buscarcrearUnidadMedidaPorArticulo(parametros) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'buscar-crear-unidad-medida-articulo';
    const respuesta = this._http.post(url, parametros);
    return respuesta;
  }

  actualizarUnidadMedidaEsPrincipal(parametros) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'actualizar-es-principal';
    const respuesta = this._http.put(url, parametros);
    return respuesta;
  }
}
