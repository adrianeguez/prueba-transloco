import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { environment } from './../../../../../environments/environment';
import { ArticuloInterface } from './../../interfaces/articulo.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticulosRestService extends PrincipalRestService<
  ArticuloInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'articulo';
  }

  guardarArticuloDetallePrecioImpuestoUnidadMedida(datos) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'guardar-articulo-detalle-impuesto-medida';
    const respuesta = this._http.post(url, datos);
    return respuesta;
  }

  buscarArticulosPorEmpresa(datos) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'obtener-articulos-empresa?datos=' +
      JSON.stringify(datos);
    const respuesta = this._http.get(url);
    return respuesta;
  }

  buscarArticulosActivosPorNombreCodigo(datos) {
    // tslint:disable-next-line: max-line-length
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'buscar-artculos-activos-nombre-codigo?datos=' +
      JSON.stringify(datos);
    const respuesta = this._http.get(url);
    return respuesta;
  }
}
