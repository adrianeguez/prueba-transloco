import {ModuloCursoInterface} from '../../interfaces/modulo-curso.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {Observable} from 'rxjs';

@Injectable()
export class ModuloCursoRestService extends PrincipalRestService<ModuloCursoInterface> {
  nuevoSegmento = 'modulo-curso-diapositiva-prueba';
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'modulo-curso';
  }

  cargarCaratula(caratula: File, nombre: string, idModuloCurso: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('urlCaratula', caratula);
    formData.append('nombre', nombre);

    return this._http.post(
      `${this.url}:${this.port}/${this.segmento}/cargar-caratula/${idModuloCurso.toString()}`,
      formData,
    );
  }

  cargarMasivo(modulos: ModuloCursoInterface[]): Observable<any> {
    return this._http.put(
      `${this.url}:${this.port}/${this.segmento}/actualizar-masivo`, modulos
    );
  }

  cambiarEstado(id: number, estado: {habilitado: 0 | 1}): Observable<any> {
    return this._http.put(
      `${this.url}:${this.port}/${this.nuevoSegmento}/estado-modulo-curso/${id}`, estado
    );
  }

}
