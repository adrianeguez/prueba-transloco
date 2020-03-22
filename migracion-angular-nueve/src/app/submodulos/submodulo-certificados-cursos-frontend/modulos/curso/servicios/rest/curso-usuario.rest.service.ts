import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {CursoUsuarioInterface} from '../../../curso/interfaces/curso-usuario.interface';
import {environment} from '../../../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class CursoUsuarioRestService extends PrincipalRestService<CursoUsuarioInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'curso-usuario';
  }

  registrarCursoUsuario(idCurso: number | string,
                        idDatosUsuario: number | string,
                        idArticuloEmpresa: number | string,
                        idPedido?: number | string,
                        cabeceras?: {
                          headers: HttpHeaders;
                        }): Observable<any> {
    const objetosAEnviar = {
      idCurso,
      idDatosUsuario,
      idPedido,
      idArticuloEmpresa
    };
    const urlConstruida = `${this.url}:${this.port}/${this.segmento}/registrar-curso-usuario`;
    return this._http.post(urlConstruida, objetosAEnviar);
  }

}
