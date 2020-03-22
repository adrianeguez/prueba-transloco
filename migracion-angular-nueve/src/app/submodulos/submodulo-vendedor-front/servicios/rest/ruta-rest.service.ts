import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { RutaInterface } from '../../interfaces/ruta-interface';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RutaRestService extends PrincipalRestService<RutaInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'ruta';
  }

  obtenerRutaLugarPorEmpresa(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-ruta-por-lugar?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }

  buscarRutaLugarPorNombre(datos: any): Observable<any> {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-ruta-lugar-nombre?datos=${JSON.stringify(
          datos,
        )}`,
    );
  }
}
