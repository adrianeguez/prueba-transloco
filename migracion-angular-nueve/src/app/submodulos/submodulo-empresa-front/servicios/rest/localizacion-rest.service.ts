import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { environment } from 'src/environments/environment';
import { LocalizacionInterface } from '../../interfaces/localizacion.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalizacionRestService extends PrincipalRestService<
  LocalizacionInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'localizacion';
  }

  buscarLocalizacion(datos) {
    return this._http.get(
      this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-localizacion?datos=${JSON.stringify(datos)}`,
    );
  }

  buscarLocalizacionesPorEntidad(datos) {
    return this._http.get(
      this.url +
      ':' +
      this.port +
      `/${this.segmento}/buscar-localizaciones-por-entidad?datos=${JSON.stringify(datos)}`,
    );
  }
}
