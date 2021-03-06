import {Injectable} from '@angular/core';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {ModuloCursoUsuarioInterface} from '../../interfaces/modulo-curso-usuario.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';

@Injectable()
export class ModuloCursoUsuarioRestService extends PrincipalRestService<ModuloCursoUsuarioInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'modulo-curso-usuario';
  }

}
