import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { EdificioInterface } from '../../interfaces/edificio.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EdificioRestService extends PrincipalRestService<
  EdificioInterface
> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'edificio';
  }

  guardarEdificioDireccionLocalizacion(datos) {
    return this._http.post(
      `${environment.url}:${environment.port}/edificio/guardar-edificio-direccion-localizacion`,
      datos,
    );
  }

  editarEdificioDireccionLocalizacion(datos) {
    return this._http.post(
      `${environment.url}:${environment.port}/edificio/editar-edificio-direccion-localizacion`,
      datos,
    );
  }

  buscarActualizarEdificioEsMatriz(datos) {
    const url =
      this.url +
      ':' +
      this.port +
      '/' +
      this.segmento +
      '/' +
      'actualizar-es-matriz-edificio';
    const respuesta = this._http.post(url, datos);
    return respuesta;
  }
}
