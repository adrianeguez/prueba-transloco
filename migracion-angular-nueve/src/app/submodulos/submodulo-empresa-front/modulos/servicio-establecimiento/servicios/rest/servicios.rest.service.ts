
import { HttpClient } from '@angular/common/http';
import { PrincipalRestService } from '@manticore-labs/ng-api';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { ServicioEstablecimientoInterface } from '../../interfaces/servicio-establecimiento.interface';

@Injectable()
export class ServicioRestService extends PrincipalRestService<ServicioEstablecimientoInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'servicio-establecimiento';
  }
  obtenerServiciosEstablecimiento(idEstablecimiento) {
    return this._http.get(
      this.url + ':' + this.port + '/' +
      `${this.segmento}/obtener-servicios-establecimiento?idEstablecimiento= ${idEstablecimiento}`
    );
  }
  obtenerEdificionLocalizacionPorCurso(idCurso: number) {
    const urlCompleta = `${this.url}:${this.port}/${this.segmento}/obtener-localizacion-edificios/${idCurso}`;
    return this._http.get(
      urlCompleta,
    );
  }

}
