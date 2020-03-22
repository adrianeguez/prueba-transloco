import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrincipalRestService} from '@manticore-labs/ng-api';
import {environment} from '../../../../../../../environments/environment';
import {PreguntaInterface} from '../../interfaces/pregunta.interface';

@Injectable()
export class PreguntaRestService extends PrincipalRestService<PreguntaInterface> {
  constructor(private readonly _http: HttpClient, ) {
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'pregunta';
  }

}
