import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {DiapositivaInterface} from '../../../diapositiva/interfaces/diapositiva.interface';
import {Observable} from 'rxjs';

@Injectable()
export class ContenidoRestService extends PrincipalRestService<DiapositivaInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'contenido';
  }
  cargarArchivoImagen(imagen: File, numeroImagen: number, nombre: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(`urlImagen`, imagen);
    formData.append('nombre', nombre);
    return this._http.post(
      `${this.url}:${this.port}/${this.segmento}/cargar-imagen`,
      formData,
    );
  }

}
