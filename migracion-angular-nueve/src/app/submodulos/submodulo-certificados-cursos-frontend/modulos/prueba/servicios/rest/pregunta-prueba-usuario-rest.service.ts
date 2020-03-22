import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../../environments/environment';
import {PreguntasPorPruebaUsuarioInterface} from '../../interfaces/pregunta-por-prueba-usuario.interface';

@Injectable()
export class PreguntaPruebaUsuarioRestService extends PrincipalRestService<PreguntasPorPruebaUsuarioInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'pregunta-por-prueba-usuario';
  }

}
