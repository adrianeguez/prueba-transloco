import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../../environments/environment';
import {PruebaInterface} from '../../interfaces/prueba.interface';
import {Observable} from 'rxjs';

@Injectable()
export class PruebaRestService extends PrincipalRestService<PruebaInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'prueba';
  }

  create(registro: any, cabeceras?: { headers: HttpHeaders }): Observable<PruebaInterface> {
    // console.log(registro);
    const objetosAEnviar = {
      ...registro
    };
    const urlConstruida = `${this.url}:${this.port}/modulo-curso-diapositiva-prueba/prueba`;
    // @ts-ignore
    return this._http.post(urlConstruida, objetosAEnviar);
  }

  updateOne(id: number | string, actualizacion: any, cabeceras?: { headers: HttpHeaders }): Observable<PruebaInterface> {
    const objetosAEnviar = {
      ...actualizacion
    };
    // console.log(objetosAEnviar);
    const urlConstruida = `${this.url}:${this.port}/modulo-curso-diapositiva-prueba/prueba/${id}`;
    // @ts-ignore
    return this._http.put(urlConstruida, objetosAEnviar);
  }

  updateMany (pruebas: PruebaInterface [], cabeceras?: { headers: HttpHeaders }): Observable<PruebaInterface> {
    const objetosAEnviar = {
      pruebas
    };
    const urlConstruida = `${this.url}:${this.port}/${this.segmento}/actualizar-masivo/`;
    // @ts-ignore
    return this._http.put(urlConstruida, objetosAEnviar);
  }
}
