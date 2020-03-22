import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TemaInterface} from '../../interfaces/tema.interface';
import {environment} from '../../../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TemaRestService extends PrincipalRestService<TemaInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tema';
  }

  cargarArchivoAudio(audio: File, nombre: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('urlAudio', audio);
    formData.append('nombre', nombre);

    return this._http.post(
      `${this.url}:${this.port}/${this.segmento}/cargar-audio`,
      formData,
    );
  }
  updateOne(id: number | string, actualizacion: any, cabeceras?: { headers: HttpHeaders }): Observable<TemaInterface> {
    const segmentoNuevo = `modulo-curso-diapositiva-prueba/${this.segmento}`;
    // console.log('actualizar ', actualizacion);
    // @ts-ignore
    return this._http.put(`${this.url}:${this.port}/${segmentoNuevo}/${id}`, actualizacion, cabeceras);
  }

}
