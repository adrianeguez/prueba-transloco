import {DiapositivaUsuarioInterface} from '../../interfaces/diapositiva.usuario.interface';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class DiapositivaUsuarioRestService extends PrincipalRestService<DiapositivaUsuarioInterface> {
  constructor(private readonly _http: HttpClient) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'diapositiva-usuario';
  }
  crearAvanceDiapositiva(nuevoRegistro: DiapositivaUsuarioInterface, idUsuario: number, idCursoUsuario: number) {
    const url = `${this.url}:${this.port}/${this.segmento}/crear-avance-diapositiva`;
    return this._http.post(url, {diapositiva: nuevoRegistro, idUsuario: idUsuario, idCursoUsuario: idCursoUsuario});
  }

  editarAvanceDiapositiva(modificadoRegistro: DiapositivaUsuarioInterface, idUsuario: number, idCursoUsuario: number) {
    const url = `${this.url}:${this.port}/${this.segmento}/editar-avance-diapositiva`;
    return this._http.put(url, {diapositiva: modificadoRegistro, idUsuario: idUsuario, idCursoUsuario: idCursoUsuario});
  }

}
