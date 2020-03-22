import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../../environments/environment';
import {PruebaUsuarioInterface} from '../../interfaces/prueba-usuario.interface';
import {Observable, of} from 'rxjs';
import {PreguntasPorPruebaUsuarioInterface} from '../../interfaces/pregunta-por-prueba-usuario.interface';

@Injectable()
export class PruebaUsuarioRestService extends PrincipalRestService<PruebaUsuarioInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'prueba-usuario';
  }

  metodoPostCustom = 'guardar-prueba-preguntas-usuario';

  crearPruebaPreguntasUsuario(pruebaUsuario: PruebaUsuarioInterface,
                              preguntasPorPruebaUsuario: PreguntasPorPruebaUsuarioInterface[], cabeceras?: {
    headers: HttpHeaders;
  }): Observable<any> {
    const objetosAEnviar = {
      'pruebaUsuario': pruebaUsuario,
      'preguntasPruebaUsuario': preguntasPorPruebaUsuario
    };
    const urlConstruida = `${this.url}:${this.port}/${this.segmento}/${this.metodoPostCustom}`;
    return this._http.post(urlConstruida, objetosAEnviar);
  }
  iniciarPruebaUsuario(
    parametros: {
      idPrueba: number | string,
      idModuloUsuario: number | string,
      tiempoMaximo: number | string
    }
  ) {
    return this._http.post(`${this.url}:${this.port}/${this.segmento}/iniciar-prueba-usuario`, parametros);
  }
}
