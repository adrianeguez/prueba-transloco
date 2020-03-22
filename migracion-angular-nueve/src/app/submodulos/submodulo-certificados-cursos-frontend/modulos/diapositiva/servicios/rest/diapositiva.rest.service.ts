import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {DiapositivaInterface} from '../../interfaces/diapositiva.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {from, Observable, of} from 'rxjs';

@Injectable()
export class DiapositivaRestService extends PrincipalRestService<DiapositivaInterface> {
  nuevoSegmento = 'modulo-curso-diapositiva-prueba/diapositiva';
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = `diapositiva`;
  }
  create(registro: any, cabeceras?: { headers: HttpHeaders }): Observable<DiapositivaInterface> {
    // @ts-ignore
    return  this._http.post(`${this.url}:${this.port}/${this.nuevoSegmento}`, registro, cabeceras);
  }
  updateOne(id: number | string, actualizacion: any, cabeceras?: { headers: HttpHeaders }): Observable<DiapositivaInterface> {
    // @ts-ignore
    return this._http.put(`${this.url}:${this.port}/${this.nuevoSegmento}/${id}`, actualizacion, cabeceras);
  }
  actualizarMasivo(diapositivas: DiapositivaInterface[]): Observable<any> {
    return this._http.put(`${this.url}:${this.port}/${this.segmento}/actualizar-masivo`, diapositivas);
  }
}
