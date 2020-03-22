import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from 'src/environments/environment';
import {LocalizacionInterface} from '../../interfaces/localizacion.interface';
import {DatosBuscarLocalizacionInterface} from '../../interfaces/datos-buscar-localizacion.interface';
import {DatosBuscarLocalizacionPorEntidadInterface} from '../../interfaces/datos-buscar-localizacion-por-entidad.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalizacionRestService extends PrincipalRestService<LocalizacionInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'localizacion';
  }

  buscarLocalizacion(datosBuscarLocalizacion: DatosBuscarLocalizacionInterface) {
    return this._http
      .get(
        this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-localizacion?datos=${JSON.stringify(datosBuscarLocalizacion)}`,
      );
  }

  buscarLocalizacionesPorEntidad(datosBuscarLocalizacionPorEntidad: DatosBuscarLocalizacionPorEntidadInterface) {
    return this._http
      .get(
        this.url +
        ':' +
        this.port +
        `/${this.segmento}/buscar-localizaciones-por-entidad?datos=${JSON.stringify(datosBuscarLocalizacionPorEntidad)}`,
      );
  }

  editarLocalizacion(datos: { id: any, localizacion: LocalizacionInterface }) {
    return this._http
      .post(
        this.url +
        ':' +
        this.port +
        `/${this.segmento}/editar`, datos,
      );
  }
}
