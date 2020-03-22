import { Injectable } from '@angular/core';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { HttpClient } from '@angular/common/http';
import { LogroVisitaInterface } from '../../interfaces/logro-visita-interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogroVisitaRestService extends PrincipalRestService<
  LogroVisitaInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'logro-visita';
  }

  buscarVisitaLogroTipo(datos: any) {
    // tslint:disable-next-line: max-line-length
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'buscar-visita-logro-tipo?datos=' +
      JSON.stringify(datos);
    const respuesta = this._http.get(url);
    return respuesta;
  }

  obtenerVisitaLogroTipoPorFecha(datos: any) {
    // tslint:disable-next-line:max-line-length
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'buscar-visita-logro-tipo-por-fecha?datos=' +
      JSON.stringify(datos);
    const respuesta = this._http.get(url);
    return respuesta;
  }
}
