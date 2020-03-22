import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { Observable } from 'rxjs';
import {ArticuloEmpresaInterface} from '../../../interfaces/articulo-empresa.interface';
import {environment} from '../../../../../../environments/environment';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ArticuloPorEmpresaRestService extends PrincipalRestService<ArticuloEmpresaInterface> {
  constructor(
    private readonly _http: HttpClient,
  ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'articulo-por-empresa';
  }

  obtenerArticuloEmpresaPorNombreCodigo(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      ':' +
      this.port +
      `/${this.segmento}/buscar-articulo-empresa-nombre-codigo?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }

  obtenerArticuloPorIdEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url + ':' + this.port + `/${this.segmento}/obtener-articulo-por-empresa?datos=${JSON.stringify(
      datos
      )}`
    );
  }

  agregarArticulosPorEmpresa(datos) {
    return this._http.post(`${environment.url}:${environment.port}/${this.segmento}/agregar-articulos-empresa`, datos);
  }
}
