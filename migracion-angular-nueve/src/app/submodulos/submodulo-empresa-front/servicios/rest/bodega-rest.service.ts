import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { BodegaInterface } from '../../interfaces/bodega.interface';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BodegaRestService extends PrincipalRestService<BodegaInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'bodega';
  }
  buscarBodegasContactoEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${
          this.segmento
        }/buscar-bodegas-contacto-empresa?datos=${JSON.stringify(datos)}`,
    );
  }
  obtenerBodegasPorEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-bodegas-por-empresa?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }
}
